

import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { GenerationConfig, GeneratedImage, ProductType, PosterConfig } from '../types';
import { 
    SYSTEM_PROMPT_TEMPLATE, 
    PORTRAIT_SYSTEM_PROMPT_TEMPLATE,
    PORTRAIT_WITH_STYLE_SYSTEM_PROMPT_TEMPLATE,
    POSTER_SYSTEM_PROMPT_TEMPLATE,
    POSTER_ASSISTANT_SYSTEM_PROMPT_TEMPLATE,
    POSTER_INITIAL_TEXT_SYSTEM_PROMPT_TEMPLATE,
    OTHER_OPTION, 
    RANDOM_OPTION,
    ALL_PRODUCT_TYPES,
    MARKETING_PRODUCT_TYPES,
    optionsByCategory,
    getProductCategory,
    POSTER_THEMES,
    COLOR_PALETTES,
    FONT_STYLES
} from '../constants';
import type { StyleOption, Category } from '../constants';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

const getIndonesianName = (id: string, options: StyleOption[]): string => {
    const option = options.find(opt => opt.id === id);
    return option ? option.name_id : id;
};

const buildPrompt = (config: GenerationConfig, view: 'marketing' | 'food' | 'portrait', hasStyleImage: boolean): string => {
    let watermarkInstruction: string;
    const customWatermark = config.customWatermarkText?.trim();

    if (!config.withWatermark) {
        watermarkInstruction = `PENTING: Tambahkan watermark teks kecil "anotechhub" yang dibuat samar (semi-transparan) di pojok kanan bawah gambar. Watermark harus halus, profesional, dan tidak mengganggu komposisi utama.`;
    } else {
        if (customWatermark) {
            watermarkInstruction = `PENTING: Tambahkan watermark teks kecil "${customWatermark}" yang dibuat samar (semi-transparan) di pojok kanan bawah gambar. Watermark harus halus, profesional, dan tidak mengganggu komposisi utama.`;
        } else {
            watermarkInstruction = `PENTING: Jangan tambahkan watermark atau teks apa pun ke dalam gambar. Hasilnya harus berupa gambar yang bersih tanpa ada tulisan tambahan.`;
        }
    }
    
    const photoTypeName = getIndonesianName(config.photoType, ALL_PRODUCT_TYPES);
    let description = photoTypeName;
    if (config.productName && config.productName.trim()) {
        description = `${config.productName.trim()} (kategori: ${photoTypeName})`;
    }
    
    const category = getProductCategory(config.photoType);
    const categoryOptions = optionsByCategory[category];

    const getStyleName = (styleId: string, styleCategory: keyof typeof categoryOptions) => {
        if (!styleId) return '';
        if (styleId === RANDOM_OPTION.id) {
            return 'Gaya kreatif dan menarik pilihan AI.';
        }
        const options = categoryOptions[styleCategory];
        if (!options) return styleId;
        return getIndonesianName(styleId, options as StyleOption[]);
    };

    const finalAngleStyle = getStyleName(config.angleStyle, 'angles');
    const finalLightingStyle = getStyleName(config.lightingStyle, 'lighting');
    const finalStylingStyle = getStyleName(config.stylingStyle, 'styling');
    
    let finalBackgroundStyle: string;
    if (config.backgroundStyle === OTHER_OPTION.id) {
        finalBackgroundStyle = config.customBackgroundStyle || 'Latar belakang yang ditentukan oleh pengguna';
    } else {
        finalBackgroundStyle = getIndonesianName(config.backgroundStyle, categoryOptions.backgrounds);
    }

    let template: string;
    if (view === 'portrait') {
        template = hasStyleImage ? PORTRAIT_WITH_STYLE_SYSTEM_PROMPT_TEMPLATE : PORTRAIT_SYSTEM_PROMPT_TEMPLATE;
    } else {
        template = SYSTEM_PROMPT_TEMPLATE;
    }

    let prompt = template
        .replace(view === 'portrait' ? '{{subject_description}}' : '{{product_description}}', description)
        .replace('{{angle_style}}', finalAngleStyle)
        .replace('{{lighting_style}}', finalLightingStyle)
        .replace('{{styling_style}}', finalStylingStyle)
        .replace('{{background_style}}', finalBackgroundStyle)
        .replace('{{extra_instructions}}', config.extraInstructions || 'Tidak ada instruksi tambahan.')
        .replace('{{watermark_instruction}}', watermarkInstruction);

    if (view === 'portrait') {
        const finalOutfitStyle = getStyleName(config.outfitStyle, 'outfits');
        prompt = prompt.replace('{{outfit_style}}', finalOutfitStyle);
    }
    
    return prompt;
};

export const generatePhotography = async (imageFile: File, styleImage: File | null, config: GenerationConfig, view: 'marketing' | 'food' | 'portrait', numberOfImages: number, apiKey: string | null): Promise<GeneratedImage[]> => {
    if (!apiKey) throw new Error("API key is missing. Please check your settings.");
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash-image-preview';
    
    const imagePart = await fileToGenerativePart(imageFile);
    const hasStyleImage = view === 'portrait' && styleImage;
    const textPrompt = buildPrompt(config, view, !!hasStyleImage);
    const textPart = { text: textPrompt };

    const parts: ({ inlineData: { data: string; mimeType: string; }; } | { text: string; })[] = [imagePart];
    if (hasStyleImage) {
        const styleImagePart = await fileToGenerativePart(styleImage);
        parts.push(styleImagePart);
    }
    parts.push(textPart);

    const generateSingleImage = async (): Promise<string> => {
        const result = await ai.models.generateContent({
            model: model,
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (!result.candidates || result.candidates.length === 0) {
            throw new Error("API response does not contain any candidates.");
        }
        
        const imagePartResponse = result.candidates[0]?.content?.parts.find(part => part.inlineData);

        if (imagePartResponse && imagePartResponse.inlineData) {
            const base64ImageBytes = imagePartResponse.inlineData.data;
            return `data:${imagePartResponse.inlineData.mimeType};base64,${base64ImageBytes}`;
        } else {
            const textResponsePart = result.candidates[0]?.content?.parts.find(part => part.text);
            const textResponse = textResponsePart?.text?.trim() || "No text response found.";
            
            console.warn("API did not return an image. Text response:", textResponse);
            let errorMessage = "Gagal menghasilkan gambar. Coba sesuaikan pilihan Anda atau gunakan gambar lain.";
            if (textResponse && textResponse.length > 5) {
                errorMessage = `Gagal menghasilkan gambar. Pesan dari AI: "${textResponse}"`;
            }
            throw new Error(errorMessage);
        }
    };

    const imagePromises = Array(numberOfImages).fill(null).map(() => generateSingleImage());
    const imageResults = await Promise.all(imagePromises);
    
    return imageResults.map(imageUrl => ({
        imageUrl,
        prompt: textPrompt,
    }));
};

const buildPosterPrompt = (config: PosterConfig): string => {
    return POSTER_SYSTEM_PROMPT_TEMPLATE
        .replace('{{product_name}}', config.productName || 'produk')
        .replace('{{theme}}', config.theme)
        .replace('{{color_palette}}', config.colorPalette)
        .replace('{{font_style}}', config.fontStyle)
        .replace('{{headline}}', config.headline)
        .replace('{{body_text}}', config.bodyText || 'Tidak ada teks isi.')
        .replace('{{cta}}', config.cta || 'Tidak ada ajakan bertindak.');
};

export const generatePoster = async (imageFile: File, config: PosterConfig, apiKey: string | null): Promise<GeneratedImage[]> => {
    if (!apiKey) throw new Error("API key is missing. Please check your settings.");
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash-image-preview';
    const numberOfImages = 4;

    const imagePart = await fileToGenerativePart(imageFile);
    const textPrompt = buildPosterPrompt(config);
    const textPart = { text: textPrompt };

    const generateSinglePoster = async (): Promise<string> => {
        const result = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (!result.candidates || result.candidates.length === 0) {
            throw new Error("API response does not contain any candidates for the poster.");
        }
        
        const imagePartResponse = result.candidates[0]?.content?.parts.find(part => part.inlineData);

        if (imagePartResponse && imagePartResponse.inlineData) {
            const base64ImageBytes = imagePartResponse.inlineData.data;
            return `data:${imagePartResponse.inlineData.mimeType};base64,${base64ImageBytes}`;
        } else {
            const textResponsePart = result.candidates[0]?.content?.parts.find(part => part.text);
            const textResponse = textResponsePart?.text?.trim() || "No text response found.";
            
            console.warn("API did not return a poster image. Text response:", textResponse);
            let errorMessage = "Gagal menghasilkan poster. Coba sesuaikan pilihan Anda.";
            if (textResponse && textResponse.length > 5) {
                errorMessage = `Gagal menghasilkan poster. Pesan dari AI: "${textResponse}"`;
            }
            throw new Error(errorMessage);
        }
    };

    const posterPromises = Array(numberOfImages).fill(null).map(() => generateSinglePoster());
    const posterResults = await Promise.all(posterPromises);
    
    return posterResults.map(imageUrl => ({
        imageUrl,
        prompt: textPrompt,
    }));
};


export const upscaleImage = async (base64ImageData: string, mimeType: string, apiKey: string | null): Promise<string> => {
    if (!apiKey) throw new Error("API key is missing. Please check your settings.");
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash-image-preview';

    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
        },
    };
    const textPart = {
        text: 'Tingkatkan resolusi gambar ini menjadi 2K. Pertajam detail, tingkatkan kualitas dan pencahayaan secara keseluruhan, namun JANGAN mengubah subjek, komposisi, atau elemen asli apa pun di dalam gambar. Hasil harus terlihat seperti versi resolusi tinggi dari gambar asli.',
    };

    const result = await ai.models.generateContent({
        model: model,
        contents: { parts: [imagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    if (!result.candidates || result.candidates.length === 0) {
        throw new Error("API response for upscale does not contain any candidates.");
    }

    const imagePartResponse = result.candidates[0]?.content?.parts.find(part => part.inlineData);

    if (imagePartResponse && imagePartResponse.inlineData) {
        const base64ImageBytes = imagePartResponse.inlineData.data;
        return `data:${imagePartResponse.inlineData.mimeType};base64,${base64ImageBytes}`;
    } else {
        const textResponse = result.text || "API did not return an upscaled image.";
        console.warn("Upscale failed. Text response:", textResponse);
        throw new Error(`Gagal melakukan upscale: ${textResponse}`);
    }
};

export const identifyProductFromImage = async (
    imageFile: File,
    apiKey: string,
): Promise<{ productName: string, photoType: ProductType }> => {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const imagePart = await fileToGenerativePart(imageFile);
    const productTypeIds = ALL_PRODUCT_TYPES.map(p => p.id).join(', ');

    const prompt = `Analyze the provided image and identify the main product or subject. 
    1.  Provide a short, descriptive name for it in Indonesian (e.g., "Sepatu hak tinggi merah", "Cangkir kopi espresso", "Pria berjas bisnis").
    2.  Classify this product/subject into ONE of the following categories: ${productTypeIds}. Choose the most specific and relevant category.
    Respond with your answer.`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            productName: {
                type: Type.STRING,
                description: "A short, descriptive name in Indonesian for the product/subject in the image.",
            },
            photoType: {
                type: Type.STRING,
                description: `The most relevant category ID for the product from the provided list.`,
            },
        },
        required: ['productName', 'photoType'],
    };

    const result = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = result.text;
    if (!jsonText) {
        throw new Error("AI did not return a valid identification response.");
    }

    try {
        const parsed = JSON.parse(jsonText);
        if (ALL_PRODUCT_TYPES.some(p => p.id === parsed.photoType)) {
            return parsed;
        } else {
            console.warn(`AI returned an invalid photoType: ${parsed.photoType}. Falling back.`);
            return { ...parsed, photoType: MARKETING_PRODUCT_TYPES[0].id };
        }
    } catch (e) {
        console.error("Failed to parse AI JSON response for identification:", jsonText);
        throw new Error("Could not understand the AI's product identification.");
    }
};


export const getStyleRecommendations = async (
    config: GenerationConfig,
    view: 'marketing' | 'food' | 'portrait',
    userQuery: string,
    apiKey: string,
    language: 'id' | 'en',
): Promise<{ reasoning: string, recommendations: Partial<GenerationConfig> }> => {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const category = getProductCategory(config.photoType);
    const options = optionsByCategory[category];
    const getOptionNames = (opts: StyleOption[]) => opts.map(o => o.name_en).join(', ');

    const productName = config.productName || ALL_PRODUCT_TYPES.find(p => p.id === config.photoType)?.[language === 'id' ? 'name_id' : 'name_en'];
    const responseLanguage = language === 'id' ? 'Indonesian' : 'English';

    const prompt = `You are an expert creative director AI assistant for a photography app. The user needs recommendations for their photo shoot.

**CRITICAL: Your explanation ("reasoning") MUST be in ${responseLanguage}.**

User's product: "${productName}"
Photography mode: "${view}"

Here are the available style options the app supports. Your recommendations for angle, lighting, styling, and background MUST be one of the exact English names from these lists if a suitable option exists.

Angle Options: ${getOptionNames(options.angles)}
Lighting Options: ${getOptionNames(options.lighting)}
Styling Options: ${getOptionNames(options.styling)}
Background Options: ${getOptionNames(options.backgrounds)}
${view === 'portrait' ? `Outfit Options: ${getOptionNames(options.outfits)}` : ''}

Based on the user's request: "${userQuery}", provide a creative direction.
First, give a friendly and concise explanation of your creative vision in ${responseLanguage}.
Then, provide your specific style choices. If you recommend a background not in the list, provide a descriptive custom string for 'backgroundStyle'. For portrait mode, also recommend an outfit.

Respond with your answer.`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            reasoning: {
                type: Type.STRING,
                description: `A friendly and concise explanation of the creative vision for the user, written in ${responseLanguage}. Formatted as clean HTML paragraph.`,
            },
            recommendations: {
                type: Type.OBJECT,
                properties: {
                    angleStyle: { type: Type.STRING, description: "The English name of the recommended angle style from the provided list." },
                    lightingStyle: { type: Type.STRING, description: "The English name of the recommended lighting style from the provided list." },
                    stylingStyle: { type: Type.STRING, description: "The English name of the recommended styling style from the provided list." },
                    backgroundStyle: { type: Type.STRING, description: "The English name of the recommended background style from the list, OR a custom descriptive string." },
                    outfitStyle: { type: Type.STRING, description: "Optional. For portrait mode, the English name of the recommended outfit style from the list." },
                },
                required: ['angleStyle', 'lightingStyle', 'stylingStyle', 'backgroundStyle'],
            },
        },
        required: ['reasoning', 'recommendations'],
    };

    const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = result.text;
    if (!jsonText) {
        throw new Error("AI did not return a valid response.");
    }

    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse AI JSON response:", jsonText);
        throw new Error("Could not understand the AI's recommendation format.");
    }
};

export const getInitialPosterText = async (
    productName: string,
    apiKey: string,
    language: 'id' | 'en',
): Promise<{ headline: string, bodyText: string, cta: string }> => {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    const responseLanguage = language === 'id' ? 'Indonesian' : 'English';
    const prompt = POSTER_INITIAL_TEXT_SYSTEM_PROMPT_TEMPLATE
        .replace('{{response_language}}', responseLanguage)
        .replace('{{product_name}}', productName);

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            headline: { type: Type.STRING, description: "A catchy and effective headline for the poster." },
            bodyText: { type: Type.STRING, description: "A short and informative body text. Can be empty." },
            cta: { type: Type.STRING, description: "A clear and strong call to action." },
        },
        required: ['headline', 'bodyText', 'cta'],
    };

    const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema,
        },
    });

    const jsonText = result.text;
    if (!jsonText) {
        throw new Error("AI did not return valid initial text for the poster.");
    }
    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse AI JSON response for initial poster text:", jsonText);
        throw new Error("Could not understand the AI's initial poster text format.");
    }
};

export const getPosterRecommendations = async (
    config: PosterConfig,
    userQuery: string,
    apiKey: string,
    language: 'id' | 'en',
): Promise<{ reasoning: string, recommendations: Partial<PosterConfig> }> => {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const responseLanguage = language === 'id' ? 'Indonesian' : 'English';
    const getOptionNames = (opts: StyleOption[]) => `'${opts.map(o => o.name_en).join("', '")}'`;

    const prompt = POSTER_ASSISTANT_SYSTEM_PROMPT_TEMPLATE
        .replace('{{response_language}}', responseLanguage)
        .replace('{{product_name}}', config.productName || 'the user\'s product')
        .replace('{{user_query}}', userQuery)
        .replace('{{theme_options}}', getOptionNames(POSTER_THEMES))
        .replace('{{color_palette_options}}', getOptionNames(COLOR_PALETTES))
        .replace('{{font_style_options}}', getOptionNames(FONT_STYLES));

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            reasoning: {
                type: Type.STRING,
                description: `A friendly and concise explanation of the creative vision for the poster text, written in ${responseLanguage}. Formatted as clean HTML paragraph.`,
            },
            recommendations: {
                type: Type.OBJECT,
                properties: {
                    theme: { type: Type.STRING, description: "The English name of the recommended theme from the provided list." },
                    colorPalette: { type: Type.STRING, description: "The English name of the recommended color palette from the provided list." },
                    fontStyle: { type: Type.STRING, description: "The English name of the recommended font style from the provided list." },
                    headline: { type: Type.STRING, description: "A catchy and effective headline for the poster." },
                    bodyText: { type: Type.STRING, description: "A short and informative body text. Can be empty." },
                    cta: { type: Type.STRING, description: "A clear and strong call to action." },
                },
                required: ['theme', 'colorPalette', 'fontStyle', 'headline', 'bodyText', 'cta'],
            },
        },
        required: ['reasoning', 'recommendations'],
    };

    const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = result.text;
    if (!jsonText) {
        throw new Error("AI did not return a valid response for poster recommendations.");
    }

    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse AI JSON response for poster recommendations:", jsonText);
        throw new Error("Could not understand the AI's poster recommendation format.");
    }
};