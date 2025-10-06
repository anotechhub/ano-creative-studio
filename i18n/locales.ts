


export interface Locale {
    sidebar: SidebarLocale;
    header: HeaderLocale;
    app: AppLocale;
    imageUploader: ImageUploaderLocale;
    productNameInput: ProductNameInputLocale;
    styleConfigurator: StyleConfiguratorLocale;
    resultsGrid: ResultsGridLocale;
    faqModal: FaqModalLocale;
    featuresModal: FeaturesModalLocale;
    settingsModal: SettingsModalLocale;
    bottomNav: BottomNavLocale;
    footer: FooterLocale;
    aiAssistant: AiAssistantLocale;
    posterDesigner: PosterDesignerLocale;
}

export interface SidebarLocale {
    productPhotography: string;
    foodPhotography: string;
    portraitPhotography: string;
    posterDesign: string;
    settings: string;
}

export interface HeaderLocale {
    support: string;
    toggleTheme: string;
    settings: string;
}

export interface AppLocale {
    uploadError: string;
    generationErrorGeneral: string;
    generationErrorSpecific: string;
    upscaleError: string;
    processing: string;
    generateButton: string;
    errorTitle: string;
    apiKeyMissingError: string;
    startNewSession: string;
    maxPosterImagesError: string;
    posterPromptTitle: string;
    posterPromptMessage: string;
    posterPromptConfirm: string;
    posterPromptCancel: string;
}

export interface ImageUploaderLocale {
    title: string;
    subtitle: string;
    styleImageTitle: string;
    styleImageSubtitle: string;
    dragAndDrop: string;
    fileConstraints: string;
    fileError: string;
    imagePreviewAlt: string;
    removeImage: string;
}

export interface ProductNameInputLocale {
    title: string;
    subtitle: string;
    placeholder: string;
    foodPlaceholder: string;
    identifying: string;
}

export interface StyleConfiguratorLocale {
    title: string;
    subtitle: string;
    photoType: string;
    foodType: string;
    backgroundStyle: string;
    customBackgroundPlaceholder: string;
    extraInstructions: string;
    extraInstructionsPlaceholder: string;
    useCustomWatermark: string;
    useCustomWatermarkTooltip: string;
    customWatermarkPlaceholder: string;
    angleStyle: string;
    lightingStyle: string;
    stylingStyle: string;
    outfitStyle: string;
}

export interface ResultsGridLocale {
    title: string;
    subtitle: string;
    downloadAll: string;
    emptyState: string;
    generatingState: string;
    upscalingState: string;
    upscaled: string;
    errorState: string;
    altText: string;
    download: string;
    copied: string;
    copyPrompt: string;
    upscaleAll: string;
    preview: string;
    readyForMarketingTitle: string;
    readyForMarketingDesc: string;
    continueToPosterButton: string;
    selectForPoster: string;
}

export interface FaqModalLocale {
    title: string;
    questions: Array<{ question: string; answer: string; }>;
    close: string;
}

export interface FeaturesModalLocale {
    title: string;
    features: Array<{ title: string; description: string; }>;
    close: string;
}

export interface SettingsModalLocale {
    title: string;
    appearanceTitle: string;
    language: string;
    id: string;
    en: string;
    theme: string;
    light: string;
    dark: string;
    generationTitle: string;
    numberOfImages: string;
    images: string;
    defaultsTitle: string;
    defaultWatermark: string;
    defaultWatermarkDesc: string;
    save: string;
    reset: string;
    resetConfirm: string;
}

export interface BottomNavLocale {
    product: string;
    food: string;
    portrait: string;
    poster: string;
    settings: string;
}

export interface FooterLocale {
    brandName: string;
    brandDescription: string;
    productTitle: string;
    featuresLink: string;
    faqLink: string;
    followUsTitle: string;
    copyright: string;
}

export interface AiAssistantLocale {
    widgetButton: string;
    modalTitle: string;
    placeholder: string;
    initialMessageGeneric: string;
    initialMessageProduct: string;
    initialMessagePortrait: string;
    initialMessagePoster: string;
    applyButton: string;
    appliedMessage: string;
    uploadFirstMessage: string;
}

export interface PosterDesignerLocale {
    title: string;
    subtitle: string;
    uploaderTitle: string;
    uploaderSubtitle: string;
    sourceImageTitle: string;
    sourceImageError: string;
    productNameTitle: string;
    productNameSubtitle: string;
    productNamePlaceholder: string;
    identifying: string;
    generatingInitialText: string;
    configurePosterTitle: string;
    configurePosterSubtitle: string;
    posterTheme: string;
    colorPalette: string;
    fontStyle: string;
    headline: string;
    headlinePlaceholder: string;
    bodyText: string;
    bodyTextPlaceholder: string;
    callToAction: string;
    callToActionPlaceholder: string;
    generateButton: string;
    generatingPoster: string;
    posterResultTitle: string;
    posterResultSubtitle: string;
    downloadAll: string;
    altText: string;
    preview: string;
    download: string;
    copied: string;
    copyPrompt: string;
    errorState: string;
}


const id: Locale = {
    sidebar: {
        productPhotography: "Fotografi Produk",
        foodPhotography: "Fotografi Makanan",
        portraitPhotography: "Fotografi Potret",
        posterDesign: "Desain Poster AI",
        settings: "Pengaturan",
    },
    header: {
        support: "Dukungan Admin",
        toggleTheme: "Ganti tema",
        settings: "Pengaturan",
    },
    app: {
        uploadError: "Harap unggah foto produk Anda terlebih dahulu.",
        generationErrorGeneral: "Terjadi kesalahan saat membuat gambar.",
        generationErrorSpecific: "Gagal membuat gambar.",
        upscaleError: "Beberapa gambar gagal di-upscale.",
        processing: "Memproses...",
        generateButton: "Buat Foto Profesional",
        errorTitle: "Terjadi Kesalahan",
        apiKeyMissingError: "Kunci API tidak ditemukan atau tidak valid.",
        startNewSession: "Mulai Sesi Baru",
        maxPosterImagesError: "Anda hanya dapat memilih 1 gambar.",
        posterPromptTitle: "Lanjutkan ke Desain Poster?",
        posterPromptMessage: "Hasil foto Anda sudah siap! Arahkan kursor ke gambar dan klik ikon poster untuk memilihnya, lalu lanjutkan ke Desain Poster.",
        posterPromptConfirm: "Ya, Lanjutkan",
        posterPromptCancel: "Nanti Saja",
    },
    imageUploader: {
        title: "Unggah Foto Anda",
        subtitle: "Mulai dengan mengunggah foto produk atau potret Anda.",
        styleImageTitle: "Unggah Foto Gaya (Opsional)",
        styleImageSubtitle: "Unggah foto kedua untuk referensi gaya, pakaian, atau suasana.",
        dragAndDrop: "Klik untuk mengunggah atau seret foto",
        fileConstraints: "PNG atau JPG (maks. 10MB)",
        fileError: "Hanya file PNG atau JPG (maks. 10MB) yang diperbolehkan.",
        imagePreviewAlt: "Pratinjau Gambar",
        removeImage: "Hapus gambar",
    },
    productNameInput: {
        title: "Nama Subjek/Produk",
        subtitle: "AI akan mendeteksi otomatis. Anda bisa mengubahnya jika perlu.",
        placeholder: "Contoh: Keripik Singkong Pedas Manis",
        foodPlaceholder: "Contoh: Nasi Goreng Spesial",
        identifying: "Mengidentifikasi produk...",
    },
    styleConfigurator: {
        title: "Atur Gaya Foto",
        subtitle: "Pilih jenis, gaya, dan latar belakang foto.",
        photoType: "Jenis Subjek/Produk",
        foodType: "Jenis Makanan/Minuman",
        backgroundStyle: "Latar Belakang",
        customBackgroundPlaceholder: "Tulis latar belakang kustom...",
        extraInstructions: "Instruksi Tambahan (Opsional)",
        extraInstructionsPlaceholder: "Contoh: tambahkan bayangan lembut, pencahayaan hangat",
        useCustomWatermark: "Gunakan Watermark Kustom",
        useCustomWatermarkTooltip: "Nonaktifkan untuk menggunakan watermark default 'anotechhub'. Aktifkan dan kosongkan untuk menghapus watermark.",
        customWatermarkPlaceholder: "Tulis watermark Anda di sini...",
        angleStyle: "Angle & Komposisi",
        lightingStyle: "Pencahayaan & Suasana",
        stylingStyle: "Properti & Penataan",
        outfitStyle: "Gaya Pakaian",
    },
    resultsGrid: {
        title: "Hasil Foto",
        subtitle: "Variasi foto Anda akan dibuat di sini.",
        downloadAll: "Unduh Semua",
        emptyState: "Hasil akan muncul di sini",
        generatingState: "Membuat foto...",
        upscalingState: "Meningkatkan resolusi...",
        upscaled: "Resolusi Tinggi",
        errorState: "Gagal membuat gambar",
        altText: "Foto hasil AI",
        download: "Unduh",
        copied: "Disalin!",
        copyPrompt: "Salin Prompt",
        upscaleAll: "Tingkatkan Resolusi ke HD",
        preview: "Pratinjau",
        readyForMarketingTitle: "Siap untuk Pemasaran?",
        readyForMarketingDesc: "Pilih satu foto terbaik untuk dibuatkan poster oleh AI.",
        continueToPosterButton: "Lanjutkan ke Desain Poster ({count})",
        selectForPoster: "Pilih untuk Poster",
    },
    faqModal: {
        title: "Pertanyaan Umum",
        questions: [
            {
                question: "Foto seperti apa yang paling baik untuk diunggah?",
                answer: "Untuk hasil terbaik, gunakan foto dengan subjek yang jelas, pencahayaan merata, dan resolusi tinggi. Latar belakang yang sederhana akan membantu AI fokus pada subjek utama Anda.",
            },
            {
                question: "Apa perbedaan antara mode Produk, Makanan, dan Potret?",
                answer: "Setiap mode dirancang khusus dengan pilihan gaya (sudut, pencahayaan, dll.) yang relevan untuk kategorinya, memastikan Anda mendapatkan hasil yang paling sesuai dan berkualitas.",
            },
            {
                question: "Bagaimana cara mendapatkan hasil yang lebih baik?",
                answer: "Jangan ragu bereksperimen dengan kombinasi gaya yang berbeda. Gunakan juga kolom 'Instruksi Tambahan' untuk memberi arahan lebih spesifik kepada AI, seperti 'tambahkan irisan lemon di samping gelas'.",
            },
            {
                question: "Apa itu fitur 'Upscale'?",
                answer: "Fitur 'Upscale' akan meningkatkan resolusi gambar pilihan Anda menjadi kualitas 2K. Ini membuat gambar jauh lebih tajam dan detail, cocok untuk dicetak atau platform digital berkualitas tinggi.",
            },
        ],
        close: "Tutup",
    },
    featuresModal: {
        title: "Fitur Utama AnoStudio",
        features: [
            {
                title: "Tiga Mode Fotografi",
                description: "Pilih antara mode Fotografi Produk, Makanan, atau Potret untuk mendapatkan hasil yang paling sesuai dengan kebutuhan spesifik Anda.",
            },
            {
                title: "Kustomisasi Gaya Penuh",
                description: "Kontrol penuh atas sudut pengambilan gambar, pencahayaan, properti penataan, hingga latar belakang untuk mewujudkan visi kreatif Anda.",
            },
            {
                title: "Hasil Multi-variasi & Resolusi Tinggi",
                description: "Hasilkan hingga 6 variasi foto dalam sekali proses, lalu tingkatkan kualitas gambar favorit Anda menjadi 2K yang super tajam.",
            },
            {
                title: "Watermark Otomatis",
                description: "Lindungi hasil karya foto Anda dengan menambahkan watermark 'anotechhub' yang halus dan profesional secara otomatis.",
            },
        ],
        close: "Tutup",
    },
    settingsModal: {
        title: "Pengaturan",
        appearanceTitle: "Tampilan",
        language: "Bahasa",
        id: "ID",
        en: "EN",
        theme: "Tema",
        light: "Terang",
        dark: "Gelap",
        generationTitle: "Generasi Gambar",
        numberOfImages: "Jumlah Gambar per Sesi",
        images: "Gambar",
        defaultsTitle: "Default",
        defaultWatermark: "Gunakan Watermark Kustom saat Memulai",
        defaultWatermarkDesc: "Jika nonaktif, watermark default 'anotechhub' akan digunakan.",
        save: "Simpan Pengaturan",
        reset: "Reset ke Awal",
        resetConfirm: "Apakah Anda yakin ingin mereset semua pengaturan ke default?",
    },
    bottomNav: {
        product: "Produk",
        food: "Makanan",
        portrait: "Potret",
        poster: "Poster",
        settings: "Pengaturan",
    },
    footer: {
        brandName: "Ano Creative Studio",
        brandDescription: "Ubah foto produk, makanan, dan potret biasa menjadi gambar iklan profesional berkualitas tinggi dengan kekuatan AI.",
        productTitle: "Informasi",
        featuresLink: "Fitur",
        faqLink: "FAQ",
        followUsTitle: "Ikuti Kami",
        copyright: "© {year} Anotechhub. Semua hak dilindungi undang-undang.",
    },
    aiAssistant: {
        widgetButton: "Asisten AI",
        modalTitle: "Asisten Gaya AI",
        placeholder: "Minta rekomendasi...",
        initialMessageGeneric: "Halo! Saya asisten AI Anda. Tanyakan apa saja tentang gaya foto, misalnya 'berikan gaya yang cocok untuk keripik singkong'.",
        initialMessageProduct: "Halo! Saya melihat Anda mengunggah foto {productName}. Ada gaya foto seperti apa yang Anda inginkan?",
        initialMessagePortrait: "Halo! Untuk caption foto Anda, AI menyarankan: {photoCaption}. Gaya foto seperti apa yang Anda inginkan?",
        initialMessagePoster: "Halo! Saya siap membantu mendesain poster Anda. Beri tahu saya tema atau ide yang Anda inginkan, misalnya 'buatkan teks dan desain untuk promosi grand opening'.",
        applyButton: "Terapkan",
        appliedMessage: "Rekomendasi telah diterapkan! Silakan periksa konfigurasinya.",
        uploadFirstMessage: "Harap unggah foto terlebih dahulu untuk menggunakan Asisten AI.",
    },
    posterDesigner: {
        title: "AI Poster Designer",
        subtitle: "Ubah foto Anda menjadi poster iklan yang menarik.",
        uploaderTitle: "Unggah Foto untuk Poster",
        uploaderSubtitle: "Mulai dengan mengunggah foto yang ingin Anda jadikan poster.",
        sourceImageTitle: "Foto Pilihan Anda",
        sourceImageError: "Gagal memuat gambar sumber untuk poster.",
        productNameTitle: "Nama Produk/Subjek",
        productNameSubtitle: "AI akan mengisi ini secara otomatis. Anda bisa mengubahnya.",
        productNamePlaceholder: "Contoh: Martabak Cokelat Keju",
        identifying: "Mengidentifikasi produk...",
        generatingInitialText: "Membuat teks iklan awal...",
        configurePosterTitle: "Konfigurasi Desain Poster",
        configurePosterSubtitle: "Beri tahu AI gaya, warna, dan teks yang Anda inginkan.",
        posterTheme: "Tema & Gaya Poster",
        colorPalette: "Palet Warna",
        fontStyle: "Gaya Huruf (Tipografi)",
        headline: "Judul Utama (Headline)",
        headlinePlaceholder: "Contoh: Diskon Besar 50%!",
        bodyText: "Teks Isi (Opsional)",
        bodyTextPlaceholder: "Contoh: Baru! Rasa Cokelat Belgia",
        callToAction: "Ajakan Bertindak (CTA)",
        callToActionPlaceholder: "Contoh: Beli Sekarang di anostudio.com",
        generateButton: "Buat Poster AI",
        generatingPoster: "Membuat Poster...",
        posterResultTitle: "Hasil Poster Anda",
        posterResultSubtitle: "Empat variasi poster Anda akan muncul di sini setelah dibuat.",
        downloadAll: "Unduh Semua Poster",
        altText: "Poster hasil AI",
        preview: "Pratinjau",
        download: "Unduh",
        copied: "Disalin!",
        copyPrompt: "Salin Prompt",
        errorState: "Gagal membuat poster",
    },
};

const en: Locale = {
    sidebar: {
        productPhotography: "Product Photography",
        foodPhotography: "Food Photography",
        portraitPhotography: "Portrait Photography",
        posterDesign: "AI Poster Design",
        settings: "Settings",
    },
    header: {
        support: "Support Admin",
        toggleTheme: "Toggle theme",
        settings: "Settings",
    },
    app: {
        uploadError: "Please upload your photo first.",
        generationErrorGeneral: "An error occurred while generating images.",
        generationErrorSpecific: "Failed to create image.",
        upscaleError: "Some images failed to upscale.",
        processing: "Processing...",
        generateButton: "Generate Pro Photos",
        errorTitle: "An Error Occurred",
        apiKeyMissingError: "API Key not found or invalid.",
        startNewSession: "Start New Session",
        maxPosterImagesError: "You can only select 1 image.",
        posterPromptTitle: "Continue to Poster Design?",
        posterPromptMessage: "Your photos are ready! Hover over an image and click the poster icon to select it, then continue to the Poster Designer.",
        posterPromptConfirm: "Yes, Continue",
        posterPromptCancel: "Maybe Later",
    },
    imageUploader: {
        title: "Upload Your Photo",
        subtitle: "Start by uploading your existing product or portrait photo.",
        styleImageTitle: "Upload Style Image (Optional)",
        styleImageSubtitle: "Upload a second photo for style, clothing, or mood reference.",
        dragAndDrop: "Click to upload or drag and drop",
        fileConstraints: "PNG or JPG (max. 10MB)",
        fileError: "Only PNG or JPG files (max. 10MB) are allowed.",
        imagePreviewAlt: "Image Preview",
        removeImage: "Remove image",
    },
    productNameInput: {
        title: "Subject/Product Name",
        subtitle: "The AI will auto-detect this. You can change it if needed.",
        placeholder: "e.g., Sweet Spicy Cassava Chips",
        foodPlaceholder: "e.g., Special Fried Rice",
        identifying: "Identifying product...",
    },
    styleConfigurator: {
        title: "Configure Photo Style",
        subtitle: "Choose the subject type, photo style, and background.",
        photoType: "Subject/Product Type",
        foodType: "Food/Beverage Type",
        backgroundStyle: "Background",
        customBackgroundPlaceholder: "Enter custom background...",
        extraInstructions: "Additional Instructions (Optional)",
        extraInstructionsPlaceholder: "e.g., add soft shadows, warm lighting",
        useCustomWatermark: "Use Custom Watermark",
        useCustomWatermarkTooltip: "Disable to use default 'anotechhub' watermark. Enable and leave blank to remove watermark.",
        customWatermarkPlaceholder: "Enter your watermark text here...",
        angleStyle: "Angle & Composition",
        lightingStyle: "Lighting & Mood",
        stylingStyle: "Props & Styling",
        outfitStyle: "Outfit Style",
    },
    resultsGrid: {
        title: "Photo Results",
        subtitle: "Your photo variations will be generated here.",
        downloadAll: "Download All",
        emptyState: "Results will appear here",
        generatingState: "Generating photos...",
        upscalingState: "Upscaling...",
        upscaled: "Upscaled",
        errorState: "Failed to create image",
        altText: "AI-generated photo",
        download: "Download",
        copied: "Copied!",
        copyPrompt: "Copy Prompt",
        upscaleAll: "Upscale All to HD",
        preview: "Preview",
        readyForMarketingTitle: "Ready for Marketing?",
        readyForMarketingDesc: "Select one best photo to be made into a poster by AI.",
        continueToPosterButton: "Continue to Poster Design ({count})",
        selectForPoster: "Select for Poster",
    },
    faqModal: {
        title: "Frequently Asked Questions",
        questions: [
            {
                question: "What kind of photo works best to upload?",
                answer: "For the best results, use a photo with a clear subject, even lighting, and high resolution. A simple background helps the AI focus on your main subject.",
            },
            {
                question: "What's the difference between Product, Food, and Portrait modes?",
                answer: "Each mode is specifically designed with relevant style options (angles, lighting, etc.) for its category, ensuring you get the most appropriate and high-quality results.",
            },
            {
                question: "How can I get better results?",
                answer: "Don't hesitate to experiment with different style combinations. Also, use the 'Additional Instructions' field for more specific directions, such as 'add a slice of lemon next to the glass'.",
            },
            {
                question: "What is the 'Upscale' feature?",
                answer: "The 'Upscale' feature increases your selected image's resolution to 2K quality. This makes the image much sharper and more detailed, perfect for printing or high-quality digital platforms.",
            },
        ],
        close: "Close",
    },
    featuresModal: {
        title: "AnoStudio Key Features",
        features: [
            {
                title: "Three Photography Modes",
                description: "Choose between Product, Food, or Portrait photography modes to get results that are perfectly tailored to your specific needs.",
            },
            {
                title: "Full Style Customization",
                description: "Take full control over the angle, lighting, styling props, and background to bring your creative vision to life.",
            },
            {
                title: "Multi-variant & High-Res Outputs",
                description: "Generate up to 6 photo variations in a single run, then upscale your favorite images to a super-sharp 2K quality.",
            },
            {
                title: "Automatic Watermarking",
                description: "Protect your photo assets by automatically adding a subtle and professional 'anotechhub' watermark.",
            },
        ],
        close: "Close",
    },
    settingsModal: {
        title: "Settings",
        appearanceTitle: "Appearance",
        language: "Language",
        id: "ID",
        en: "EN",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        generationTitle: "Image Generation",
        numberOfImages: "Number of Images per Session",
        images: "Images",
        defaultsTitle: "Defaults",
        defaultWatermark: "Use Custom Watermark on Start",
        defaultWatermarkDesc: "If disabled, the 'anotechhub' watermark will be used by default.",
        save: "Save Settings",
        reset: "Reset to Default",
        resetConfirm: "Are you sure you want to reset all settings to their defaults?",
    },
    bottomNav: {
        product: "Product",
        food: "Food",
        portrait: "Portrait",
        poster: "Poster",
        settings: "Settings",
    },
    footer: {
        brandName: "Ano Creative Studio",
        brandDescription: "Transform your regular product, food, and portrait photos into high-quality, professional advertisement images with the power of AI.",
        productTitle: "Information",
        featuresLink: "Features",
        faqLink: "FAQ",
        followUsTitle: "Follow Us",
        copyright: "© {year} Anotechhub. All rights reserved.",
    },
    aiAssistant: {
        widgetButton: "AI Assistant",
        modalTitle: "AI Style Assistant",
        placeholder: "Ask for recommendations...",
        initialMessageGeneric: "Hello! I'm your AI assistant. Ask me anything about photo styles, for example, 'suggest a style for cassava chips'.",
        initialMessageProduct: "Hello! I see you've uploaded a photo of {productName}. What kind of photo style are you looking for?",
        initialMessagePortrait: "Hello! For your photo caption, the AI suggests: {photoCaption}. What kind of photo style are you looking for?",
        initialMessagePoster: "Hi! I'm ready to help design your poster. Tell me the theme or idea you have in mind, like 'create text and a design for a grand opening promotion'.",
        applyButton: "Apply",
        appliedMessage: "Recommendations have been applied! Please check the configuration.",
        uploadFirstMessage: "Please upload a photo first to use the AI Assistant.",
    },
    posterDesigner: {
        title: "AI Poster Designer",
        subtitle: "Turn your photos into stunning marketing posters.",
        uploaderTitle: "Upload Photo for Poster",
        uploaderSubtitle: "Start by uploading a photo you want to turn into a poster.",
        sourceImageTitle: "Your Chosen Photo",
        sourceImageError: "Failed to load the source image for the poster.",
        productNameTitle: "Product/Subject Name",
        productNameSubtitle: "The AI will fill this automatically. You can change it.",
        productNamePlaceholder: "e.g., Chocolate Cheese Martabak",
        identifying: "Identifying product...",
        generatingInitialText: "Generating initial ad copy...",
        configurePosterTitle: "Configure Poster Design",
        configurePosterSubtitle: "Tell the AI about the style, colors, and text you want.",
        posterTheme: "Poster Theme & Style",
        colorPalette: "Color Palette",
        fontStyle: "Font Style (Typography)",
        headline: "Headline",
        headlinePlaceholder: "e.g., Grand Opening 50% Off!",
        bodyText: "Body Text (Optional)",
        bodyTextPlaceholder: "e.g., New! Belgian Chocolate Flavor",
        callToAction: "Call to Action (CTA)",
        callToActionPlaceholder: "e.g., Shop Now at anostudio.com",
        generateButton: "Generate AI Poster",
        generatingPoster: "Generating Poster...",
        posterResultTitle: "Your Poster Results",
        posterResultSubtitle: "Four variations of your poster will appear here once generated.",
        downloadAll: "Download All Posters",
        altText: "AI-generated poster",
        preview: "Preview",
        download: "Download",
        copied: "Copied!",
        copyPrompt: "Copy Prompt",
        errorState: "Failed to create poster",
    },
};

export const locales = { id, en };