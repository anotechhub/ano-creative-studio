

export type ProductType = 
  // Makanan
  'makanan-ringan' | 'roti-kue' | 'makanan-beku' | 'bahan-masak' | 'hidangan-utama' | 'hidangan-pembuka' | 'hidangan-penutup' | 'mie-pasta' | 'seafood' |
  // Minuman
  'kopi-teh' | 'jus-smoothie' | 'minuman-kemasan' | 'minuman-tradisional' |
  // Kecantikan
  'skincare' | 'makeup' | 'parfum' | 'perawatan-rambut' |
  // Aksesoris
  'aksesoris-general' | 'perhiasan' | 'jam-tangan' | 'tas' | 'topi' | 'kacamata' |
  // Alat Masak
  'peralatan-masak' | 'peralatan-makan' | 'elektronik-dapur' | 'wadah-penyimpanan' |
  // Olahraga
  'pakaian-olahraga' | 'sepatu-olahraga' | 'aksesoris-gym' | 'alat-yoga-pilates' |
  // Potret
  'portrait-headshot' | 'portrait-full-body' | 'portrait-couple' | 'portrait-group';


export interface GenerationConfig {
  photoType: ProductType;
  productName?: string;
  angleStyle: string;
  lightingStyle: string;
  stylingStyle: string;
  outfitStyle: string;
  backgroundStyle: string;
  customBackgroundStyle?: string;
  extraInstructions: string;
  withWatermark: boolean;
  customWatermarkText?: string;
  styleImage?: File | null;
}

export interface PosterConfig {
  productName?: string;
  theme: string;
  colorPalette: string;
  fontStyle: string;
  headline: string;
  bodyText: string;
  cta: string;
}

export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
}

export interface ResultItem {
  id: number;
  status: 'empty' | 'generating' | 'completed' | 'error' | 'upscaling';
  data?: GeneratedImage;
  errorMessage?: string;
  upscaledImageUrl?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'id' | 'en';
  numberOfResults: 2 | 4 | 6;
  defaultWatermark: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  recommendations?: Partial<GenerationConfig> | Partial<PosterConfig>;
}