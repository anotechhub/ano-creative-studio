


import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ProductNameInput } from './components/ProductNameInput';
import { StyleConfigurator } from './components/StyleConfigurator';
import { ResultsGrid } from './components/ResultDisplay';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { FeaturesModal } from './components/FeaturesModal';
import { FaqModal } from './components/FaqModal';
import { SettingsModal } from './components/SettingsModal';
import { BottomNav } from './components/BottomNav';
import type { GenerationConfig, ResultItem, ProductType, AppSettings, ChatMessage, PosterConfig } from './types';
import { generatePhotography, upscaleImage, getStyleRecommendations, identifyProductFromImage, generatePoster, getPosterRecommendations, getInitialPosterText } from './services/geminiService';
import { 
    MARKETING_PRODUCT_TYPES, 
    FOOD_PHOTOGRAPHY_PRODUCT_TYPES, 
    PORTRAIT_SUBJECT_TYPES,
    getProductCategory,
    optionsByCategory,
    StyleOption,
    POSTER_THEMES,
    COLOR_PALETTES,
    FONT_STYLES
} from './constants';
import { PencilIcon, SparklesIcon, XIcon, LayoutGridIcon } from './components/IconComponents';
import { setCookie } from './utils/cookies';
import { locales, Locale } from './i18n/locales';
import { PosterDesigner } from './components/PosterDesigner';

declare const JSZip: any;

export const defaultSettings: AppSettings = {
    theme: 'light',
    language: 'id',
    numberOfResults: 6,
    defaultWatermark: true,
};

// --- Utility Function ---
const findOptionIdByName = (name: string, options: StyleOption[]): string | null => {
    if (!name || !options) return null;
    const normalizedName = name.toLowerCase().trim();
    for (const option of options) {
        if (option.name_en.toLowerCase().trim() === normalizedName || option.name_id.toLowerCase().trim() === normalizedName) {
            return option.id;
        }
    }
    return null;
};

// --- Inlined Components ---

const ImagePreviewModal: React.FC<{ imageUrl: string | null; onClose: () => void; }> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center" onClick={onClose} role="dialog" aria-modal="true">
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-white">
                    <XIcon />
                </button>
            </div>
        </div>
    );
};

const PosterPromptModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    t: {
        title: string;
        message: string;
        confirm: string;
        cancel: string;
    };
}> = ({ isOpen, onClose, onConfirm, t }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all text-center" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-blue/10 text-primary-blue rounded-full">
                        <div className="w-8 h-8">
                            <LayoutGridIcon />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{t.title}</h2>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
                        {t.message}
                    </p>
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-2 gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors">
                        {t.cancel}
                    </button>
                    <button onClick={onConfirm} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-blue hover:bg-primary-dark text-white transition-colors">
                        {t.confirm}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AIAssistantWidget: React.FC<{ onClick: () => void; t: Locale['aiAssistant']; disabled: boolean }> = ({ onClick, t, disabled }) => (
    <button
        onClick={onClick}
        className={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-dark rounded-full shadow-2xl text-white flex items-center justify-center transition-all duration-300 ${disabled ? 'opacity-60 cursor-not-allowed' : 'transform hover:scale-110'}`}
        aria-label={t.widgetButton}
        title={disabled ? t.uploadFirstMessage : t.widgetButton}
        disabled={disabled}
    >
        <div className="w-8 h-8">
            <SparklesIcon />
        </div>
    </button>
);

const AIAssistantModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    chatHistory: ChatMessage[];
    onSendMessage: (message: string) => void;
    onApplyStyles: (recommendations: any) => void;
    isLoading: boolean;
    t: Locale['aiAssistant'];
}> = ({ isOpen, onClose, chatHistory, onSendMessage, onApplyStyles, isLoading, t }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);
    
    if (!isOpen) return null;

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    return (
         <div className="fixed bottom-24 right-6 lg:bottom-28 lg:right-8 z-50 w-[calc(100%-3rem)] max-w-sm bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl flex flex-col transition-transform" role="dialog" aria-modal="true">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{t.modalTitle}</h3>
                <button onClick={onClose} className="p-1.5 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    <XIcon />
                </button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar h-80">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-primary-blue text-white rounded-br-lg' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-bl-lg'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content }}></p>
                            {msg.recommendations && (
                                <button
                                    onClick={() => onApplyStyles(msg.recommendations)}
                                    className="mt-3 w-full text-center py-2 px-4 rounded-lg text-sm font-semibold bg-primary-blue/20 text-primary-blue dark:bg-primary-blue/30 dark:text-sky-300 hover:bg-primary-blue/30 dark:hover:bg-primary-blue/40 transition-colors"
                                >
                                    {t.applyButton}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-xs px-4 py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-bl-lg flex items-center space-x-2">
                             <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                             <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                             <div className="w-2 h-2 bg-primary-blue rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                        placeholder={t.placeholder}
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-700/50 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-neutral-900 dark:text-neutral-100 text-sm transition"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="px-3 py-2 rounded-lg bg-primary-blue hover:bg-primary-dark text-white disabled:opacity-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [appSettings, setAppSettings] = useState<AppSettings>(() => {
        try {
            const savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                const { defaultView, apiMode, aspectRatio, ...rest } = parsed;
                return { ...defaultSettings, ...rest };
            }
        } catch (error) {
            console.error("Failed to parse app settings from localStorage", error);
        }
        return defaultSettings;
    });

    const [sourceImage, setSourceImage] = useState<File | null>(null);
    const [styleImage, setStyleImage] = useState<File | null>(null);
    const [results, setResults] = useState<ResultItem[]>(
        Array.from({ length: appSettings.numberOfResults }, (_, i) => ({ id: i, status: 'empty' }))
    );
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeView, setActiveView] = useState<'marketing' | 'food' | 'portrait' | 'poster'>('marketing');
    const [showFeaturesModal, setShowFeaturesModal] = useState(false);
    const [showFaqModal, setShowFaqModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [isIdentifying, setIsIdentifying] = useState<boolean>(false);

    // New state for features
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isAssistantLoading, setIsAssistantLoading] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [showPosterPromptModal, setShowPosterPromptModal] = useState(false);

    // New state for Poster Designer
    const [posterSourceImages, setPosterSourceImages] = useState<ResultItem[]>([]);
    const [selectedImageIdForPoster, setSelectedImageIdForPoster] = useState<number | null>(null);
    const [posterManualSource, setPosterManualSource] = useState<File | null>(null);
    const [posterResults, setPosterResults] = useState<ResultItem[]>(
        Array.from({ length: 4 }, (_, i) => ({ id: i, status: 'empty' }))
    );
    const [isGeneratingPoster, setIsGeneratingPoster] = useState<boolean>(false);
    const [isIdentifyingPosterProduct, setIsIdentifyingPosterProduct] = useState<boolean>(false);
    const [isGeneratingInitialText, setIsGeneratingInitialText] = useState<boolean>(false);
    const [posterConfig, setPosterConfig] = useState<PosterConfig>({
        productName: '',
        theme: 'minimalist-clean',
        colorPalette: 'auto',
        fontStyle: 'sans-serif-modern',
        headline: '',
        bodyText: '',
        cta: ''
    });
    
    const [config, setConfig] = useState<GenerationConfig>({
        photoType: MARKETING_PRODUCT_TYPES[0].id,
        productName: '',
        angleStyle: optionsByCategory.food.angles[0].id,
        lightingStyle: optionsByCategory.food.lighting[0].id,
        stylingStyle: optionsByCategory.food.styling[0].id,
        outfitStyle: optionsByCategory.portrait.outfits[0].id,
        backgroundStyle: optionsByCategory.food.backgrounds[0].id,
        customBackgroundStyle: '',
        extraInstructions: '',
        withWatermark: appSettings.defaultWatermark,
        customWatermarkText: '',
    });

    const t: Locale = locales[appSettings.language];

    useEffect(() => {
        let initialMessage = t.aiAssistant.initialMessageGeneric;
    
        if (activeView === 'poster') {
            initialMessage = t.aiAssistant.initialMessagePoster;
        } else if (sourceImage) {
            const isProductOrFoodView = activeView === 'marketing' || activeView === 'food';
            if (config.productName) {
                if (isProductOrFoodView) {
                    initialMessage = t.aiAssistant.initialMessageProduct.replace(
                        '{productName}',
                        `<strong>${config.productName}</strong>`
                    );
                } else if (activeView === 'portrait') {
                    initialMessage = t.aiAssistant.initialMessagePortrait.replace(
                        '{photoCaption}',
                        `<strong>${config.productName}</strong>`
                    );
                }
            }
        }
        
        setChatHistory([{ role: 'model', content: initialMessage }]);
    }, [sourceImage, config.productName, activeView, t]);

    useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(appSettings));

        if (appSettings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        setCookie('language', appSettings.language, 365);
        document.documentElement.lang = appSettings.language;
    }, [appSettings]);
    
    useEffect(() => {
        setResults(Array.from({ length: appSettings.numberOfResults }, (_, i) => ({ id: i, status: 'empty' })));
    }, [appSettings.numberOfResults]);

    useEffect(() => {
        // Cleanup for Object URLs created from manual poster uploads
        return () => {
            posterSourceImages.forEach(img => {
                if (img.data?.imageUrl && img.data.imageUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(img.data.imageUrl);
                }
            });
        };
    }, [posterSourceImages]);

    useEffect(() => {
        const generateInitialText = async () => {
            if (activeView === 'poster' && posterConfig.productName && !posterConfig.headline && !isGeneratingInitialText) {
                setIsGeneratingInitialText(true);
                try {
                    const apiKey = process.env.API_KEY;
                    if (!apiKey) throw new Error("API key missing");
                    const { headline, bodyText, cta } = await getInitialPosterText(posterConfig.productName, apiKey, appSettings.language);
                    setPosterConfig(prev => ({ ...prev, headline, bodyText, cta }));
                } catch (e) {
                    console.error("Failed to generate initial poster text:", e);
                    // Non-blocking, user can fill manually
                } finally {
                    setIsGeneratingInitialText(false);
                }
            }
        };
        generateInitialText();
    }, [activeView, posterConfig.productName, posterConfig.headline, isGeneratingInitialText, appSettings.language]);

    const handleAppSettingsChange = (newSettings: Partial<AppSettings>) => {
        setAppSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetGenerationState = useCallback((view: 'marketing' | 'food' | 'portrait') => {
        const newProductTypes = view === 'marketing' 
            ? MARKETING_PRODUCT_TYPES 
            : view === 'food'
            ? FOOD_PHOTOGRAPHY_PRODUCT_TYPES
            : PORTRAIT_SUBJECT_TYPES;

        const newPhotoType = newProductTypes[0].id;
        const newCategory = getProductCategory(newPhotoType);
        const newOptions = optionsByCategory[newCategory];

        setConfig({
            photoType: newPhotoType,
            productName: '',
            angleStyle: newOptions.angles[0].id,
            lightingStyle: newOptions.lighting[0].id,
            stylingStyle: newOptions.styling[0].id,
            outfitStyle: newOptions.outfits.length > 0 ? newOptions.outfits[0].id : '',
            backgroundStyle: newOptions.backgrounds[0].id,
            customBackgroundStyle: '',
            extraInstructions: '',
            withWatermark: appSettings.defaultWatermark,
            customWatermarkText: '',
        });

        setSourceImage(null);
        setStyleImage(null);
        setError(null);
        setIsGenerating(false);
        setIsUpscaling(false);
        setResults(Array.from({ length: appSettings.numberOfResults }, (_, i) => ({ id: i, status: 'empty' })));
        setSelectedImageIdForPoster(null);
    }, [appSettings.defaultWatermark, appSettings.numberOfResults]);

    const handleViewChange = useCallback((view: 'marketing' | 'food' | 'portrait' | 'poster') => {
        if (view === activeView) {
             if (view !== 'poster') resetGenerationState(view); 
             return;
        }
        setActiveView(view);
        if (view !== 'poster') {
            resetGenerationState(view);
        } else {
            setPosterSourceImages([]);
            setPosterManualSource(null);
            setPosterResults(Array.from({ length: 4 }, (_, i) => ({ id: i, status: 'empty' })));
            setPosterConfig(prev => ({...prev, productName: '', headline: '', bodyText: '', cta: ''}));
        }
    }, [activeView, resetGenerationState]);

    const handleResetGeneration = useCallback(() => {
        if (activeView !== 'poster') {
            resetGenerationState(activeView);
        }
    }, [activeView, resetGenerationState]);

    const handleImageSelect = async (file: File) => {
        setSourceImage(file);
        setResults(Array.from({ length: appSettings.numberOfResults }, (_, i) => ({ id: i, status: 'empty' })));
        setError(null);
        setSelectedImageIdForPoster(null);
    
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }
    
        setIsIdentifying(true);
        try {
            const { productName, photoType } = await identifyProductFromImage(file, apiKey);
            
            const newCategory = getProductCategory(photoType);
            const newOptions = optionsByCategory[newCategory];
    
            setConfig(prev => ({
                ...prev,
                productName: productName,
                photoType: photoType,
                angleStyle: newOptions.angles[0].id,
                lightingStyle: newOptions.lighting[0].id,
                stylingStyle: newOptions.styling[0].id,
                outfitStyle: newOptions.outfits.length > 0 ? newOptions.outfits[0].id : '',
                backgroundStyle: newOptions.backgrounds[0].id,
            }));
        } catch (e) {
            console.error("Product identification failed:", e);
            // Non-blocking error. User can still select manually.
        } finally {
            setIsIdentifying(false);
        }
    };

    const handleImageRemove = () => {
        setSourceImage(null);
        setResults(Array.from({ length: appSettings.numberOfResults }, (_, i) => ({ id: i, status: 'empty' })));
    };

    const handleStyleImageSelect = (file: File) => {
        setStyleImage(file);
    };

    const handleStyleImageRemove = () => {
        setStyleImage(null);
    };
    
    const handleGenerate = useCallback(async () => {
        if (!sourceImage) {
            setError(t.app.uploadError);
            return;
        }

        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }

        setIsGenerating(true);
        setError(null);
        setResults(prev => prev.map(r => ({ ...r, status: 'generating' })));
        setSelectedImageIdForPoster(null);

        try {
            const generatedData = await generatePhotography(sourceImage, styleImage, config, activeView as 'marketing' | 'food' | 'portrait', appSettings.numberOfResults, apiKey);
            setResults(prev => prev.map((item, index) => ({
                ...item,
                status: 'completed',
                data: generatedData[index],
            })));
            if (activeView === 'marketing' || activeView === 'food') {
                setShowPosterPromptModal(true);
            }
        } catch (e) {
            let errorMessage = e instanceof Error ? e.message : t.app.generationErrorGeneral;
            console.error(e);
            setError(errorMessage);
            setResults(prev => prev.map(item => ({
                ...item,
                status: 'error',
                errorMessage: t.app.generationErrorSpecific,
            })));
        } finally {
            setIsGenerating(false);
        }
    }, [sourceImage, styleImage, config, t, activeView, appSettings.numberOfResults]);

    const handleUpscaleAll = useCallback(async () => {
        const targets = results.filter(r => r.status === 'completed' && !r.upscaledImageUrl);
        if (targets.length === 0) return;

        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }

        setIsUpscaling(true);
        setError(null);

        setResults(prev => prev.map(r => 
            targets.some(t => t.id === r.id) ? { ...r, status: 'upscaling' } : r
        ));

        const upscalePromises = targets.map(async (result) => {
            try {
                if (!result.data?.imageUrl) throw new Error("Source image URL not found for upscaling.");
                const base64Data = result.data.imageUrl.split(',')[1];
                const mimeType = result.data.imageUrl.split(';')[0].split(':')[1];
                const upscaledImageUrl = await upscaleImage(base64Data, mimeType, apiKey);
                return { id: result.id, upscaledImageUrl, error: null };
            } catch (e) {
                console.error(`Upscale failed for result ${result.id}:`, e);
                return { id: result.id, upscaledImageUrl: null, error: e as Error };
            }
        });

        const settledResults = await Promise.all(upscalePromises);

        setResults(prev => {
            const newResults = [...prev];
            settledResults.forEach(res => {
                const index = newResults.findIndex(r => r.id === res.id);
                if (index !== -1) {
                    newResults[index] = {
                        ...newResults[index],
                        status: 'completed',
                        upscaledImageUrl: res.upscaledImageUrl ?? newResults[index].upscaledImageUrl,
                    };
                }
            });
            return newResults;
        });
        
        if (settledResults.some(res => res.error)) {
            setError(t.app.upscaleError);
        }

        setIsUpscaling(false);
    }, [results, t]);

    const handleDownloadAll = async () => {
        const completedResults = results.filter(r => r.status === 'completed' && (r.data?.imageUrl || r.upscaledImageUrl));
        if (completedResults.length === 0) return;

        const zip = new JSZip();
        const timestamp = new Date().getTime();

        await Promise.all(completedResults.map(async (result, index) => {
            const imageUrl = result.upscaledImageUrl || result.data!.imageUrl;
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            zip.file(`ano_studio_${timestamp}_v${index + 1}.png`, blob);
        }));

        zip.generateAsync({ type: "blob" }).then((content: Blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `ano_studio_${timestamp}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const updateConfig = <K extends keyof GenerationConfig>(key: K, value: GenerationConfig[K]) => {
      setConfig(prev => ({ ...prev, [key]: value }));
    };

    const updatePosterConfig = <K extends keyof PosterConfig>(key: K, value: PosterConfig[K]) => {
        setPosterConfig(prev => ({ ...prev, [key]: value }));
    };
    
    const getHeaderTitle = () => {
        switch(activeView) {
            case 'food':
                return t.sidebar.foodPhotography;
            case 'portrait':
                return t.sidebar.portraitPhotography;
            case 'poster':
                return t.sidebar.posterDesign;
            case 'marketing':
            default:
                return t.sidebar.productPhotography;
        }
    };
    
    // --- New Feature Handlers ---
    const handleSelectPosterImage = (id: number) => {
        setSelectedImageIdForPoster(prevId => (prevId === id ? null : id));
    };
    
    const handleContinueToPoster = () => {
        if (selectedImageIdForPoster === null) return;
        const selectedImage = results.find(r => r.id === selectedImageIdForPoster);
        if (selectedImage) {
            setPosterSourceImages([selectedImage]);
            setPosterConfig(prev => ({ ...prev, productName: config.productName, headline: '', bodyText: '', cta: '' }));
            setActiveView('poster');
            setSelectedImageIdForPoster(null);
            setPosterResults(Array.from({ length: 4 }, (_, i) => ({ id: i, status: 'empty' })));
        }
    };

    const handleManualPosterImageSelect = async (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        const tempResultItem: ResultItem = {
            id: Date.now(),
            status: 'completed',
            data: {
                imageUrl: imageUrl,
                prompt: 'Manual Upload'
            }
        };
        setPosterManualSource(file);
        setPosterSourceImages([tempResultItem]);
        setPosterConfig(prev => ({...prev, productName: '', headline: '', bodyText: '', cta: ''}));

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }

        setIsIdentifyingPosterProduct(true);
        try {
            const { productName } = await identifyProductFromImage(file, apiKey);
            setPosterConfig(prev => ({...prev, productName: productName}));
        } catch(e) {
            console.error("Poster product identification failed:", e);
        } finally {
            setIsIdentifyingPosterProduct(false);
        }
    };

    const handleManualPosterImageRemove = () => {
        setPosterManualSource(null);
        setPosterSourceImages([]);
        setPosterConfig(prev => ({...prev, productName: '', headline: '', bodyText: '', cta: ''}));
    };

    const handleGeneratePoster = async (selectedImages: ResultItem[], currentPosterConfig: PosterConfig) => {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }
    
        let sourceFile: File | null = null;
        
        if (posterManualSource) {
            sourceFile = posterManualSource;
        } else if (selectedImages.length > 0 && selectedImages[0].data?.imageUrl) {
            try {
                const response = await fetch(selectedImages[0].data.imageUrl);
                const blob = await response.blob();
                sourceFile = new File([blob], "poster_source.png", { type: blob.type });
            } catch (e) {
                console.error("Failed to fetch source image for poster:", e);
                setError(t.posterDesigner.sourceImageError);
                return;
            }
        }
    
        if (!sourceFile) {
            setError(t.posterDesigner.sourceImageError);
            return;
        }
    
        setIsGeneratingPoster(true);
        setPosterResults(Array.from({ length: 4 }, (_, i) => ({ id: i, status: 'generating' })));
        setError(null);
    
        try {
            const generatedData = await generatePoster(sourceFile, currentPosterConfig, apiKey);
            setPosterResults(prev => prev.map((item, index) => ({
                ...item,
                status: 'completed',
                data: generatedData[index],
            })));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : t.app.generationErrorGeneral;
            console.error(e);
            setError(errorMessage);
            setPosterResults(prev => prev.map(item => ({
                ...item,
                status: 'error',
                errorMessage: t.app.generationErrorSpecific,
            })));
        } finally {
            setIsGeneratingPoster(false);
        }
    };

    const handleDownloadAllPosters = async () => {
        const completedResults = posterResults.filter(r => r.status === 'completed' && r.data?.imageUrl);
        if (completedResults.length === 0) return;

        const zip = new JSZip();
        const timestamp = new Date().getTime();

        await Promise.all(completedResults.map(async (result, index) => {
            const imageUrl = result.data!.imageUrl;
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            zip.file(`ano_studio_poster_${timestamp}_v${index + 1}.png`, blob);
        }));

        zip.generateAsync({ type: "blob" }).then((content: Blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `ano_studio_posters_${timestamp}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const handlePreviewImage = (url: string) => {
        setPreviewImageUrl(url);
    };

    const isAssistantDisabled = (activeView !== 'poster' && !sourceImage) || 
                                (activeView === 'poster' && posterSourceImages.length === 0 && !posterManualSource);

    const handleAssistantClick = () => {
        if (isAssistantDisabled) {
            alert(t.aiAssistant.uploadFirstMessage);
            return;
        }
        setIsAssistantOpen(prev => !prev);
    };

    const handleSendToAssistant = async (message: string) => {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError(t.app.apiKeyMissingError);
            return;
        }

        setChatHistory(prev => [...prev, { role: 'user', content: message }]);
        setIsAssistantLoading(true);

        try {
            if (activeView === 'poster') {
                const result = await getPosterRecommendations(posterConfig, message, apiKey, appSettings.language);
                 setChatHistory(prev => [...prev, {
                    role: 'model',
                    content: result.reasoning,
                    recommendations: result.recommendations,
                }]);
            } else {
                const result = await getStyleRecommendations(config, activeView as 'marketing' | 'food' | 'portrait', message, apiKey, appSettings.language);
                setChatHistory(prev => [...prev, {
                    role: 'model',
                    content: result.reasoning,
                    recommendations: result.recommendations,
                }]);
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : t.app.generationErrorGeneral;
            setChatHistory(prev => [...prev, { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` }]);
        } finally {
            setIsAssistantLoading(false);
        }
    };

    const handleApplyRecommendations = (recommendations: any) => {
        if (activeView === 'poster') {
            const newPosterConfig: PosterConfig = { ...posterConfig };
            const { theme, colorPalette, fontStyle, headline, bodyText, cta } = recommendations;

            if (theme) {
                const id = findOptionIdByName(theme, POSTER_THEMES);
                if (id) newPosterConfig.theme = id;
            }
            if (colorPalette) {
                const id = findOptionIdByName(colorPalette, COLOR_PALETTES);
                if (id) newPosterConfig.colorPalette = id;
            }
            if (fontStyle) {
                const id = findOptionIdByName(fontStyle, FONT_STYLES);
                if (id) newPosterConfig.fontStyle = id;
            }

            if (headline) newPosterConfig.headline = headline;
            if (bodyText) newPosterConfig.bodyText = bodyText;
            if (cta) newPosterConfig.cta = cta;
            
            setPosterConfig(newPosterConfig);

        } else {
            const newConfig = { ...config };
            const category = getProductCategory(config.photoType);
            const categoryOptions = optionsByCategory[category];
            const { angleStyle, lightingStyle, stylingStyle, backgroundStyle, outfitStyle } = recommendations;

            if (angleStyle) {
                const id = findOptionIdByName(angleStyle, categoryOptions.angles);
                if (id) newConfig.angleStyle = id;
            }
            if (lightingStyle) {
                const id = findOptionIdByName(lightingStyle, categoryOptions.lighting);
                if (id) newConfig.lightingStyle = id;
            }
            if (stylingStyle) {
                const id = findOptionIdByName(stylingStyle, categoryOptions.styling);
                if (id) newConfig.stylingStyle = id;
            }
            if (activeView === 'portrait' && outfitStyle) {
                const id = findOptionIdByName(outfitStyle, categoryOptions.outfits);
                if (id) newConfig.outfitStyle = id;
            }
            if (backgroundStyle) {
                const id = findOptionIdByName(backgroundStyle, categoryOptions.backgrounds);
                if (id) {
                    newConfig.backgroundStyle = id;
                    newConfig.customBackgroundStyle = '';
                } else {
                    newConfig.backgroundStyle = 'other';
                    newConfig.customBackgroundStyle = backgroundStyle;
                }
            }
            setConfig(newConfig);
        }
        
        setChatHistory(prev => [...prev, { role: 'model', content: t.aiAssistant.appliedMessage }]);
        setTimeout(() => setIsAssistantOpen(false), 1000);
    };


    return (
        <div className="h-screen flex overflow-hidden bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            <Sidebar 
                activeView={activeView}
                onViewChange={handleViewChange}
                onSettingsClick={() => setShowSettingsModal(true)}
                t={t.sidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    title={getHeaderTitle()}
                    activeView={activeView}
                    settings={appSettings}
                    onSettingsChange={handleAppSettingsChange}
                    t={t.header}
                />
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-6xl mx-auto px-4 py-6 w-full">
                         {activeView === 'poster' ? (
                            <PosterDesigner
                                sourceImages={posterSourceImages}
                                manualSourceFile={posterManualSource}
                                onManualImageSelect={handleManualPosterImageSelect}
                                onManualImageRemove={handleManualPosterImageRemove}
                                onGeneratePoster={handleGeneratePoster}
                                isGenerating={isGeneratingPoster}
                                isIdentifying={isIdentifyingPosterProduct}
                                isGeneratingInitialText={isGeneratingInitialText}
                                posterResults={posterResults}
                                onPreview={handlePreviewImage}
                                posterConfig={posterConfig}
                                onPosterConfigChange={updatePosterConfig}
                                onDownloadAll={handleDownloadAllPosters}
                                t={t.posterDesigner}
                                t_imageUploader={t.imageUploader}
                                lang={appSettings.language}
                            />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left form */}
                                <div className="lg:col-span-5 space-y-6">
                                    <ImageUploader 
                                        onImageSelect={handleImageSelect} 
                                        onImageRemove={handleImageRemove}
                                        sourceImage={sourceImage}
                                        t={t.imageUploader}
                                        stepNumber="1"
                                    />
                                    {activeView === 'portrait' ? (
                                        <ImageUploader
                                            onImageSelect={handleStyleImageSelect}
                                            onImageRemove={handleStyleImageRemove}
                                            sourceImage={styleImage}
                                            t={{...t.imageUploader, title: t.imageUploader.styleImageTitle, subtitle: t.imageUploader.styleImageSubtitle}}
                                            stepNumber="2"
                                        />
                                    ) : (
                                        <ProductNameInput
                                            value={config.productName || ''}
                                            onChange={(value) => updateConfig('productName', value)}
                                            t={t.productNameInput}
                                            view={activeView}
                                            isLoading={isIdentifying}
                                        />
                                    )}
                                    <StyleConfigurator 
                                        config={config}
                                        onConfigChange={updateConfig}
                                        t={t.styleConfigurator}
                                        lang={appSettings.language}
                                        view={activeView}
                                        isLoading={isIdentifying}
                                    />
                                    <div className="space-y-3">
                                        <button 
                                            onClick={handleGenerate}
                                            disabled={isGenerating || !sourceImage || isIdentifying}
                                            className="w-full bg-gradient-to-r from-primary-blue-light to-primary-blue text-white font-semibold py-2.5 px-6 rounded-lg hover:from-primary-blue hover:to-primary-dark transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                        {isGenerating ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>{t.app.processing}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-5 h-5"><PencilIcon /></div>
                                                    <span>{t.app.generateButton}</span>
                                                </>
                                            )}
                                        </button>
                                        {results.some(r => r.status !== 'empty') && !isGenerating && (
                                            <button
                                                onClick={handleResetGeneration}
                                                className="w-full text-center py-2.5 px-6 rounded-lg text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                                            >
                                                {t.app.startNewSession}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Right result */}
                                <div className="lg:col-span-7 lg:sticky lg:top-6">
                                    <ResultsGrid
                                        results={results}
                                        onDownloadAll={handleDownloadAll}
                                        onUpscaleAll={handleUpscaleAll}
                                        onPreview={handlePreviewImage}
                                        isUpscaling={isUpscaling}
                                        t={t.resultsGrid}
                                        activeView={activeView}
                                        selectedImageId={selectedImageIdForPoster}
                                        onSelectImage={handleSelectPosterImage}
                                        onContinueToPoster={handleContinueToPoster}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <Footer
                        onFeaturesClick={() => setShowFeaturesModal(true)}
                        onFaqClick={() => setShowFaqModal(true)}
                        t={t.footer}
                    />
                </main>
                
                <BottomNav 
                    activeView={activeView}
                    onViewChange={handleViewChange}
                    onSettingsClick={() => setShowSettingsModal(true)}
                    t={t.bottomNav}
                />
            </div>

            <FeaturesModal
                isOpen={showFeaturesModal}
                onClose={() => setShowFeaturesModal(false)}
                t={t.featuresModal}
            />

            <FaqModal
                isOpen={showFaqModal}
                onClose={() => setShowFaqModal(false)}
                t={t.faqModal}
            />

            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                settings={appSettings}
                onSettingsChange={handleAppSettingsChange}
                t={t.settingsModal}
            />
            
            <PosterPromptModal
                isOpen={showPosterPromptModal}
                onClose={() => setShowPosterPromptModal(false)}
                onConfirm={() => setShowPosterPromptModal(false)}
                t={{
                    title: t.app.posterPromptTitle,
                    message: t.app.posterPromptMessage,
                    confirm: t.app.posterPromptConfirm,
                    cancel: t.app.posterPromptCancel,
                }}
            />

            <AIAssistantWidget 
                onClick={handleAssistantClick}
                t={t.aiAssistant}
                disabled={isAssistantDisabled}
            />
            <AIAssistantModal 
                isOpen={isAssistantOpen}
                onClose={() => setIsAssistantOpen(false)}
                chatHistory={chatHistory}
                onSendMessage={handleSendToAssistant}
                onApplyStyles={handleApplyRecommendations}
                isLoading={isAssistantLoading}
                t={t.aiAssistant}
            />

            <ImagePreviewModal imageUrl={previewImageUrl} onClose={() => setPreviewImageUrl(null)} />

            {error && (
                <div role="alert" className="fixed bottom-24 lg:bottom-8 right-8 z-50 max-w-md w-full p-4 bg-error text-white rounded-xl shadow-2xl transition-transform">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <strong className="block font-medium">{t.app.errorTitle}</strong>
                            <p className="mt-1 text-sm">{error}</p>
                        </div>
                        <button onClick={() => setError(null)} className="ml-auto text-white/80 hover:text-white">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;