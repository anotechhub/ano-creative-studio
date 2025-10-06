import { ProductType } from './types';

export type StyleOption = {
  id: string;
  name_id: string;
  name_en: string;
};

export type Category = 'food' | 'beverage' | 'beauty' | 'fashion' | 'cookware' | 'sport' | 'portrait';

export const getProductCategory = (productType: ProductType): Category => {
  if (['makanan-ringan', 'roti-kue', 'makanan-beku', 'bahan-masak', 'hidangan-utama', 'hidangan-pembuka', 'hidangan-penutup', 'mie-pasta', 'seafood'].includes(productType)) {
    return 'food';
  }
  if (['kopi-teh', 'jus-smoothie', 'minuman-kemasan', 'minuman-tradisional'].includes(productType)) {
    return 'beverage';
  }
  if (['skincare', 'makeup', 'parfum', 'perawatan-rambut'].includes(productType)) {
    return 'beauty';
  }
  if (['aksesoris-general', 'perhiasan', 'jam-tangan', 'tas', 'topi', 'kacamata'].includes(productType)) {
    return 'fashion';
  }
  if (['peralatan-masak', 'peralatan-makan', 'elektronik-dapur', 'wadah-penyimpanan'].includes(productType)) {
    return 'cookware';
  }
  if (['pakaian-olahraga', 'sepatu-olahraga', 'aksesoris-gym', 'alat-yoga-pilates'].includes(productType)) {
    return 'sport';
  }
  if (['portrait-headshot', 'portrait-full-body', 'portrait-couple', 'portrait-group'].includes(productType)) {
    return 'portrait';
  }
  return 'food'; // Default
};

export const MARKETING_PRODUCT_TYPES: Array<Omit<StyleOption, 'id'> & {id: ProductType}> = [
  { id: 'makanan-ringan', name_id: 'Makanan Ringan', name_en: 'Snacks' },
  { id: 'roti-kue', name_id: 'Roti & Kue', name_en: 'Bakery & Cakes' },
  { id: 'makanan-beku', name_id: 'Makanan Beku', name_en: 'Frozen Food' },
  { id: 'bahan-masak', name_id: 'Bahan Masak', name_en: 'Cooking Ingredients' },
  { id: 'hidangan-utama', name_id: 'Hidangan Utama', name_en: 'Main Course' },
  { id: 'hidangan-pembuka', name_id: 'Hidangan Pembuka', name_en: 'Appetizer' },
  { id: 'hidangan-penutup', name_id: 'Hidangan Penutup', name_en: 'Dessert' },
  { id: 'mie-pasta', name_id: 'Mie & Pasta', name_en: 'Noodles & Pasta' },
  { id: 'seafood', name_id: 'Seafood', name_en: 'Seafood' },
  { id: 'kopi-teh', name_id: 'Kopi & Teh', name_en: 'Coffee & Tea' },
  { id: 'jus-smoothie', name_id: 'Jus & Smoothie', name_en: 'Juice & Smoothies' },
  { id: 'minuman-kemasan', name_id: 'Minuman Kemasan', name_en: 'Packaged Drinks' },
  { id: 'minuman-tradisional', name_id: 'Minuman Tradisional', name_en: 'Traditional Drinks' },
  { id: 'skincare', name_id: 'Skincare', name_en: 'Skincare' },
  { id: 'makeup', name_id: 'Makeup', name_en: 'Makeup' },
  { id: 'parfum', name_id: 'Parfum', name_en: 'Perfume' },
  { id: 'perawatan-rambut', name_id: 'Perawatan Rambut', name_en: 'Hair Care' },
  { id: 'aksesoris-general', name_id: 'Aksesoris (Umum)', name_en: 'Accessories (General)' },
  { id: 'perhiasan', name_id: 'Perhiasan', name_en: 'Jewelry' },
  { id: 'jam-tangan', name_id: 'Jam Tangan', name_en: 'Watches' },
  { id: 'tas', name_id: 'Tas & Dompet', name_en: 'Bags & Wallets' },
  { id: 'topi', name_id: 'Topi & Penutup Kepala', name_en: 'Hats & Headwear' },
  { id: 'kacamata', name_id: 'Kacamata', name_en: 'Eyewear' },
  { id: 'peralatan-masak', name_id: 'Peralatan Masak', name_en: 'Cookware' },
  { id: 'peralatan-makan', name_id: 'Peralatan Makan', name_en: 'Tableware' },
  { id: 'elektronik-dapur', name_id: 'Elektronik Dapur', name_en: 'Kitchen Electronics' },
  { id: 'wadah-penyimpanan', name_id: 'Wadah Penyimpanan', name_en: 'Storage Containers' },
  { id: 'pakaian-olahraga', name_id: 'Pakaian Olahraga', name_en: 'Sportswear' },
  { id: 'sepatu-olahraga', name_id: 'Sepatu Olahraga', name_en: 'Sports Shoes' },
  { id: 'aksesoris-gym', name_id: 'Aksesoris Gym', name_en: 'Gym Accessories' },
  { id: 'alat-yoga-pilates', name_id: 'Alat Yoga & Pilates', name_en: 'Yoga & Pilates Gear' },
];

export const FOOD_PHOTOGRAPHY_PRODUCT_TYPES: Array<Omit<StyleOption, 'id'> & {id: ProductType}> = MARKETING_PRODUCT_TYPES.filter(p => {
  const category = getProductCategory(p.id);
  return category === 'food' || category === 'beverage';
});

export const PORTRAIT_SUBJECT_TYPES: Array<Omit<StyleOption, 'id'> & {id: ProductType}> = [
  { id: 'portrait-headshot', name_id: 'Foto Wajah (Headshot)', name_en: 'Headshot Portrait' },
  { id: 'portrait-full-body', name_id: 'Seluruh Badan', name_en: 'Full Body Portrait' },
  { id: 'portrait-couple', name_id: 'Pasangan', name_en: 'Couple Portrait' },
  { id: 'portrait-group', name_id: 'Grup', name_en: 'Group Portrait' },
];


export const OTHER_OPTION: StyleOption = { id: 'other', name_id: 'Lainnya (Tulis Sendiri)...', name_en: 'Other (Write your own)...' };
export const RANDOM_OPTION: StyleOption = { id: 'random', name_id: 'Gaya Acak (Kejutan dari AI)', name_en: 'Random Style (AI Surprise)' };

// === MAKANAN ===
export const FOOD_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'top-down-flat-lay', name_id: 'Top-Down / Flat Lay', name_en: 'Top-Down / Flat Lay' },
    { id: '45-degree', name_id: 'Sudut 45 Derajat', name_en: '45-Degree Angle' },
    { id: 'eye-level', name_id: 'Setara Mata / Hero Shot', name_en: 'Eye-Level / Hero Shot' },
    { id: 'macro-close-up', name_id: 'Makro / Close-Up Detail', name_en: 'Macro / Close-Up Detail' },
    { id: 'low-angle', name_id: 'Sudut Rendah Dramatis', name_en: 'Dramatic Low Angle' },
    { id: 'dynamic-action', name_id: 'Aksi Dinamis (Dituang/Dipotong)', name_en: 'Dynamic Action (Pouring/Cutting)' },
    { id: 'wide-angle-tablescape', name_id: 'Wide Angle / Suasana Meja', name_en: 'Wide Angle / Tablescape' },
    { id: 'dutch-angle', name_id: 'Sudut Miring (Dutch Angle)', name_en: 'Dutch Angle' },
    { id: 'point-of-view', name_id: 'Sudut Pandang (Point of View)', name_en: 'Point of View (POV)' },
    { id: 'over-the-shoulder', name_id: 'Dari Atas Bahu', name_en: 'Over the Shoulder' },
    { id: 'product-lineup', name_id: 'Jajaran Produk', name_en: 'Product Lineup' },
    { id: 'deconstructed', name_id: 'Komposisi Terpisah (Deconstructed)', name_en: 'Deconstructed Composition' },
    { id: 'framing', name_id: 'Dengan Bingkai Alami (Framing)', name_en: 'Framing Composition' },
    { id: 'leading-lines', name_id: 'Garis Pemandu (Leading Lines)', name_en: 'Leading Lines' },
    { id: 'rule-of-thirds', name_id: 'Aturan Sepertiga (Rule of Thirds)', name_en: 'Rule of Thirds' },
    { id: 'negative-space', name_id: 'Ruang Negatif Minimalis', name_en: 'Minimalist Negative Space' },
    { id: 'pattern-repetition', name_id: 'Pola dan Pengulangan', name_en: 'Pattern and Repetition' },
    { id: 'food-portrait', name_id: 'Potret Makanan', name_en: 'Food Portrait' },
    { id: 'exploded-view', name_id: 'Bahan Melayang (Exploded View)', name_en: 'Exploded View / Levitation' },
];

export const FOOD_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'natural-bright', name_id: 'Cahaya Alami / Terang & Ceria', name_en: 'Natural Light / Bright & Airy' },
    { id: 'golden-hour', name_id: 'Cahaya Sore / Hangat & Keemasan', name_en: 'Golden Hour / Warm & Golden' },
    { id: 'studio-soft', name_id: 'Lampu Studio / Lembut & Merata', name_en: 'Studio Light / Soft & Even' },
    { id: 'dark-moody', name_id: 'Gelap & Dramatis (Moody)', name_en: 'Dark & Moody' },
    { id: 'cinematic', name_id: 'Sinematik dengan Bayangan Kuat', name_en: 'Cinematic with Hard Shadows' },
    { id: 'backlight', name_id: 'Backlight / Cahaya dari Belakang', name_en: 'Backlight' },
    { id: 'high-key', name_id: 'High-Key / Dominan Putih', name_en: 'High-Key / White Dominant' },
    { id: 'low-key', name_id: 'Low-Key / Dominan Gelap', name_en: 'Low-Key / Dark Dominant' },
    { id: 'split-lighting', name_id: 'Split Lighting', name_en: 'Split Lighting' },
    { id: 'rim-lighting', name_id: 'Rim Lighting / Cahaya Tepi', name_en: 'Rim Lighting' },
    { id: 'dappled-light', name_id: 'Cahaya Rindang (Dappled)', name_en: 'Dappled Light' },
    { id: 'artificial-neon', name_id: 'Lampu Neon Berwarna', name_en: 'Colored Neon Light' },
    { id: 'candlelight', name_id: 'Cahaya Lilin', name_en: 'Candlelight' },
    { id: 'morning-light', name_id: 'Cahaya Pagi yang Lembut', name_en: 'Soft Morning Light' },
    { id: 'overcast', name_id: 'Cuaca Mendung (Overcast)', name_en: 'Overcast Lighting' },
    { id: 'spotlight', name_id: 'Spotlight / Fokus Terpusat', name_en: 'Spotlight' },
    { id: 'color-gels', name_id: 'Gel Warna Artistik', name_en: 'Artistic Color Gels' },
    { id: 'window-light', name_id: 'Cahaya dari Jendela', name_en: 'Window Light' },
    { id: 'long-exposure', name_id: 'Efek Jejak Cahaya (Long Exposure)', name_en: 'Long Exposure Light Trails' },
];

export const FOOD_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'minimalist', name_id: 'Minimalis, Fokus pada Produk', name_en: 'Minimalist, Focus on Product' },
    { id: 'with-ingredients', name_id: 'Dengan Bahan Baku Segar', name_en: 'With Fresh Ingredients' },
    { id: 'lifestyle-human-element', name_id: 'Lifestyle / Dengan Elemen Manusia', name_en: 'Lifestyle / With Human Element' },
    { id: 'messy-and-delicious', name_id: 'Berantakan yang Menggugah Selera', name_en: 'Appetizingly Messy' },
    { id: 'rustic-natural', name_id: 'Gaya Rustic & Alami', name_en: 'Rustic & Natural Style' },
    { id: 'symmetrical-pattern', name_id: 'Pola Simetris', name_en: 'Symmetrical Pattern' },
    { id: 'monochromatic', name_id: 'Tema Warna Monokromatik', name_en: 'Monochromatic Color Theme' },
    { id: 'vintage-retro', name_id: 'Gaya Vintage / Retro', name_en: 'Vintage / Retro Style' },
    { id: 'modern-clean', name_id: 'Modern & Bersih', name_en: 'Modern & Clean' },
    { id: 'farm-to-table', name_id: 'Konsep "Farm to Table"', name_en: 'Farm to Table Concept' },
    { id: 'on-the-go', name_id: 'Konteks "On The Go"', name_en: '"On The Go" Context' },
    { id: 'with-packaging', name_id: 'Bersama Kemasan Produk', name_en: 'With Product Packaging' },
    { id: 'deconstructed-dish', name_id: 'Bahan-bahan Terpisah', name_en: 'Deconstructed Ingredients' },
    { id: 'texture-focus', name_id: 'Fokus pada Tekstur', name_en: 'Texture Focus' },
    { id: 'cut-in-half', name_id: 'Makanan Terpotong Setengah', name_en: 'Cut in Half' },
    { id: 'with-steam-smoke', name_id: 'Dengan Uap/Asap Panas', name_en: 'With Steam/Smoke' },
    { id: 'holiday-themed', name_id: 'Tema Hari Raya (Natal, Lebaran)', name_en: 'Holiday Themed (Christmas, Eid)' },
    { id: 'stacked-high', name_id: 'Makanan Ditumpuk Tinggi', name_en: 'Stacked High' },
    { id: 'with-drinks', name_id: 'Dipasangkan dengan Minuman', name_en: 'Paired with Drinks' },
];

export const FOOD_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'rustic-wood-table', name_id: 'Meja Kayu Rustic', name_en: 'Rustic Wood Table' },
    { id: 'white-marble', name_id: 'Marmer Putih Elegan', name_en: 'Elegant White Marble' },
    { id: 'solid-pastel-color', name_id: 'Warna Solid Pastel', name_en: 'Solid Pastel Color' },
    { id: 'modern-kitchen-blur', name_id: 'Dapur Modern (Blur)', name_en: 'Modern Kitchen (Blur)' },
    { id: 'picnic-park', name_id: 'Taman Piknik', name_en: 'Picnic Park' },
    { id: 'slate-stone', name_id: 'Batu Tulis Gelap', name_en: 'Dark Slate Stone' },
    { id: 'linen-fabric', name_id: 'Kain Linen Bertekstur', name_en: 'Textured Linen Fabric' },
    { id: 'concrete-surface', name_id: 'Permukaan Beton Industrial', name_en: 'Industrial Concrete Surface' },
    { id: 'fresh-garden', name_id: 'Kebun dengan Sayuran Segar', name_en: 'Garden with Fresh Vegetables' },
    { id: 'cozy-cafe', name_id: 'Suasana Kafe yang Nyaman', name_en: 'Cozy Cafe Atmosphere' },
    { id: 'vibrant-market', name_id: 'Pasar Tradisional (Blur)', name_en: 'Traditional Market (Blur)' },
    { id: 'baking-scene', name_id: 'Latar Proses Membuat Kue', name_en: 'Baking Scene Background' },
    { id: 'geometric-patterns', name_id: 'Pola Geometris Berwarna', name_en: 'Colored Geometric Patterns' },
    { id: 'beach-sand', name_id: 'Pasir Pantai', name_en: 'Beach Sand' },
    { id: 'dark-wood', name_id: 'Kayu Gelap Elegan', name_en: 'Elegant Dark Wood' },
    { id: 'neutral-ceramic-tiles', name_id: 'Keramik Netral', name_en: 'Neutral Ceramic Tiles' },
    { id: 'blurred-restaurant', name_id: 'Restoran (Blur)', name_en: 'Blurred Restaurant' },
    { id: 'floating-podium', name_id: 'Podium Melayang Minimalis', name_en: 'Minimalist Floating Podium' },
    { id: 'watercolor-splash', name_id: 'Percikan Cat Air Abstrak', name_en: 'Abstract Watercolor Splash' },
    { id: 'vintage-newspaper', name_id: 'Alas Koran Vintage', name_en: 'Vintage Newspaper Base' },
    OTHER_OPTION,
];


// === MINUMAN ===
export const BEVERAGE_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'eye-level-hero', name_id: 'Setara Mata / Hero Shot', name_en: 'Eye-Level / Hero Shot' },
    { id: 'low-angle-dramatic', name_id: 'Sudut Rendah Dramatis', name_en: 'Dramatic Low Angle' },
    { id: 'top-down-flat-lay', name_id: 'Top-Down / Flat Lay', name_en: 'Top-Down / Flat Lay' },
    { id: 'macro-detail', name_id: 'Makro (Detail Embun/Buih)', name_en: 'Macro (Condensation/Foam Detail)' },
    { id: 'pouring-action', name_id: 'Aksi Menuang', name_en: 'Pouring Action' },
    { id: 'splash-action', name_id: 'Aksi Percikan (Splash)', name_en: 'Splash Action' },
    { id: 'group-of-drinks', name_id: 'Komposisi Grup Minuman', name_en: 'Group of Drinks Composition' },
    { id: 'point-of-view-drinking', name_id: 'Sudut Pandang (POV) Minum', name_en: 'Point of View (POV) Drinking' },
    { id: 'wide-angle-bar-scene', name_id: 'Wide Angle / Suasana Bar', name_en: 'Wide Angle / Bar Scene' },
    { id: 'reflection-shot', name_id: 'Komposisi dengan Refleksi', name_en: 'Reflection Shot Composition' },
    { id: 'dutch-angle-dynamic', name_id: 'Sudut Miring Dinamis', name_en: 'Dynamic Dutch Angle' },
    { id: 'product-in-context', name_id: 'Produk dalam Konteks (di Meja)', name_en: 'Product in Context (on a table)' },
    { id: 'from-above-glass', name_id: 'Langsung dari Atas Gelas', name_en: 'Directly Above the Glass' },
    { id: 'product-and-glass', name_id: 'Produk & Gelas Sajian Berdampingan', name_en: 'Product & Serving Glass Side-by-Side' },
    { id: 'line-up-flavors', name_id: 'Jajaran Varian Rasa', name_en: 'Flavor Line-up' },
    { id: 'framing-with-props', name_id: 'Framing dengan Properti', name_en: 'Framing with Props' },
    { id: 'high-angle', name_id: 'Sudut Tinggi', name_en: 'High Angle' },
    { id: 'close-up-ice', name_id: 'Close-up Detail Es Batu', name_en: 'Close-up Ice Detail' },
    { id: 'through-the-glass', name_id: 'Melihat Melalui Kaca', name_en: 'Through the Glass' },
];
export const BEVERAGE_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'backlight-glow', name_id: 'Backlight (Menyala dari Belakang)', name_en: 'Backlight (Glowing from Behind)' },
    { id: 'bright-outdoor', name_id: 'Cahaya Terang Outdoor / Siang Hari', name_en: 'Bright Outdoor / Daylight' },
    { id: 'dark-moody-bar', name_id: 'Suasana Bar (Gelap & Dramatis)', name_en: 'Bar Scene (Dark & Moody)' },
    { id: 'studio-clean', name_id: 'Lampu Studio Bersih & Tajam', name_en: 'Clean & Crisp Studio Light' },
    { id: 'golden-hour-warm', name_id: 'Cahaya Sore Hangat', name_en: 'Warm Golden Hour Light' },
    { id: 'cinematic-shadows', name_id: 'Sinematik dengan Bayangan Kuat', name_en: 'Cinematic with Hard Shadows' },
    { id: 'neon-lights', name_id: 'Lampu Neon Berwarna', name_en: 'Colored Neon Lights' },
    { id: 'rim-lighting-highlight', name_id: 'Rim Light (Menyorot Tepi Gelas)', name_en: 'Rim Light (Highlighting Glass Edge)' },
    { id: 'soft-window-light', name_id: 'Cahaya Jendela yang Lembut', name_en: 'Soft Window Light' },
    { id: 'high-key-refreshing', name_id: 'High-Key (Cerah & Menyegarkan)', name_en: 'High-Key (Bright & Refreshing)' },
    { id: 'low-key-luxury', name_id: 'Low-Key (Mewah & Eksklusif)', name_en: 'Low-Key (Luxurious & Exclusive)' },
    { id: 'dappled-sunlight', name_id: 'Cahaya Matahari Rindang', name_en: 'Dappled Sunlight' },
    { id: 'candlelight-intimate', name_id: 'Cahaya Lilin (Intim)', name_en: 'Candlelight (Intimate)' },
    { id: 'spotlight-on-drink', name_id: 'Spotlight Fokus pada Minuman', name_en: 'Spotlight on the Drink' },
    { id: 'underlit', name_id: 'Cahaya dari Bawah (Underlit)', name_en: 'Underlit' },
    { id: 'color-gel-creative', name_id: 'Gel Warna Kreatif', name_en: 'Creative Color Gels' },
    { id: 'overcast-soft', name_id: 'Cahaya Mendung yang Lembut', name_en: 'Soft Overcast Light' },
    { id: 'firelight', name_id: 'Cahaya Api Unggun', name_en: 'Firelight' },
    { id: 'blue-hour', name_id: 'Cahaya "Blue Hour"', name_en: 'Blue Hour Lighting' },
];
export const BEVERAGE_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'condensation-fresh', name_id: 'Dengan Embun Dingin (Segar)', name_en: 'With Condensation (Fresh)' },
    { id: 'with-fresh-garnishes', name_id: 'Dengan Garnish Segar (Buah/Daun)', name_en: 'With Fresh Garnishes (Fruit/Leaves)' },
    { id: 'surrounded-by-ingredients', name_id: 'Dikelilingi Bahan Baku', name_en: 'Surrounded by Ingredients' },
    { id: 'lifestyle-cheers', name_id: 'Lifestyle (Bersulang/Cheers)', name_en: 'Lifestyle (Cheers)' },
    { id: 'hand-holding-drink', name_id: 'Tangan Memegang Minuman', name_en: 'Hand Holding Drink' },
    { id: 'minimalist-clean', name_id: 'Minimalis & Bersih', name_en: 'Minimalist & Clean' },
    { id: 'on-a-tray', name_id: 'Disajikan di atas Nampan', name_en: 'Served on a Tray' },
    { id: 'with-steam-hot', name_id: 'Dengan Uap (Minuman Panas)', name_en: 'With Steam (Hot Drink)' },
    { id: 'ice-cubes-detail', name_id: 'Dengan Detail Es Batu', name_en: 'With Ice Cubes Detail' },
    { id: 'rustic-natural', name_id: 'Gaya Rustic & Alami', name_en: 'Rustic & Natural Style' },
    { id: 'product-in-fridge', name_id: 'Produk di dalam Kulkas', name_en: 'Product in Fridge' },
    { id: 'paired-with-food', name_id: 'Dipasangkan dengan Makanan', name_en: 'Paired with Food' },
    { id: 'trio-of-drinks', name_id: 'Tiga Gelas Berjajar', name_en: 'Trio of Drinks' },
    { id: 'action-swirl', name_id: 'Aksi Mengaduk (Swirl)', name_en: 'Swirling Action' },
    { id: 'in-takeaway-cup', name_id: 'Dalam Gelas Bawa Pulang', name_en: 'In a Takeaway Cup' },
    { id: 'luxury-elegant', name_id: 'Penataan Mewah & Elegan', name_en: 'Luxury & Elegant Styling' },
    { id: 'beach-holiday-vibe', name_id: 'Suasana Liburan Pantai', name_en: 'Beach Holiday Vibe' },
    { id: 'cozy-at-home', name_id: 'Suasana Nyaman di Rumah', name_en: 'Cozy at Home Vibe' },
    { id: 'party-celebration', name_id: 'Tema Pesta & Perayaan', name_en: 'Party & Celebration Theme' },
];
export const BEVERAGE_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'bar-counter', name_id: 'Meja Bar Modern', name_en: 'Modern Bar Counter' },
    { id: 'poolside', name_id: 'Tepi Kolam Renang', name_en: 'Poolside' },
    { id: 'coffee-shop-blur', name_id: 'Kedai Kopi (Blur)', name_en: 'Coffee Shop (Blur)' },
    { id: 'tropical-leaves', name_id: 'Daun-daun Tropis', name_en: 'Tropical Leaves' },
    { id: 'solid-vibrant-color', name_id: 'Warna Solid Cerah', name_en: 'Solid Vibrant Color' },
    { id: 'wooden-deck', name_id: 'Dek Kayu Outdoor', name_en: 'Outdoor Wooden Deck' },
    { id: 'kitchen-counter', name_id: 'Meja Dapur Bersih', name_en: 'Clean Kitchen Counter' },
    { id: 'fruit-market', name_id: 'Pasar Buah (Blur)', name_en: 'Fruit Market (Blur)' },
    { id: 'sunset-beach', name_id: 'Pantai Saat Matahari Terbenam', name_en: 'Sunset Beach' },
    { id: 'cozy-reading-nook', name_id: 'Sudut Baca yang Nyaman', name_en: 'Cozy Reading Nook' },
    { id: 'dark-slate', name_id: 'Batu Tulis Gelap dengan Tetesan Air', name_en: 'Dark Slate with Water Drops' },
    { id: 'ice-cave', name_id: 'Gua Es Abstrak', name_en: 'Abstract Ice Cave' },
    { id: 'gradient-background', name_id: 'Latar Belakang Gradien', name_en: 'Gradient Background' },
    { id: 'picnic-blanket', name_id: 'Alas Piknik di Rumput', name_en: 'Picnic Blanket on Grass' },
    { id: 'rooftop-city-view', name_id: 'Atap Gedung Pemandangan Kota', name_en: 'Rooftop City View' },
    { id: 'tea-plantation', name_id: 'Perkebunan Teh (Blur)', name_en: 'Tea Plantation (Blur)' },
    { id: 'minimalist-podium', name_id: 'Podium Minimalis', name_en: 'Minimalist Podium' },
    { id: 'rainy-window', name_id: 'Jendela Berembun Saat Hujan', name_en: 'Rainy Window' },
    { id: 'celebration-confetti', name_id: 'Konfeti Pesta (Blur)', name_en: 'Celebration Confetti (Blur)' },
    { id: 'library-study-desk', name_id: 'Meja Belajar Perpustakaan', name_en: 'Library Study Desk' },
    OTHER_OPTION,
];

// === KECANTIKAN ===
export const BEAUTY_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'flat-lay-top-down', name_id: 'Flat Lay / Top-Down', name_en: 'Flat Lay / Top-Down' },
    { id: 'eye-level-hero', name_id: 'Setara Mata / Hero Shot', name_en: 'Eye-Level / Hero Shot' },
    { id: 'macro-texture', name_id: 'Makro / Detail Tekstur Produk', name_en: 'Macro / Product Texture Detail' },
    { id: '45-degree-angle', name_id: 'Sudut 45 Derajat', name_en: '45-Degree Angle' },
    { id: 'product-lineup', name_id: 'Jajaran Grup Produk', name_en: 'Product Group Lineup' },
    { id: 'low-angle-pedestal', name_id: 'Sudut Rendah di Podium', name_en: 'Low Angle on Pedestal' },
    { id: 'exploded-view', name_id: 'Komposisi Terpisah (Exploded View)', name_en: 'Exploded View Composition' },
    { id: 'dutch-angle-edgy', name_id: 'Sudut Miring (Dutch Angle)', name_en: 'Edgy Dutch Angle' },
    { id: 'straight-on-packaging', name_id: 'Tampak Depan Kemasan', name_en: 'Straight-on Packaging Shot' },
    { id: 'high-angle-overview', name_id: 'Sudut Tinggi (Overview)', name_en: 'High Angle Overview' },
    { id: 'close-up-applicator', name_id: 'Close-up Aplikator', name_en: 'Applicator Close-up' },
    { id: 'asymmetrical-balance', name_id: 'Komposisi Asimetris', name_en: 'Asymmetrical Balance' },
    { id: 'rule-of-thirds', name_id: 'Aturan Sepertiga', name_en: 'Rule of Thirds' },
    { id: 'framing-with-props', name_id: 'Framing dengan Properti', name_en: 'Framing with Props' },
    { id: 'centered-symmetrical', name_id: 'Simetris di Tengah', name_en: 'Centered & Symmetrical' },
    { id: 'product-in-motion', name_id: 'Produk Dalam Gerakan', name_en: 'Product in Motion' },
    { id: 'stacked-vertically', name_id: 'Produk Ditumpuk Vertikal', name_en: 'Vertically Stacked' },
    { id: 'diagonal-lines', name_id: 'Komposisi Garis Diagonal', name_en: 'Diagonal Lines Composition' },
    { id: 'reflection', name_id: 'Komposisi dengan Refleksi', name_en: 'Reflection Composition' },
];
export const BEAUTY_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'soft-diffused', name_id: 'Cahaya Lembut & Merata (Soft)', name_en: 'Soft & Diffused Light' },
    { id: 'bright-clinical', name_id: 'Cahaya Terang & Klinis', name_en: 'Bright & Clinical Light' },
    { id: 'sunlight-shadow-play', name_id: 'Cahaya Matahari & Bayangan', name_en: 'Sunlight & Shadow Play' },
    { id: 'dramatic-hard-light', name_id: 'Cahaya Keras & Dramatis', name_en: 'Dramatic Hard Light' },
    { id: 'luxury-dark-moody', name_id: 'Mewah (Gelap & Dramatis)', name_en: 'Luxury (Dark & Moody)' },
    { id: 'backlight-glow', name_id: 'Backlight / Cahaya dari Belakang', name_en: 'Backlight / Glow' },
    { id: 'golden-hour-warmth', name_id: 'Cahaya Sore yang Hangat', name_en: 'Golden Hour Warmth' },
    { id: 'ring-light-beauty', name_id: 'Cahaya "Ring Light"', name_en: 'Ring Light' },
    { id: 'neon-futuristic', name_id: 'Lampu Neon Futuristik', name_en: 'Futuristic Neon Light' },
    { id: 'rim-lighting-edges', name_id: 'Rim Light (Menyorot Tepi)', name_en: 'Rim Light (Highlighting Edges)' },
    { id: 'underwater-effect', name_id: 'Efek Cahaya Bawah Air', name_en: 'Underwater Light Effect' },
    { id: 'caustic-light', name_id: 'Refleksi Cahaya Air (Caustics)', name_en: 'Caustic Light Reflections' },
    { id: 'spotlight-focus', name_id: 'Spotlight Terpusat', name_en: 'Focused Spotlight' },
    { id: 'high-key-ethereal', name_id: 'High-Key (Ethereal)', name_en: 'High-Key (Ethereal)' },
    { id: 'low-key-mysterious', name_id: 'Low-Key (Misterius)', name_en: 'Low-Key (Mysterious)' },
    { id: 'holographic-light', name_id: 'Cahaya Holografik', name_en: 'Holographic Light' },
    { id: 'gobo-patterns', name_id: 'Pola Bayangan (Gobo)', name_en: 'Gobo Shadow Patterns' },
    { id: 'split-lighting-duality', name_id: 'Split Lighting', name_en: 'Split Lighting' },
    { id: 'soft-glow', name_id: 'Pendaran Cahaya Lembut', name_en: 'Soft Glow' },
];
export const BEAUTY_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'product-smear-swatch', name_id: 'Tekstur Produk (Swirl/Smear)', name_en: 'Product Texture (Swirl/Smear)' },
    { id: 'minimalist-on-pedestal', name_id: 'Minimalis di Atas Podium', name_en: 'Minimalist on Pedestal' },
    { id: 'with-natural-elements', name_id: 'Dengan Elemen Alam (Bunga/Daun)', name_en: 'With Natural Elements (Flowers/Leaves)' },
    { id: 'water-splash-fresh', name_id: 'Percikan Air Segar', name_en: 'Fresh Water Splash' },
    { id: 'lifestyle-in-use', name_id: 'Lifestyle (Sedang Digunakan)', name_en: 'Lifestyle (In Use)' },
    { id: 'floating-levitation', name_id: 'Produk Melayang (Levitasi)', name_en: 'Floating Product (Levitation)' },
    { id: 'laboratory-clean', name_id: 'Gaya Laboratorium Bersih', name_en: 'Clean Laboratory Style' },
    { id: 'on-a-mirror', name_id: 'Di Atas Cermin dengan Refleksi', name_en: 'On a Mirror with Reflection' },
    { id: 'shelfie-style', name_id: 'Ditata di Rak ("Shelfie")', name_en: '"Shelfie" Style Arrangement' },
    { id: 'deconstructed-ingredients', name_id: 'Bahan Baku di Sekitar Produk', name_en: 'Ingredients Around Product' },
    { id: 'hand-model-applying', name_id: 'Model Tangan Mengaplikasikan', name_en: 'Hand Model Applying' },
    { id: 'in-a-makeup-bag', name_id: 'Di dalam Tas Makeup', name_en: 'Inside a Makeup Bag' },
    { id: 'monochromatic-theme', name_id: 'Tema Warna Monokromatik', name_en: 'Monochromatic Color Theme' },
    { id: 'with-silk-fabric', name_id: 'Dengan Kain Sutra Mewah', name_en: 'With Luxury Silk Fabric' },
    { id: 'on-ice', name_id: 'Di Atas Es', name_en: 'On Ice' },
    { id: 'geometric-blocks', name_id: 'Dengan Blok Geometris', name_en: 'With Geometric Blocks' },
    { id: 'product-and-packaging', name_id: 'Produk & Kotak Kemasan', name_en: 'Product & Packaging Box' },
    { id: 'minimalist-with-shadow', name_id: 'Minimalis dengan Bayangan Artistik', name_en: 'Minimalist with Artistic Shadow' },
    { id: 'on-sand', name_id: 'Di Atas Pasir', name_en: 'On Sand' },
];
export const BEAUTY_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'white-marble-surface', name_id: 'Permukaan Marmer Putih', name_en: 'White Marble Surface' },
    { id: 'silk-fabric', name_id: 'Kain Sutra Mewah', name_en: 'Luxury Silk Fabric' },
    { id: 'concrete-pedestal', name_id: 'Podium Beton', name_en: 'Concrete Pedestal' },
    { id: 'blurred-bathroom', name_id: 'Kamar Mandi Modern (Blur)', name_en: 'Modern Bathroom (Blur)' },
    { id: 'water-surface', name_id: 'Permukaan Air Beriak', name_en: 'Rippling Water Surface' },
    { id: 'pink-pastel-solid', name_id: 'Warna Solid Pink Pastel', name_en: 'Solid Pink Pastel Color' },
    { id: 'fresh-flowers', name_id: 'Bunga Segar (Mawar, Peony)', name_en: 'Fresh Flowers (Roses, Peonies)' },
    { id: 'acrylic-blocks', name_id: 'Blok Akrilik Bening', name_en: 'Clear Acrylic Blocks' },
    { id: 'vanity-table', name_id: 'Meja Rias Elegan', name_en: 'Elegant Vanity Table' },
    { id: 'tropical-leaf-shadows', name_id: 'Bayangan Daun Tropis', name_en: 'Tropical Leaf Shadows' },
    { id: 'black-slate', name_id: 'Batu Tulis Hitam', name_en: 'Black Slate' },
    { id: 'sand-dunes', name_id: 'Gurun Pasir Halus', name_en: 'Soft Sand Dunes' },
    { id: 'holographic-foil', name_id: 'Latar Holografik', name_en: 'Holographic Background' },
    { id: 'geometric-tiles', name_id: 'Ubin Geometris', name_en: 'Geometric Tiles' },
    { id: 'lab-glassware', name_id: 'Peralatan Gelas Laboratorium', name_en: 'Lab Glassware' },
    { id: 'soft-focus-garden', name_id: 'Taman Bunga (Fokus Lembut)', name_en: 'Soft Focus Flower Garden' },
    { id: 'gold-textured', name_id: 'Permukaan Emas Bertekstur', name_en: 'Gold Textured Surface' },
    { id: 'minimalist-arch', name_id: 'Lengkungan Arsitektur Minimalis', name_en: 'Minimalist Architectural Arch' },
    { id: 'crushed-ice', name_id: 'Pecahan Es', name_en: 'Crushed Ice' },
    { id: 'gradient-aurora', name_id: 'Gradien Warna Aurora', name_en: 'Aurora Gradient Color' },
    OTHER_OPTION,
];

// === AKSESORIS ===
export const FASHION_ACCESSORIES_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'flat-lay-top-down', name_id: 'Flat Lay / Top-Down', name_en: 'Flat Lay / Top-Down' },
    { id: 'eye-level-hero', name_id: 'Setara Mata / Hero Shot', name_en: 'Eye-Level / Hero Shot' },
    { id: 'macro-detail', name_id: 'Makro / Detail Bahan', name_en: 'Macro / Material Detail' },
    { id: '45-degree-angle', name_id: 'Sudut 45 Derajat', name_en: '45-Degree Angle' },
    { id: 'product-lineup', name_id: 'Jajaran Grup Produk', name_en: 'Product Group Lineup' },
    { id: 'low-angle-pedestal', name_id: 'Sudut Rendah di Podium', name_en: 'Low Angle on Pedestal' },
    { id: 'dutch-angle-edgy', name_id: 'Sudut Miring (Dutch Angle)', name_en: 'Edgy Dutch Angle' },
    { id: 'on-model', name_id: 'Dikenakan Model (Close-up)', name_en: 'Worn by Model (Close-up)' },
    { id: 'straight-on', name_id: 'Tampak Depan Lurus', name_en: 'Straight-on View' },
    { id: 'high-angle-overview', name_id: 'Sudut Tinggi (Overview)', name_en: 'High Angle Overview' },
    { id: 'asymmetrical-balance', name_id: 'Komposisi Asimetris', name_en: 'Asymmetrical Balance' },
    { id: 'rule-of-thirds', name_id: 'Aturan Sepertiga', name_en: 'Rule of Thirds' },
    { id: 'framing-with-props', name_id: 'Framing dengan Properti', name_en: 'Framing with Props' },
    { id: 'centered-symmetrical', name_id: 'Simetris di Tengah', name_en: 'Centered & Symmetrical' },
    { id: 'product-in-motion', name_id: 'Produk Dalam Gerakan', name_en: 'Product in Motion' },
    { id: 'stacked', name_id: 'Produk Ditumpuk', name_en: 'Stacked' },
    { id: 'diagonal-lines', name_id: 'Komposisi Garis Diagonal', name_en: 'Diagonal Lines Composition' },
    { id: 'reflection', name_id: 'Komposisi dengan Refleksi', name_en: 'Reflection Composition' },
];
export const FASHION_ACCESSORIES_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'soft-diffused', name_id: 'Cahaya Lembut & Merata (Soft)', name_en: 'Soft & Diffused Light' },
    { id: 'bright-clean', name_id: 'Cahaya Terang & Bersih', name_en: 'Bright & Clean Light' },
    { id: 'sunlight-shadow-play', name_id: 'Cahaya Matahari & Bayangan', name_en: 'Sunlight & Shadow Play' },
    { id: 'dramatic-hard-light', name_id: 'Cahaya Keras & Dramatis', name_en: 'Dramatic Hard Light' },
    { id: 'luxury-dark-moody', name_id: 'Mewah (Gelap & Dramatis)', name_en: 'Luxury (Dark & Moody)' },
    { id: 'backlight-glow', name_id: 'Backlight / Cahaya dari Belakang', name_en: 'Backlight / Glow' },
    { id: 'golden-hour-warmth', name_id: 'Cahaya Sore yang Hangat', name_en: 'Golden Hour Warmth' },
    { id: 'ring-light-clean', name_id: 'Cahaya "Ring Light" Bersih', name_en: 'Clean Ring Light' },
    { id: 'neon-futuristic', name_id: 'Lampu Neon Futuristik', name_en: 'Futuristic Neon Light' },
    { id: 'rim-lighting-edges', name_id: 'Rim Light (Menyorot Tepi)', name_en: 'Rim Light (Highlighting Edges)' },
    { id: 'underwater-effect', name_id: 'Efek Cahaya Bawah Air', name_en: 'Underwater Light Effect' },
    { id: 'caustic-light', name_id: 'Refleksi Cahaya Air (Caustics)', name_en: 'Caustic Light Reflections' },
    { id: 'spotlight-focus', name_id: 'Spotlight Terpusat', name_en: 'Focused Spotlight' },
    { id: 'high-key-ethereal', name_id: 'High-Key (Ethereal)', name_en: 'High-Key (Ethereal)' },
    { id: 'low-key-mysterious', name_id: 'Low-Key (Misterius)', name_en: 'Low-Key (Mysterious)' },
    { id: 'holographic-light', name_id: 'Cahaya Holografik', name_en: 'Holographic Light' },
    { id: 'gobo-patterns', name_id: 'Pola Bayangan (Gobo)', name_en: 'Gobo Shadow Patterns' },
    { id: 'split-lighting-duality', name_id: 'Split Lighting', name_en: 'Split Lighting' },
    { id: 'soft-glow', name_id: 'Pendaran Cahaya Lembut', name_en: 'Soft Glow' },
];
export const FASHION_ACCESSORIES_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'minimalist-on-pedestal', name_id: 'Minimalis di Atas Podium', name_en: 'Minimalist on Pedestal' },
    { id: 'with-natural-elements', name_id: 'Dengan Elemen Alam (Bunga/Batu)', name_en: 'With Natural Elements (Flowers/Stones)' },
    { id: 'lifestyle-in-use', name_id: 'Lifestyle (Sedang Dikenakan)', name_en: 'Lifestyle (In Use)' },
    { id: 'floating-levitation', name_id: 'Produk Melayang (Levitasi)', name_en: 'Floating Product (Levitation)' },
    { id: 'on-a-mirror', name_id: 'Di Atas Cermin dengan Refleksi', name_en: 'On a Mirror with Reflection' },
    { id: 'hand-model-holding', name_id: 'Model Tangan Memegang/Mengenakan', name_en: 'Hand Model Holding/Wearing' },
    { id: 'in-a-box-or-bag', name_id: 'Di dalam Kotak Perhiasan/Tas', name_en: 'Inside a Jewelry Box/Bag' },
    { id: 'monochromatic-theme', name_id: 'Tema Warna Monokromatik', name_en: 'Monochromatic Color Theme' },
    { id: 'with-silk-fabric', name_id: 'Dengan Kain Sutra Mewah', name_en: 'With Luxury Silk Fabric' },
    { id: 'geometric-blocks', name_id: 'Dengan Blok Geometris', name_en: 'With Geometric Blocks' },
    { id: 'product-and-packaging', name_id: 'Produk & Kotak Kemasan', name_en: 'Product & Packaging Box' },
    { id: 'minimalist-with-shadow', name_id: 'Minimalis dengan Bayangan Artistik', name_en: 'Minimalist with Artistic Shadow' },
    { id: 'on-sand', name_id: 'Di Atas Pasir', name_en: 'On Sand' },
    { id: 'casually-placed-on-table', name_id: 'Diletakkan di Meja Rias/Kerja', name_en: 'Casually Placed on a Vanity/Desk' },
    { id: 'on-mannequin-bust', name_id: 'Pada Manekin Leher/Tangan', name_en: 'On a Mannequin Bust/Hand' },
    { id: 'with-architectural-elements', name_id: 'Dengan Elemen Arsitektur', name_en: 'With Architectural Elements' },
    { id: 'color-blocking', name_id: 'Penataan "Color Blocking"', name_en: 'Color Blocking Arrangement' },
    { id: 'vintage-props', name_id: 'Dengan Properti Vintage', name_en: 'With Vintage Props' },
];
export const FASHION_ACCESSORIES_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'white-marble-surface', name_id: 'Permukaan Marmer Putih', name_en: 'White Marble Surface' },
    { id: 'silk-fabric', name_id: 'Kain Sutra Mewah', name_en: 'Luxury Silk Fabric' },
    { id: 'concrete-pedestal', name_id: 'Podium Beton', name_en: 'Concrete Pedestal' },
    { id: 'blurred-boutique', name_id: 'Butik Mewah (Blur)', name_en: 'Blurred Luxury Boutique' },
    { id: 'water-surface', name_id: 'Permukaan Air Beriak', name_en: 'Rippling Water Surface' },
    { id: 'neutral-pastel-solid', name_id: 'Warna Solid Netral/Pastel', name_en: 'Solid Neutral/Pastel Color' },
    { id: 'fresh-flowers', name_id: 'Bunga Segar', name_en: 'Fresh Flowers' },
    { id: 'acrylic-blocks', name_id: 'Blok Akrilik Bening', name_en: 'Clear Acrylic Blocks' },
    { id: 'vanity-table', name_id: 'Meja Rias Elegan', name_en: 'Elegant Vanity Table' },
    { id: 'tropical-leaf-shadows', name_id: 'Bayangan Daun Tropis', name_en: 'Tropical Leaf Shadows' },
    { id: 'black-slate', name_id: 'Batu Tulis Hitam', name_en: 'Black Slate' },
    { id: 'sand-dunes', name_id: 'Gurun Pasir Halus', name_en: 'Soft Sand Dunes' },
    { id: 'holographic-foil', name_id: 'Latar Holografik', name_en: 'Holographic Background' },
    { id: 'geometric-tiles', name_id: 'Ubin Geometris', name_en: 'Geometric Tiles' },
    { id: 'soft-focus-garden', name_id: 'Taman Bunga (Fokus Lembut)', name_en: 'Soft Focus Flower Garden' },
    { id: 'gold-textured', name_id: 'Permukaan Emas Bertekstur', name_en: 'Gold Textured Surface' },
    { id: 'minimalist-arch', name_id: 'Lengkungan Arsitektur Minimalis', name_en: 'Minimalist Architectural Arch' },
    { id: 'rich-velvet', name_id: 'Kain Beludru Mewah', name_en: 'Rich Velvet Fabric' },
    { id: 'gradient-aurora', name_id: 'Gradien Warna Aurora', name_en: 'Aurora Gradient Color' },
    OTHER_OPTION,
];


// === ALAT MASAK ===
export const COOKWARE_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'flat-lay-organized', name_id: 'Flat Lay Peralatan Tertata', name_en: 'Organized Utensils Flat Lay' },
    { id: 'in-action-cooking', name_id: 'Aksi (Sedang Memasak)', name_en: 'In Action (Cooking)' },
    { id: 'eye-level-hero', name_id: 'Hero Shot Setara Mata', name_en: 'Eye-Level Hero Shot' },
    { id: 'low-angle-stovetop', name_id: 'Sudut Rendah di Atas Kompor', name_en: 'Low Angle on Stovetop' },
    { id: 'detail-shot-material', name_id: 'Close-up Detail Material', name_en: 'Material Detail Close-up' },
    { id: 'product-line-up', name_id: 'Jajaran Satu Set Produk', name_en: 'Product Set Line-up' },
    { id: 'hanging-on-a-rack', name_id: 'Tergantung di Rak Dapur', name_en: 'Hanging on a Kitchen Rack' },
    { id: 'stacked-symmetrically', name_id: 'Ditumpuk Secara Simetris', name_en: 'Symmetrically Stacked' },
    { id: 'point-of-view-cooking', name_id: 'Sudut Pandang (POV) Memasak', name_en: 'Point of View (POV) Cooking' },
    { id: 'exploded-view', name_id: 'Bagian-bagian Terpisah (Exploded)', name_en: 'Exploded View' },
    { id: 'wide-angle-kitchen', name_id: 'Wide Angle Suasana Dapur', name_en: 'Wide Angle Kitchen Scene' },
    { id: 'top-down-on-table', name_id: 'Top-Down di Meja Makan', name_en: 'Top-Down on Dining Table' },
    { id: 'product-in-hand', name_id: 'Produk di Tangan', name_en: 'Product in Hand' },
    { id: 'comparison-shot', name_id: 'Perbandingan Ukuran/Model', name_en: 'Size/Model Comparison' },
    { id: 'from-inside-oven', name_id: 'Dari Dalam Oven/Lemari', name_en: 'From Inside Oven/Cabinet' },
    { id: 'reflection-on-steel', name_id: 'Refleksi pada Permukaan Logam', name_en: 'Reflection on Metal Surface' },
    { id: 'dutch-angle', name_id: 'Sudut Miring (Dutch Angle)', name_en: 'Dutch Angle' },
    { id: 'food-in-pan', name_id: 'Close-up Makanan di Dalamnya', name_en: 'Close-up of Food Inside' },
    { id: 'architectural', name_id: 'Sudut Pandang Arsitektural', name_en: 'Architectural Angle' },
];
export const COOKWARE_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'bright-kitchen', name_id: 'Cahaya Dapur yang Terang', name_en: 'Bright Kitchen Light' },
    { id: 'warm-morning-light', name_id: 'Cahaya Pagi yang Hangat', name_en: 'Warm Morning Light' },
    { id: 'dramatic-sidelight', name_id: 'Cahaya Samping Dramatis', name_en: 'Dramatic Sidelight' },
    { id: 'soft-studio-light', name_id: 'Cahaya Studio yang Lembut', name_en: 'Soft Studio Light' },
    { id: 'dark-moody-kitchen', name_id: 'Dapur Gelap & Dramatis', name_en: 'Dark Moody Kitchen' },
    { id: 'backlight-steam', name_id: 'Backlight Menyorot Uap', name_en: 'Backlight on Steam' },
    { id: 'rim-light-shape', name_id: 'Rim Light Menegaskan Bentuk', name_en: 'Rim Light Defining Shape' },
    { id: 'natural-window-light', name_id: 'Cahaya Jendela Alami', name_en: 'Natural Window Light' },
    { id: 'professional-chef-kitchen', name_id: 'Cahaya Dapur Chef Profesional', name_en: 'Professional Chef Kitchen Lighting' },
    { id: 'high-contrast', name_id: 'Kontras Tinggi Hitam Putih', name_en: 'High-Contrast Black and White' },
    { id: 'cinematic', name_id: 'Pencahayaan Sinematik', name_en: 'Cinematic Lighting' },
    { id: 'spotlight-on-product', name_id: 'Spotlight pada Produk', name_en: 'Spotlight on Product' },
    { id: 'clean-commercial', name_id: 'Cahaya Komersial yang Bersih', name_en: 'Clean Commercial Lighting' },
    { id: 'low-key-industrial', name_id: 'Low-Key Industrial', name_en: 'Low-Key Industrial' },
    { id: 'golden-hour', name_id: 'Cahaya Sore Keemasan', name_en: 'Golden Hour' },
    { id: 'overcast-soft', name_id: 'Cahaya Mendung yang Lembut', name_en: 'Soft Overcast Light' },
    { id: 'colored-gels', name_id: 'Gel Warna Artistik', name_en: 'Artistic Color Gels' },
    { id: 'under-cabinet-light', name_id: 'Cahaya dari Bawah Kabinet', name_en: 'Under-Cabinet Lighting' },
    { id: 'fire-stovetop', name_id: 'Cahaya dari Api Kompor', name_en: 'Light from Stovetop Flame' },
];
export const COOKWARE_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'clean-organized-kitchen', name_id: 'Tertata Rapi di Dapur', name_en: 'Neatly Organized in Kitchen' },
    { id: 'with-fresh-ingredients', name_id: 'Dengan Bahan Masak Segar', name_en: 'With Fresh Cooking Ingredients' },
    { id: 'lifestyle-serving-food', name_id: 'Lifestyle (Menyajikan Makanan)', name_en: 'Lifestyle (Serving Food)' },
    { id: 'minimalist-scandinavian', name_id: 'Minimalis Skandinavia', name_en: 'Minimalist Scandinavian' },
    { id: 'rustic-farmhouse', name_id: 'Gaya Dapur Pedesaan', name_en: 'Farmhouse Kitchen Style' },
    { id: 'professional-chef', name_id: 'Gaya Dapur Chef Profesional', name_en: 'Professional Chef Kitchen Style' },
    { id: 'messy-cooking-process', name_id: 'Proses Memasak (Agak Berantakan)', name_en: 'Messy Cooking Process' },
    { id: 'product-in-packaging', name_id: 'Produk di Dalam Kemasan', name_en: 'Product in Packaging' },
    { id: 'human-hand-interaction', name_id: 'Interaksi Tangan Manusia', name_en: 'Human Hand Interaction' },
    { id: 'before-and-after', name_id: 'Konsep Sebelum & Sesudah Masak', name_en: 'Before & After Cooking Concept' },
    { id: 'monochromatic-theme', name_id: 'Tema Warna Monokromatik', name_en: 'Monochromatic Color Theme' },
    { id: 'on-a-dining-table', name_id: 'Disajikan di Meja Makan', name_en: 'Served on a Dining Table' },
    { id: 'with-recipe-book', name_id: 'Dengan Buku Resep Terbuka', name_en: 'With an Open Recipe Book' },
    { id: 'modern-industrial', name_id: 'Gaya Industrial Modern', name_en: 'Modern Industrial Style' },
    { id: 'floating-levitation', name_id: 'Peralatan Melayang (Levitasi)', name_en: 'Floating Utensils (Levitation)' },
    { id: 'in-a-dishwasher', name_id: 'Di dalam Mesin Cuci Piring', name_en: 'Inside a Dishwasher' },
    { id: 'outdoor-bbq-setting', name_id: 'Konteks Barbekyu Outdoor', name_en: 'Outdoor BBQ Setting' },
    { id: 'family-cooking', name_id: 'Suasana Memasak Keluarga', name_en: 'Family Cooking Atmosphere' },
    { id: 'color-coordinated', name_id: 'Penataan Warna Senada', name_en: 'Color-Coordinated Arrangement' },
];
export const COOKWARE_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'kitchen-countertop-marble', name_id: 'Meja Dapur Marmer', name_en: 'Marble Kitchen Countertop' },
    { id: 'wooden-chopping-board', name_id: 'Talenan Kayu', name_en: 'Wooden Chopping Board' },
    { id: 'subway-tile-wall', name_id: 'Dinding Keramik Subway', name_en: 'Subway Tile Wall' },
    { id: 'butcher-block-island', name_id: 'Meja Dapur Kayu (Butcher Block)', name_en: 'Butcher Block Island' },
    { id: 'stainless-steel-surface', name_id: 'Permukaan Stainless Steel', name_en: 'Stainless Steel Surface' },
    { id: 'solid-color-matte', name_id: 'Warna Solid Doff', name_en: 'Matte Solid Color' },
    { id: 'open-shelving', name_id: 'Rak Dapur Terbuka', name_en: 'Open Kitchen Shelving' },
    { id: 'dining-table-setting', name_id: 'Set Meja Makan', name_en: 'Dining Table Setting' },
    { id: 'blurred-professional-kitchen', name_id: 'Dapur Profesional (Blur)', name_en: 'Blurred Professional Kitchen' },
    { id: 'pantry-background', name_id: 'Latar Belakang Pantry', name_en: 'Pantry Background' },
    { id: 'concrete-wall', name_id: 'Dinding Beton Industrial', name_en: 'Industrial Concrete Wall' },
    { id: 'vegetable-garden', name_id: 'Kebun Sayur', name_en: 'Vegetable Garden' },
    { id: 'dark-moody-kitchen', name_id: 'Dapur Gelap & Dramatis', name_en: 'Dark Moody Kitchen' },
    { id: 'linen-tablecloth', name_id: 'Taplak Meja Linen', name_en: 'Linen Tablecloth' },
    { id: 'outdoor-bbq-area', name_id: 'Area Barbekyu Outdoor', name_en: 'Outdoor BBQ Area' },
    { id: 'farmers-market', name_id: 'Pasar Petani (Blur)', name_en: 'Farmers Market (Blur)' },
    { id: 'pegboard-organizer', name_id: 'Dinding Pegboard', name_en: 'Pegboard Organizer Wall' },
    { id: 'terrazzo-surface', name_id: 'Permukaan Terrazzo', name_en: 'Terrazzo Surface' },
    { id: 'modern-kitchen-sink', name_id: 'Wastafel Dapur Modern', name_en: 'Modern Kitchen Sink' },
    { id: 'blueprint-schematic', name_id: 'Latar Gambar Teknis (Blueprint)', name_en: 'Blueprint Schematic Background' },
    OTHER_OPTION,
];

// === OLAHRAGA ===
export const SPORTS_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'in-action-use', name_id: 'Aksi (Sedang Digunakan)', name_en: 'In Action (In Use)' },
    { id: 'flat-lay-gear-set', name_id: 'Flat Lay (Satu Set Perlengkapan)', name_en: 'Gear Set Flat Lay' },
    { id: 'low-angle-hero', name_id: 'Sudut Rendah Heroik', name_en: 'Low-Angle Heroic' },
    { id: 'close-up-texture-detail', name_id: 'Close-up Detail & Tekstur', name_en: 'Close-up Texture & Detail' },
    { id: 'top-down-angle', name_id: 'Sudut Pandang Atas (Top-down)', name_en: 'Top-down Angle' },
    { id: 'point-of-view-athlete', name_id: 'Sudut Pandang (POV) Atlet', name_en: 'Athlete\'s Point of View (POV)' },
    { id: 'motion-blur-effect', name_id: 'Efek Gerak (Motion Blur)', name_en: 'Motion Blur Effect' },
    { id: 'dutch-angle-dynamic', name_id: 'Sudut Miring Dinamis', name_en: 'Dynamic Dutch Angle' },
    { id: 'product-on-pedestal', name_id: 'Produk di Atas Podium', name_en: 'Product on Pedestal' },
    { id: 'exploded-view-tech', name_id: 'Bagian Terpisah (Teknologi)', name_en: 'Exploded View (Technology)' },
    { id: 'wide-angle-environment', name_id: 'Wide Angle dengan Lingkungan', name_en: 'Wide Angle with Environment' },
    { id: 'on-a-mannequin', name_id: 'Pada Manekin (Untuk Pakaian)', name_en: 'On a Mannequin (For Apparel)' },
    { id: 'comparison-shot', name_id: 'Foto Perbandingan', name_en: 'Comparison Shot' },
    { id: 'from-the-ground', name_id: 'Dari Permukaan Tanah', name_en: 'From the Ground Up' },
    { id: 'symmetrical-layout', name_id: 'Tata Letak Simetris', name_en: 'Symmetrical Layout' },
    { id: 'product-line-up', name_id: 'Jajaran Varian Warna/Model', name_en: 'Color/Model Line-up' },
    { id: 'high-angle-overview', name_id: 'Sudut Tinggi (Overview)', name_en: 'High-Angle Overview' },
    { id: 'tracking-shot', name_id: 'Mengikuti Subjek (Tracking Shot)', name_en: 'Tracking Shot' },
    { id: 'frozen-motion', name_id: 'Gerakan yang Dibekukan', name_en: 'Frozen Motion' },
];
export const SPORTS_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'dramatic-hard-light', name_id: 'Cahaya Keras & Dramatis', name_en: 'Dramatic Hard Light' },
    { id: 'bright-daylight', name_id: 'Cahaya Terang Siang Hari', name_en: 'Bright Daylight' },
    { id: 'stadium-lights-night', name_id: 'Lampu Stadion (Malam Hari)', name_en: 'Stadium Lights (Night)' },
    { id: 'dark-and-gritty', name_id: 'Gaya Gelap & Keras', name_en: 'Dark and Gritty Style' },
    { id: 'clean-studio-light', name_id: 'Cahaya Studio yang Bersih', name_en: 'Clean Studio Light' },
    { id: 'golden-hour-outdoor', name_id: 'Cahaya Sore Outdoor', name_en: 'Outdoor Golden Hour' },
    { id: 'backlight-silhouette', name_id: 'Backlight / Siluet', name_en: 'Backlight / Silhouette' },
    { id: 'rim-light-muscles', name_id: 'Rim Light Menyorot Otot/Bentuk', name_en: 'Rim Light on Muscles/Shape' },
    { id: 'cinematic-flares', name_id: 'Efek "Lens Flare" Sinematik', name_en: 'Cinematic Lens Flares' },
    { id: 'high-contrast-bw', name_id: 'Hitam Putih Kontras Tinggi', name_en: 'High-Contrast Black & White' },
    { id: 'spotlight-on-athlete', name_id: 'Spotlight pada Atlet/Produk', name_en: 'Spotlight on Athlete/Product' },
    { id: 'gym-fluorescent', name_id: 'Lampu Neon Gym', name_en: 'Gym Fluorescent Lighting' },
    { id: 'natural-forest-light', name_id: 'Cahaya Alami Hutan', name_en: 'Natural Forest Light' },
    { id: 'split-lighting', name_id: 'Split Lighting', name_en: 'Split Lighting' },
    { id: 'soft-overcast', name_id: 'Cahaya Mendung yang Lembut', name_en: 'Soft Overcast Light' },
    { id: 'colored-gels-energetic', name_id: 'Gel Warna Enerjik', name_en: 'Energetic Colored Gels' },
    { id: 'underwater-lighting', name_id: 'Cahaya Bawah Air', name_en: 'Underwater Lighting' },
    { id: 'long-exposure-trails', name_id: 'Jejak Cahaya (Long Exposure)', name_en: 'Long Exposure Light Trails' },
    { id: 'reflective-surface', name_id: 'Cahaya dari Permukaan Reflektif', name_en: 'Light from Reflective Surfaces' },
];
export const SPORTS_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'lifestyle-athlete', name_id: 'Lifestyle dengan Atlet', name_en: 'Lifestyle with Athlete' },
    { id: 'splash-water-sweat', name_id: 'Aksi Percikan (Air/Keringat)', name_en: 'Splash Action (Water/Sweat)' },
    { id: 'clean-and-minimal', name_id: 'Bersih & Minimalis', name_en: 'Clean and Minimal' },
    { id: 'urban-sports-environment', name_id: 'Lingkungan Olahraga Urban', name_en: 'Urban Sports Environment' },
    { id: 'outdoor-adventure', name_id: 'Konteks Petualangan Outdoor', name_en: 'Outdoor Adventure Context' },
    { id: 'ready-to-go', name_id: 'Tertata Siap Berangkat', name_en: 'Ready-to-Go Layout' },
    { id: 'product-in-gym-bag', name_id: 'Produk di Dalam Tas Gym', name_en: 'Product in Gym Bag' },
    { id: 'levitation-shot', name_id: 'Produk Melayang (Levitasi)', name_en: 'Levitation Shot' },
    { id: 'chalk-dust-powder', name_id: 'Dengan Debu Kapur (Chalk)', name_en: 'With Chalk Dust/Powder' },
    { id: 'monochromatic-color', name_id: 'Tema Warna Monokromatik', name_en: 'Monochromatic Color Theme' },
    { id: 'futuristic-tech', name_id: 'Gaya Teknologi Futuristik', name_en: 'Futuristic Tech Style' },
    { id: 'vintage-retro-sport', name_id: 'Gaya Olahraga Retro/Vintage', name_en: 'Vintage/Retro Sport Style' },
    { id: 'pre-post-workout', name_id: 'Konteks Sebelum/Sesudah Latihan', name_en: 'Pre/Post-Workout Context' },
    { id: 'with-team-members', name_id: 'Dengan Anggota Tim', name_en: 'With Team Members' },
    { id: 'focused-on-details', name_id: 'Fokus pada Detail (Jahitan, dll)', name_en: 'Focused on Details (Stitching, etc.)' },
    { id: 'in-the-rain', name_id: 'Dalam Kondisi Hujan', name_en: 'In the Rain' },
    { id: 'yoga-meditation-zen', name_id: 'Suasana Zen Yoga/Meditasi', name_en: 'Zen Yoga/Meditation Vibe' },
    { id: 'high-fashion-sport', name_id: 'Gaya High-Fashion Sport', name_en: 'High-Fashion Sport Style' },
    { id: 'celebration-victory', name_id: 'Momen Kemenangan/Perayaan', name_en: 'Victory/Celebration Moment' },
];
export const SPORTS_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'gym-floor-blur', name_id: 'Lantai Gym (Blur)', name_en: 'Gym Floor (Blur)' },
    { id: 'running-track', name_id: 'Lintasan Lari', name_en: 'Running Track' },
    { id: 'concrete-wall-industrial', name_id: 'Dinding Beton Industrial', name_en: 'Industrial Concrete Wall' },
    { id: 'yoga-studio-wood-floor', name_id: 'Studio Yoga Lantai Kayu', name_en: 'Yoga Studio Wood Floor' },
    { id: 'mountain-trail', name_id: 'Jalur Pendakian Gunung', name_en: 'Mountain Trail' },
    { id: 'locker-room', name_id: 'Ruang Ganti Atlet', name_en: 'Locker Room' },
    { id: 'urban-basketball-court', name_id: 'Lapangan Basket Perkotaan', name_en: 'Urban Basketball Court' },
    { id: 'swimming-pool', name_id: 'Kolam Renang', name_en: 'Swimming Pool' },
    { id: 'stadium-lights', name_id: 'Lampu Stadion (Malam Hari)', name_en: 'Stadium Lights (Night)' },
    { id: 'minimalist-gradient', name_id: 'Latar Gradien Minimalis', name_en: 'Minimalist Gradient Background' },
    { id: 'textured-metal', name_id: 'Permukaan Logam Bertekstur', name_en: 'Textured Metal Surface' },
    { id: 'forest-path', name_id: 'Jalan Setapak di Hutan', name_en: 'Forest Path' },
    { id: 'rock-climbing-wall', name_id: 'Dinding Panjat Tebing', name_en: 'Rock Climbing Wall' },
    { id: 'beach-sand-volley', name_id: 'Pasir Pantai (Voli)', name_en: 'Beach Sand (Volleyball)' },
    { id: 'ski-slope', name_id: 'Lereng Gunung Salju', name_en: 'Ski Slope' },
    { id: 'abstract-lines-speed', name_id: 'Garis-garis Abstrak Kecepatan', name_en: 'Abstract Speed Lines' },
    { id: 'blueprint-tech-bg', name_id: 'Latar Teknologi Blueprint', name_en: 'Blueprint Tech Background' },
    { id: 'grass-field', name_id: 'Lapangan Rumput', name_en: 'Grass Field' },
    { id: 'city-park-path', name_id: 'Jalur Lari di Taman Kota', name_en: 'City Park Running Path' },
    { id: 'asphalt-road', name_id: 'Jalan Aspal', name_en: 'Asphalt Road' },
    OTHER_OPTION,
];

// === POTRET ===
export const PORTRAIT_ANGLES: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'eye-level', name_id: 'Setara Mata', name_en: 'Eye-Level' },
    { id: 'high-angle', name_id: 'Sudut Tinggi', name_en: 'High Angle' },
    { id: 'low-angle', name_id: 'Sudut Rendah', name_en: 'Low Angle' },
    { id: 'dutch-angle', name_id: 'Sudut Miring (Dutch Angle)', name_en: 'Dutch Angle' },
    { id: 'close-up', name_id: 'Close-up (Wajah)', name_en: 'Close-up (Face)' },
    { id: 'medium-shot', name_id: 'Setengah Badan (Medium Shot)', name_en: 'Medium Shot' },
    { id: 'full-body', name_id: 'Seluruh Badan (Full Body)', name_en: 'Full Body' },
    { id: 'over-the-shoulder', name_id: 'Dari Atas Bahu', name_en: 'Over the Shoulder' },
    { id: 'profile-shot', name_id: 'Tampak Samping (Profile)', name_en: 'Profile Shot' },
    { id: 'candid-shot', name_id: 'Candid (Tidak Sadar Kamera)', name_en: 'Candid Shot' },
    { id: 'environmental-portrait', name_id: 'Potret dengan Lingkungan', name_en: 'Environmental Portrait' },
    { id: 'rule-of-thirds', name_id: 'Komposisi Aturan Sepertiga', name_en: 'Rule of Thirds Composition' },
    { id: 'centered', name_id: 'Komposisi di Tengah', name_en: 'Centered Composition' },
    { id: 'leading-lines', name_id: 'Komposisi Garis Pemandu', name_en: 'Leading Lines Composition' },
    { id: 'framing', name_id: 'Komposisi dengan Bingkai', name_en: 'Framing Composition' },
    { id: 'reflection', name_id: 'Potret dengan Refleksi', name_en: 'Reflection Portrait' },
    { id: 'wide-angle', name_id: 'Lensa Lebar (Wide Angle)', name_en: 'Wide Angle' },
    { id: 'telephoto-compression', name_id: 'Lensa Tele (Kompresi Latar)', name_en: 'Telephoto Compression' },
    { id: 'abstract-angle', name_id: 'Sudut Abstrak', name_en: 'Abstract Angle' },
];
export const PORTRAIT_LIGHTING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'soft-natural-light', name_id: 'Cahaya Alami yang Lembut', name_en: 'Soft Natural Light' },
    { id: 'dramatic-cinematic', name_id: 'Sinematik & Dramatis', name_en: 'Cinematic & Dramatic' },
    { id: 'golden-hour', name_id: 'Cahaya Sore (Golden Hour)', name_en: 'Golden Hour' },
    { id: 'studio-lighting-clean', name_id: 'Pencahayaan Studio Profesional', name_en: 'Professional Studio Lighting' },
    { id: 'high-key', name_id: 'High-Key (Terang & Ceria)', name_en: 'High-Key (Bright & Airy)' },
    { id: 'low-key', name_id: 'Low-Key (Gelap & Misterius)', name_en: 'Low-Key (Dark & Mysterious)' },
    { id: 'black-and-white', name_id: 'Hitam Putih Kontras Tinggi', name_en: 'High-Contrast Black & White' },
    { id: 'rim-light', name_id: 'Cahaya Tepi (Rim Light)', name_en: 'Rim Light' },
    { id: 'split-light', name_id: 'Cahaya Terbelah (Split Light)', name_en: 'Split Light' },
    { id: 'rembrandt-light', name_id: 'Cahaya Rembrandt', name_en: 'Rembrandt Lighting' },
    { id: 'backlight-silhouette', name_id: 'Siluet (Cahaya dari Belakang)', name_en: 'Silhouette (Backlight)' },
    { id: 'window-light', name_id: 'Cahaya dari Jendela', name_en: 'Window Light' },
    { id: 'neon-lights', name_id: 'Lampu Neon Perkotaan', name_en: 'Urban Neon Lights' },
    { id: 'candlelight', name_id: 'Cahaya Lilin', name_en: 'Candlelight' },
    { id: 'color-gels', name_id: 'Gel Warna Artistik', name_en: 'Artistic Color Gels' },
    { id: 'dappled-light', name_id: 'Cahaya Rindang (Dappled)', name_en: 'Dappled Light' },
    { id: 'hard-sunlight', name_id: 'Cahaya Matahari Terik', name_en: 'Hard Sunlight' },
    { id: 'blue-hour', name_id: 'Cahaya "Blue Hour"', name_en: 'Blue Hour' },
    { id: 'fairy-lights', name_id: 'Lampu Hias (Fairy Lights)', name_en: 'Fairy Lights' },
];
export const PORTRAIT_STYLING: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'corporate-clean', name_id: 'Korporat & Bersih', name_en: 'Clean & Corporate' },
    { id: 'candid-lifestyle', name_id: 'Gaya Hidup (Candid)', name_en: 'Lifestyle (Candid)' },
    { id: 'vintage-film', name_id: 'Gaya Film Vintage', name_en: 'Vintage Film Look' },
    { id: 'high-fashion', name_id: 'Mode (High Fashion)', name_en: 'High Fashion' },
    { id: 'fantasy-surreal', name_id: 'Fantasi & Sureal', name_en: 'Fantasy & Surreal' },
    { id: 'family-portrait-warm', name_id: 'Potret Keluarga Hangat', name_en: 'Warm Family Portrait' },
    { id: 'couple-romantic', name_id: 'Potret Pasangan Romantis', name_en: 'Romantic Couple Portrait' },
    { id: 'musician-artist', name_id: 'Potret Musisi/Seniman', name_en: 'Musician/Artist Portrait' },
    { id: 'athlete-sport', name_id: 'Potret Atlet Olahraga', name_en: 'Sports Athlete Portrait' },
    { id: 'author-intellectual', name_id: 'Potret Penulis/Intelektual', name_en: 'Author/Intellectual Portrait' },
    { id: 'cosplay-character', name_id: 'Potret Karakter (Cosplay)', name_en: 'Character Portrait (Cosplay)' },
    { id: 'maternity', name_id: 'Potret Kehamilan (Maternity)', name_en: 'Maternity Portrait' },
    { id: 'graduation', name_id: 'Potret Wisuda', name_en: 'Graduation Portrait' },
    { id: 'street-style', name_id: 'Gaya Jalanan (Street Style)', name_en: 'Street Style' },
    { id: 'minimalist', name_id: 'Minimalis', name_en: 'Minimalist' },
    { id: 'bohemian', name_id: 'Gaya Bohemian', name_en: 'Bohemian Style' },
    { id: 'futuristic-cyberpunk', name_id: 'Futuristik / Cyberpunk', name_en: 'Futuristic / Cyberpunk' },
    { id: 'historical-period', name_id: 'Gaya Periode Sejarah', name_en: 'Historical Period Style' },
    { id: 'with-pet', name_id: 'Potret dengan Hewan Peliharaan', name_en: 'Portrait with Pet' },
];
export const PORTRAIT_BACKGROUNDS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'studio-gray-solid', name_id: 'Studio Abu-abu Polos', name_en: 'Solid Gray Studio' },
    { id: 'office-blur', name_id: 'Kantor Modern (Blur)', name_en: 'Blurred Modern Office' },
    { id: 'outdoor-park-nature', name_id: 'Taman atau Alam Terbuka', name_en: 'Outdoor Park or Nature' },
    { id: 'cityscape-urban', name_id: 'Pemandangan Kota (Urban)', name_en: 'Urban Cityscape' },
    { id: 'cozy-home-interior', name_id: 'Interior Rumah yang Nyaman', name_en: 'Cozy Home Interior' },
    { id: 'textured-wall', name_id: 'Dinding Bertekstur', name_en: 'Textured Wall' },
    { id: 'library-bookshelf', name_id: 'Perpustakaan/Rak Buku', name_en: 'Library/Bookshelf' },
    { id: 'beach-sunset', name_id: 'Pantai Saat Matahari Terbenam', name_en: 'Beach at Sunset' },
    { id: 'abstract-gradient', name_id: 'Gradien Abstrak', name_en: 'Abstract Gradient' },
    { id: 'historic-architecture', name_id: 'Arsitektur Bersejarah', name_en: 'Historic Architecture' },
    { id: 'industrial-loft', name_id: 'Loteng Industrial', name_en: 'Industrial Loft' },
    { id: 'art-gallery', name_id: 'Galeri Seni', name_en: 'Art Gallery' },
    { id: 'forest-woods', name_id: 'Hutan', name_en: 'Forest/Woods' },
    { id: 'coffee-shop', name_id: 'Kedai Kopi', name_en: 'Coffee Shop' },
    { id: 'neon-city-night', name_id: 'Kota Malam Penuh Neon', name_en: 'Neon City Night' },
    { id: 'rooftop', name_id: 'Atap Gedung', name_en: 'Rooftop' },
    { id: 'desert-landscape', name_id: 'Pemandangan Gurun', name_en: 'Desert Landscape' },
    { id: 'flower-field', name_id: 'Ladang Bunga', name_en: 'Flower Field' },
    { id: 'old-library', name_id: 'Perpustakaan Tua', name_en: 'Old Library' },
    OTHER_OPTION,
];

export const PORTRAIT_OUTFITS: StyleOption[] = [
    RANDOM_OPTION,
    { id: 'casual-everyday', name_id: 'Kasual Sehari-hari', name_en: 'Everyday Casual' },
    { id: 'smart-casual', name_id: 'Smart Casual (Kemeja & Chino)', name_en: 'Smart Casual (Shirt & Chinos)' },
    { id: 'business-formal', name_id: 'Formal Bisnis (Jas & Dasi)', name_en: 'Business Formal (Suit & Tie)' },
    { id: 'evening-gown', name_id: 'Gaun Malam Elegan', name_en: 'Elegant Evening Gown' },
    { id: 'cocktail-dress', name_id: 'Pakaian Pesta Koktail', name_en: 'Cocktail Party Attire' },
    { id: 'bohemian', name_id: 'Gaya Bohemian', name_en: 'Bohemian Style' },
    { id: 'streetwear', name_id: 'Streetwear Modern', name_en: 'Modern Streetwear' },
    { id: 'sportswear', name_id: 'Pakaian Olahraga (Athleisure)', name_en: 'Sportswear (Athleisure)' },
    { id: 'vintage-retro', name_id: 'Gaya Vintage/Retro', name_en: 'Vintage/Retro Style' },
    { id: 'traditional-wear', name_id: 'Pakaian Tradisional (Batik/Kebaya)', name_en: 'Traditional Wear (Batik/Kebaya)' },
    { id: 'professional-uniform', name_id: 'Seragam Profesional (Dokter/Pilot)', name_en: 'Professional Uniform (Doctor/Pilot)' },
    { id: 'leather-jacket-jeans', name_id: 'Jaket Kulit & Jeans', name_en: 'Leather Jacket & Jeans' },
    { id: 'cozy-sweater', name_id: 'Sweater Rajut Nyaman', name_en: 'Cozy Knit Sweater' },
    { id: 'summer-wear', name_id: 'Pakaian Musim Panas (Pantai)', name_en: 'Summer Wear (Beach)' },
    { id: 'winter-wear', name_id: 'Pakaian Musim Dingin (Mantel & Syal)', name_en: 'Winter Wear (Coat & Scarf)' },
    { id: 'academic-attire', name_id: 'Pakaian Akademik (Toga Wisuda)', name_en: 'Academic Attire (Graduation Gown)' },
    { id: 'fantasy-cosplay', name_id: 'Fantasi / Cosplay', name_en: 'Fantasy / Cosplay' },
    { id: 'futuristic-cyberpunk', name_id: 'Futuristik / Cyberpunk', name_en: 'Futuristic / Cyberpunk' },
    { id: 'luxury-pajamas', name_id: 'Piyama Sutra Mewah', name_en: 'Luxury Silk Pajamas' },
    { id: 'creative-artist', name_id: 'Gaya Seniman Kreatif', name_en: 'Creative Artist Style' },
];

export const ALL_PRODUCT_TYPES = [
    ...MARKETING_PRODUCT_TYPES,
    ...PORTRAIT_SUBJECT_TYPES,
];

type StyleCollection = {
    angles: StyleOption[];
    lighting: StyleOption[];
    styling: StyleOption[];
    backgrounds: StyleOption[];
    outfits: StyleOption[];
};

export const optionsByCategory: Record<Category, StyleCollection> = {
    food: { angles: FOOD_ANGLES, lighting: FOOD_LIGHTING, styling: FOOD_STYLING, backgrounds: FOOD_BACKGROUNDS, outfits: [] },
    beverage: { angles: BEVERAGE_ANGLES, lighting: BEVERAGE_LIGHTING, styling: BEVERAGE_STYLING, backgrounds: BEVERAGE_BACKGROUNDS, outfits: [] },
    beauty: { angles: BEAUTY_ANGLES, lighting: BEAUTY_LIGHTING, styling: BEAUTY_STYLING, backgrounds: BEAUTY_BACKGROUNDS, outfits: [] },
    fashion: { angles: FASHION_ACCESSORIES_ANGLES, lighting: FASHION_ACCESSORIES_LIGHTING, styling: FASHION_ACCESSORIES_STYLING, backgrounds: FASHION_ACCESSORIES_BACKGROUNDS, outfits: [] },
    cookware: { angles: COOKWARE_ANGLES, lighting: COOKWARE_LIGHTING, styling: COOKWARE_STYLING, backgrounds: COOKWARE_BACKGROUNDS, outfits: [] },
    sport: { angles: SPORTS_ANGLES, lighting: SPORTS_LIGHTING, styling: SPORTS_STYLING, backgrounds: SPORTS_BACKGROUNDS, outfits: [] },
    portrait: { angles: PORTRAIT_ANGLES, lighting: PORTRAIT_LIGHTING, styling: PORTRAIT_STYLING, backgrounds: PORTRAIT_BACKGROUNDS, outfits: PORTRAIT_OUTFITS },
};

// --- Poster Designer Options ---
export const POSTER_THEMES: StyleOption[] = [
    { id: 'minimalist-clean', name_id: 'Minimalis & Bersih', name_en: 'Minimalist & Clean' },
    { id: 'bold-modern', name_id: 'Modern & Berani', name_en: 'Bold & Modern' },
    { id: 'elegant-luxury', name_id: 'Elegan & Mewah', name_en: 'Elegant & Luxury' },
    { id: 'fun-playful', name_id: 'Ceria & Menyenangkan', name_en: 'Fun & Playful' },
    { id: 'rustic-natural', name_id: 'Rustic & Alami', name_en: 'Rustic & Natural' },
    { id: 'vintage-retro', name_id: 'Vintage & Retro', name_en: 'Vintage & Retro' },
    { id: 'tech-futuristic', name_id: 'Teknologi & Futuristik', name_en: 'Tech & Futuristic' },
    { id: 'art-deco', name_id: 'Art Deco Glamor', name_en: 'Art Deco Glamour' },
    { id: 'swiss-typography', name_id: 'Tipografi Swiss', name_en: 'Swiss Typography' },
    { id: 'grunge-distressed', name_id: 'Grunge & Urban', name_en: 'Grunge & Urban' },
    { id: 'hand-drawn-organic', name_id: 'Gambar Tangan & Organik', name_en: 'Hand-drawn & Organic' },
    { id: 'corporate-professional', name_id: 'Korporat & Profesional', name_en: 'Corporate & Professional' },
    { id: 'bohemian-earthy', name_id: 'Bohemian & Natural', name_en: 'Bohemian & Earthy' },
    { id: 'pop-art-comic', name_id: 'Pop Art & Komik', name_en: 'Pop Art & Comic' },
    { id: 'photographic-focus', name_id: 'Fokus pada Fotografi', name_en: 'Photographic Focus' },
    { id: 'abstract-geometric', name_id: 'Abstrak & Geometris', name_en: 'Abstract & Geometric' },
    { id: 'surreal-dreamy', name_id: 'Surealis & Seperti Mimpi', name_en: 'Surreal & Dreamy' },
    { id: 'eco-friendly-green', name_id: 'Ramah Lingkungan & Hijau', name_en: 'Eco-Friendly & Green' },
    { id: 'luxury-dark-mode', name_id: 'Mewah Mode Gelap', name_en: 'Luxury Dark Mode' },
    { id: 'collage-scrapbook', name_id: 'Kolase & Scrapbook', name_en: 'Collage & Scrapbook' },
];

export const COLOR_PALETTES: StyleOption[] = [
    { id: 'auto', name_id: 'Otomatis dari Gambar', name_en: 'Auto from Image' },
    { id: 'warm-tones', name_id: 'Nuansa Hangat (Merah, Oranye)', name_en: 'Warm Tones (Reds, Oranges)' },
    { id: 'cool-tones', name_id: 'Nuansa Dingin (Biru, Hijau)', name_en: 'Cool Tones (Blues, Greens)' },
    { id: 'monochromatic', name_id: 'Monokromatik', name_en: 'Monochromatic' },
    { id: 'high-contrast', name_id: 'Kontras Tinggi (Hitam & Putih)', name_en: 'High Contrast (Black & White)' },
    { id: 'pastel-dreams', name_id: 'Warna Pastel Lembut', name_en: 'Pastel Dreams' },
    { id: 'earthy-tones', name_id: 'Warna Bumi (Cokelat, Hijau Zaitun)', name_en: 'Earthy Tones (Browns, Olive)' },
    { id: 'neon-glow', name_id: 'Neon Terang', name_en: 'Neon Glow' },
    { id: 'sunset-gradient', name_id: 'Gradien Matahari Terbenam', name_en: 'Sunset Gradient' },
    { id: 'oceanic-blues', name_id: 'Biru Lautan', name_en: 'Oceanic Blues' },
    { id: 'black-gold-luxury', name_id: 'Hitam & Emas Mewah', name_en: 'Black & Gold Luxury' },
    { id: 'jewel-tones', name_id: 'Warna Permata (Ungu, Zamrud)', name_en: 'Jewel Tones (Purple, Emerald)' },
    { id: 'vibrant-primary', name_id: 'Warna Primer Cerah', name_en: 'Vibrant Primary Colors' },
    { id: 'muted-tones', name_id: 'Warna Redup & Kalem', name_en: 'Muted & Desaturated Tones' },
    { id: 'rose-gold-blush', name_id: 'Rose Gold & Merah Muda', name_en: 'Rose Gold & Blush' },
    { id: 'forest-greens', name_id: 'Hijau Hutan', name_en: 'Forest Greens' },
    { id: 'citrus-punch', name_id: 'Warna Jeruk (Kuning, Oranye)', name_en: 'Citrus Punch (Yellows, Oranges)' },
    { id: 'grayscale-red-accent', name_id: 'Skala Abu dengan Aksen Merah', name_en: 'Grayscale with Red Accent' },
    { id: 'iridescent-holographic', name_id: 'Iridisen & Holografik', name_en: 'Iridescent & Holographic' },
    { id: 'terracotta-desert', name_id: 'Terakota & Gurun', name_en: 'Terracotta & Desert' },
];

export const FONT_STYLES: StyleOption[] = [
    { id: 'sans-serif-modern', name_id: 'Modern Sans-Serif (Helvetica, Futura)', name_en: 'Modern Sans-Serif (Helvetica, Futura)' },
    { id: 'serif-elegant', name_id: 'Elegan Serif (Garamond, Bodoni)', name_en: 'Elegant Serif (Garamond, Bodoni)' },
    { id: 'display-bold', name_id: 'Display (Tebal & Unik)', name_en: 'Display (Bold & Unique)' },
    { id: 'script-handwritten', name_id: 'Tulisan Tangan (Script)', name_en: 'Script / Handwritten' },
    { id: 'slab-serif-strong', name_id: 'Slab Serif (Kuat & Tegas)', name_en: 'Slab Serif (Strong & Bold)' },
    { id: 'geometric-sans', name_id: 'Geometris Sans-Serif', name_en: 'Geometric Sans-Serif' },
    { id: 'classic-roman', name_id: 'Serif Romawi Klasik', name_en: 'Classic Roman Serif' },
    { id: 'brush-script', name_id: 'Kuas (Brush Script)', name_en: 'Brush Script' },
    { id: 'industrial-stencil', name_id: 'Stensil Industrial', name_en: 'Industrial Stencil' },
    { id: 'pixel-art-arcade', name_id: 'Pixel Art / Arcade', name_en: 'Pixel Art / Arcade' },
    { id: 'calligraphy-formal', name_id: 'Kaligrafi Formal', name_en: 'Formal Calligraphy' },
    { id: 'condensed-tall', name_id: 'Ramping & Tinggi (Condensed)', name_en: 'Condensed & Tall' },
    { id: 'vintage-typescript', name_id: 'Mesin Tik Vintage', name_en: 'Vintage Typescript' },
    { id: 'futuristic-tech', name_id: 'Futuristik & Teknologi', name_en: 'Futuristic & Tech' },
    { id: 'light-airy-sans', name_id: 'Sans-Serif Tipis & Ringan', name_en: 'Light & Airy Sans-Serif' },
    { id: 'blackletter-gothic', name_id: 'Blackletter / Gothic', name_en: 'Blackletter / Gothic' },
    { id: 'casual-marker', name_id: 'Spidol Kasual', name_en: 'Casual Marker' },
    { id: 'rounded-friendly', name_id: 'Sudut Tumpul & Ramah', name_en: 'Rounded & Friendly' },
    { id: 'outline-font', name_id: 'Gaya Garis Tepi (Outline)', name_en: 'Outline Style' },
    { id: 'woodcut-letterpress', name_id: 'Gaya Cetak Kayu (Woodcut)', name_en: 'Woodcut / Letterpress' },
];


export const SYSTEM_PROMPT_TEMPLATE = `Buatkan sebuah foto iklan profesional, realistis, dan berkualitas tinggi untuk produk {{product_description}}. Ambil produk utama dari gambar yang diunggah dan letakkan secara mulus ke dalam skenario baru. Komposisi: "{{angle_style}}". Pencahayaan: "{{lighting_style}}". Penataan: "{{styling_style}}". Latar belakang: "{{background_style}}". Instruksi tambahan: "{{extra_instructions}}". PENTING: Untuk setiap gambar yang dihasilkan, berikan sedikit variasi pada sudut kamera, komposisi, dan pencahayaan agar setiap hasil terasa unik seolah-olah diambil dari sesi foto yang sama. SANGAT PENTING: Pastikan produk yang ditampilkan SAMA PERSIS dengan produk dari foto asli. Jangan mengubah bentuk, warna, label, atau branding produk sama sekali. Pertahankan detail produk asli, namun tingkatkan kualitas foto secara keseluruhan menjadi terlihat seperti hasil jepretan fotografer iklan profesional. Pencahayaan harus menonjolkan produk dan sesuai dengan suasana. {{watermark_instruction}}. Hanya hasilkan gambar final, jangan tambahkan teks deskriptif apapun.
`;

export const PORTRAIT_SYSTEM_PROMPT_TEMPLATE = `Buatkan sebuah foto potret profesional, realistis, dan berkualitas tinggi untuk subjek {{subject_description}}. Ambil subjek utama dari gambar yang diunggah dan letakkan secara mulus ke dalam skenario baru. Kenakan subjek dengan pakaian bergaya: "{{outfit_style}}". Komposisi & Sudut: "{{angle_style}}". Pencahayaan & Suasana: "{{lighting_style}}". Gaya Potret: "{{styling_style}}". Latar belakang: "{{background_style}}". Instruksi tambahan: "{{extra_instructions}}". PENTING: Untuk setiap gambar yang dihasilkan, berikan sedikit variasi pada sudut kamera, komposisi, dan pencahayaan agar setiap hasil terasa unik seolah-olah diambil dari sesi foto yang sama. SANGAT PENTING: Pastikan subjek yang ditampilkan SAMA PERSIS dengan subjek dari foto asli. Jangan mengubah penampilan atau fitur wajah subjek sama sekali. Ganti HANYA pakaiannya sesuai dengan gaya yang diminta. Pertahankan detail subjek asli, namun tingkatkan kualitas foto secara keseluruhan menjadi terlihat seperti hasil jepretan fotografer profesional. Pencahayaan harus menonjolkan subjek dan sesuai dengan suasana. {{watermark_instruction}}. Hanya hasilkan gambar final, jangan tambahkan teks deskriptif apapun.
`;

export const PORTRAIT_WITH_STYLE_SYSTEM_PROMPT_TEMPLATE = `ANDA ADALAH SEORANG EDITOR FOTO AI. Tugas Anda adalah menggabungkan DUA gambar. Gambar PERTAMA berisi subjek utama. Gambar KEDUA berisi gaya, pakaian, atau suasana yang diinginkan.
Instruksi:
1.  Ambil subjek utama (orang) dari gambar PERTAMA.
2.  Terapkan gaya, pakaian, dan/atau suasana dari gambar KEDUA ke subjek tersebut. Jika ada instruksi gaya pakaian spesifik, prioritaskan instruksi tersebut.
3.  Letakkan subjek yang telah dimodifikasi ke dalam skenario baru yang sesuai dengan gaya dan pengaturan yang dipilih.
4.  SANGAT PENTING: Pertahankan fitur wajah dan identitas subjek dari gambar PERTAMA. JANGAN mengubah wajahnya.
5.  Hasil akhir harus berupa foto potret profesional, realistis, dan berkualitas tinggi.

Detail Skenario:
-   Deskripsi Subjek: {{subject_description}}.
-   Gaya Pakaian yang Diinginkan: "{{outfit_style}}".
-   Komposisi & Sudut: "{{angle_style}}".
-   Pencahayaan & Suasana: "{{lighting_style}}".
-   Gaya Potret: "{{styling_style}}".
-   Latar belakang: "{{background_style}}".
-   Instruksi tambahan: "{{extra_instructions}}".

Instruksi Tambahan:
-   PENTING: Untuk setiap gambar yang dihasilkan, berikan sedikit variasi pada sudut kamera, komposisi, dan pencahayaan agar setiap hasil terasa unik seolah-olah diambil dari sesi foto yang sama.
-   {{watermark_instruction}}.
-   Hanya hasilkan gambar final, jangan tambahkan teks deskriptif apapun.
`;

export const POSTER_SYSTEM_PROMPT_TEMPLATE = `ANDA ADALAH SEORANG DESAINER GRAFIS AI AHLI. Tugas Anda adalah membuat poster iklan yang menarik secara visual, profesional, dan efektif berdasarkan spesifikasi pengguna.

Instruksi Utama:
1.  Ambil produk utama ({{product_name}}) dari GAMBAR SUMBER yang diberikan dan integrasikan secara mulus ke dalam desain poster. JANGAN mengubah bentuk, warna, atau branding produk sama sekali.
2.  Buat tata letak (layout) yang seimbang, dinamis, dan menarik perhatian.
3.  Terapkan gaya visual dan elemen desain yang sesuai dengan tema yang diminta.
4.  Gunakan palet warna yang harmonis dan sesuai dengan tema.
5.  Pilih dan terapkan tipografi (gaya huruf) yang mudah dibaca dan cocok dengan gaya keseluruhan.
6.  Pastikan hasil akhir adalah gambar beresolusi tinggi, siap untuk dicetak atau digunakan dalam kampanye pemasaran digital.

Spesifikasi Desain dari Pengguna:
-   **Tema & Gaya Poster**: "{{theme}}"
-   **Palet Warna**: "{{color_palette}}"
-   **Gaya Huruf (Tipografi)**: "{{font_style}}"

Teks yang Harus Dicantumkan:
-   **Judul Utama (Headline)**: "{{headline}}"
-   **Teks Isi**: "{{body_text}}"
-   **Ajakan Bertindak (Call to Action)**: "{{cta}}"

**ATURAN TEKS KRITIS (SANGAT PENTING):**
1.  **AKURASI TEKS 100%**: Teks yang Anda tampilkan di poster HARUS SAMA PERSIS, karakter per karakter, dengan teks yang disediakan di atas. Jangan mengubah, menambah, atau mengurangi kata atau huruf apa pun.
2.  **TIDAK ADA TEKS TAMBAHAN**: JANGAN menambahkan teks, logo, atau watermark lain apa pun ke dalam poster selain dari yang telah ditentukan.
3.  **KETERBACAAN**: Pastikan semua teks mudah dibaca dan terintegrasi dengan baik ke dalam desain. Prioritaskan akurasi dan keterbacaan teks di atas segalanya.

PENTING: Untuk setiap poster yang dihasilkan, berikan sedikit variasi pada tata letak, komposisi, atau detail grafis agar setiap hasil terasa unik dan memberikan pilihan bagi pengguna. HANYA hasilkan gambar poster final, jangan tambahkan teks deskriptif atau penjelasan apa pun. Akurasi teks adalah prioritas tertinggi.
`;

export const POSTER_ASSISTANT_SYSTEM_PROMPT_TEMPLATE = `Anda adalah seorang AI direktur kreatif dan copywriter pemasaran yang ahli. Tugas Anda adalah membantu pengguna membuat desain poster yang menarik dan efektif.

**CRITICAL: Penjelasan Anda ("reasoning") HARUS dalam bahasa {{response_language}}.**

Konteks Poster Pengguna:
-   Nama Produk: "{{product_name}}"

Pilihan Gaya yang Tersedia:
-   Tema Desain: {{theme_options}}
-   Palet Warna: {{color_palette_options}}
-   Gaya Huruf: {{font_style_options}}

Berdasarkan permintaan pengguna: "{{user_query}}", berikan rekomendasi desain dan teks poster.
Pertama, berikan penjelasan singkat dan ramah tentang visi kreatif Anda dalam bahasa {{response_language}}.
Kemudian, berikan rekomendasi spesifik Anda. Rekomendasi untuk 'theme', 'colorPalette', dan 'fontStyle' HARUS dipilih dari nama Bahasa Inggris (English name) pada daftar pilihan yang tersedia.

Rekomendasi Desain:
1.  **theme**: Nama gaya tema dari daftar.
2.  **colorPalette**: Nama palet warna dari daftar.
3.  **fontStyle**: Nama gaya huruf dari daftar.

Rekomendasi Teks:
1.  **headline**: Judul utama yang menarik perhatian.
2.  **bodyText**: Teks isi singkat yang informatif (bisa dikosongkan).
3.  **cta**: Ajakan bertindak yang jelas dan kuat.

Pastikan rekomendasi Anda kohesif dan sesuai dengan produk serta permintaan pengguna. Jawab dengan format JSON.`;

export const POSTER_INITIAL_TEXT_SYSTEM_PROMPT_TEMPLATE = `Anda adalah seorang AI copywriter pemasaran yang ahli. Tugas Anda adalah membuat teks iklan yang menarik dan efektif untuk sebuah poster, berdasarkan nama produk.

**CRITICAL: Respon HARUS dalam bahasa {{response_language}}.**

Nama Produk: "{{product_name}}"

Buatlah teks yang singkat, profesional, dan persuasif.
-   **headline**: Judul utama yang menarik perhatian.
-   **bodyText**: Teks isi singkat yang informatif (opsional, bisa dikosongkan jika tidak perlu).
-   **cta**: Ajakan bertindak yang jelas dan kuat.

Jawab HANYA dengan format JSON.`;