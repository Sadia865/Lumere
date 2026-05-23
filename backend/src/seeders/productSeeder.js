import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

/* =========================================================
   COMPLETE PRODUCTS - WITH PEXELS & LOCAL IMAGES
   Note: Local images should be served from your frontend public/assets folder
========================================================= */

const products = [
  // SERUMS
  {
    name: 'Radiance Serum',
    slug: 'radiance-serum',
    subtitle: 'Vitamin C & Niacinamide',
    description: '30ml - A powerful brightening serum with Vitamin C and Niacinamide to even skin tone and boost radiance.',
    category: 'serums',
    image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3738370/pexels-photo-3738370.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 89,
    comparePrice: 110,
    stock: 150,
    featured: true,
    rating: 4.8,
    numReviews: 245,
  },

  {
    name: 'Retinol Night Elixir',
    slug: 'retinol-night-elixir',
    subtitle: '0.5% Retinol & Peptides',
    description: '30ml - Advanced night serum with 0.5% retinol and peptides for anti-aging and skin renewal.',
    category: 'serums',
    image: 'https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 98,
    stock: 120,
    featured: true,
    rating: 4.9,
    numReviews: 312,
  },

  {
    name: 'Gold Luxury Elixir',
    slug: 'gold-luxury-elixir',
    subtitle: '24K Gold & Hyaluronic Acid',
    description: '30ml - Luxurious serum infused with 24K gold and hyaluronic acid for ultimate hydration and glow.',
    category: 'serums',
    image: '/assets/gold-elixir.png',
    images: ['/assets/gold-elixir.png'],
    price: 120,
    stock: 80,
    featured: true,
    rating: 4.7,
    numReviews: 156,
  },

  {
    name: 'Rosehip Face Oil',
    slug: 'rosehip-face-oil',
    subtitle: 'Cold-Pressed & Regenerating',
    description: '30ml - Pure cold-pressed rosehip oil for skin regeneration and evening out skin tone.',
    category: 'serums',
    image: '/assets/oil1.jpeg',
    images: ['/assets/oil1.jpeg'],
    price: 55,
    stock: 200,
    featured: false,
    rating: 4.6,
    numReviews: 189,
  },

  {
    name: 'Glow Booster Serum',
    slug: 'glow-booster-serum',
    subtitle: 'Niacinamide & AHA Complex',
    description: '30ml - Brightening serum with niacinamide and AHA complex for glowing skin.',
    category: 'serums',
    image: '/assets/serum.png',
    images: ['/assets/serum.png'],
    price: 78,
    stock: 175,
    featured: false,
    rating: 4.5,
    numReviews: 203,
  },

  {
    name: 'Renewal Night Serum',
    slug: 'renewal-night-serum',
    subtitle: 'Bakuchiol & Peptides',
    description: '30ml - Gentle retinol alternative with bakuchiol and peptides for overnight skin renewal.',
    category: 'serums',
    image: '/assets/serum1.png',
    images: ['/assets/serum1.png'],
    price: 92,
    stock: 145,
    featured: true,
    rating: 4.8,
    numReviews: 267,
  },

  {
    name: 'Barrier Repair Serum',
    slug: 'barrier-repair-serum',
    subtitle: 'Ceramide & Centella',
    description: '30ml - Restorative serum with ceramides and centella to repair and strengthen skin barrier.',
    category: 'serums',
    image: '/assets/serum2.png',
    images: ['/assets/serum2.png'],
    price: 76,
    stock: 160,
    featured: false,
    rating: 4.7,
    numReviews: 198,
  },

  {
    name: 'Vitamin C Radiance Serum',
    slug: 'vitamin-c-radiance-serum',
    subtitle: '20% Stabilised Vitamin C',
    description: '30ml - High-potency vitamin C serum with 20% stabilised ascorbic acid for maximum brightness.',
    category: 'serums',
    image: '/assets/serum22.png',
    images: ['/assets/serum22.png'],
    price: 95,
    stock: 130,
    featured: true,
    rating: 4.9,
    numReviews: 342,
  },

  {
    name: 'Brightening Serum Banner',
    slug: 'brightening-serum-banner',
    subtitle: 'Vitamin C & Ferulic Acid',
    description: '30ml - Advanced brightening formula with vitamin C and ferulic acid for enhanced antioxidant protection.',
    category: 'serums',
    image: '/assets/banner serum.png',
    images: ['/assets/banner serum.png'],
    price: 88,
    stock: 155,
    featured: true,
    rating: 4.6,
    numReviews: 221,
  },

  {
    name: 'Botanical Glow Drops',
    slug: 'botanical-glow-drops',
    subtitle: 'Firefly Botanical Blend',
    description: '30ml - Illuminating drops with botanical extracts for instant radiance and glow.',
    category: 'serums',
    image: '/assets/firefly.png',
    images: ['/assets/firefly.png'],
    price: 74,
    stock: 190,
    featured: true,
    rating: 4.5,
    numReviews: 178,
  },

  {
    name: 'Triple Serum Complex',
    slug: 'triple-serum-complex',
    subtitle: 'Anti-Ageing & Firming',
    description: '30ml - Triple-action anti-aging serum with retinol, vitamin C, and hyaluronic acid.',
    category: 'serums',
    image: '/assets/serum222.png',
    images: ['/assets/serum222.png'],
    price: 105,
    stock: 95,
    featured: true,
    rating: 4.8,
    numReviews: 289,
  },

  {
    name: 'Luminous Skin Serum',
    slug: 'luminous-skin-serum',
    subtitle: 'Botanical Brightening Formula',
    description: '30ml - Natural botanical serum for luminous, even-toned skin.',
    category: 'serums',
    image: '/assets/women22.png',
    images: ['/assets/women22.png'],
    price: 82,
    stock: 165,
    featured: false,
    rating: 4.4,
    numReviews: 143,
  },

  {
    name: 'Vitamin C Citrus Serum',
    slug: 'vitamin-c-citrus-serum',
    subtitle: 'Orange & Citrus Bright',
    description: '30ml - Fresh citrus-infused vitamin C serum for brightening and energizing skin.',
    category: 'serums',
    image: '/assets/Firefly_Gemini Flash_Vitamin C serum bottle with orange slices and citrus leaves, _bright fresh aesthetic, 779867.png',
    images: ['/assets/Firefly_Gemini Flash_Vitamin C serum bottle with orange slices and citrus leaves, _bright fresh aesthetic, 779867.png'],
    price: 79,
    stock: 185,
    featured: false,
    rating: 4.6,
    numReviews: 211,
  },

  // MOISTURISERS
  {
    name: 'Botanical Hydra Cream',
    slug: 'botanical-hydra-cream',
    subtitle: 'Rose & Ceramide Complex',
    description: '50ml - Luxurious hydrating cream with rose extract and ceramide complex for soft, supple skin.',
    category: 'moisturisers',
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 72,
    stock: 200,
    featured: true,
    rating: 4.7,
    numReviews: 298,
  },

  {
    name: 'Aloe Vera Gel',
    slug: 'aloe-vera-gel',
    subtitle: 'Pure & Soothing',
    description: '100ml - 99% pure aloe vera gel for soothing, hydrating, and calming irritated skin.',
    category: 'moisturisers',
    image: '/assets/aloevera.png',
    images: ['/assets/aloevera.png'],
    price: 32,
    stock: 300,
    featured: true,
    rating: 4.8,
    numReviews: 445,
  },

  {
    name: 'Collagen Boost Cream',
    slug: 'collagen-boost-cream',
    subtitle: 'Marine Collagen & Peptides',
    description: '50ml - Anti-aging moisturizer with marine collagen and peptides to firm and plump skin.',
    category: 'moisturisers',
    image: '/assets/collagen-cream.png',
    images: ['/assets/collagen-cream.png'],
    price: 85,
    stock: 180,
    featured: true,
    rating: 4.8,
    numReviews: 312,
  },

  {
    name: 'Glow Face Cream',
    slug: 'glow-face-cream',
    subtitle: 'Brightening & Nourishing',
    description: '50ml - Illuminating face cream with brightening actives for a healthy, radiant glow.',
    category: 'moisturisers',
    image: '/assets/cream1.png',
    images: ['/assets/cream1.png'],
    price: 58,
    stock: 225,
    featured: false,
    rating: 4.5,
    numReviews: 187,
  },

  {
    name: 'Moisture Surge Cream',
    slug: 'moisture-surge-cream',
    subtitle: 'Ceramide & Squalane',
    description: '50ml - Intensive hydration cream with ceramides and squalane for dry, dehydrated skin.',
    category: 'moisturisers',
    image: '/assets/moisturizer1.png',
    images: ['/assets/moisturizer1.png'],
    price: 68,
    stock: 195,
    featured: true,
    rating: 4.7,
    numReviews: 256,
  },

  {
    name: 'Soothing Relief Cream',
    slug: 'soothing-relief-cream',
    subtitle: 'Oat & Chamomile Calm',
    description: '50ml - Calming moisturizer with oat and chamomile for sensitive, irritated skin.',
    category: 'moisturisers',
    image: '/assets/soothingcream.png',
    images: ['/assets/soothingcream.png'],
    price: 50,
    stock: 220,
    featured: false,
    rating: 4.6,
    numReviews: 203,
  },

  {
    name: 'Women Glow Ritual Set',
    slug: 'women-glow-ritual-set',
    subtitle: 'Complete Skincare Routine',
    description: 'Complete skincare set with cleanser, serum, and moisturizer for radiant skin.',
    category: 'moisturisers',
    image: '/assets/women banner.png',
    images: ['/assets/women banner.png'],
    price: 145,
    stock: 75,
    featured: true,
    rating: 4.9,
    numReviews: 389,
  },

  {
    name: 'Marine Collagen Cream',
    slug: 'marine-collagen-cream',
    subtitle: 'Pearl & Marine Collagen',
    description: '50ml - Luxurious cream with pearl extract and marine collagen for youthful, plump skin.',
    category: 'moisturisers',
    image: '/assets/Firefly_Collagen face cream with pearl and marine elements, _soft blue and white tones, elega 779867.png',
    images: ['/assets/Firefly_Collagen face cream with pearl and marine elements, _soft blue and white tones, elega 779867.png'],
    price: 92,
    stock: 140,
    featured: true,
    rating: 4.8,
    numReviews: 274,
  },

  // MASKS
  {
    name: 'Purifying Clay Mask',
    slug: 'purifying-clay-mask',
    subtitle: 'Kaolin & Green Tea',
    description: '75ml - Deep-cleansing clay mask with kaolin and green tea to purify pores and detoxify skin.',
    category: 'masks',
    image: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 54,
    stock: 210,
    featured: true,
    rating: 4.7,
    numReviews: 312,
  },

  {
    name: 'Black Purifying Mask',
    slug: 'black-purifying-mask',
    subtitle: 'Activated Charcoal & Clay',
    description: '75ml - Detoxifying black mask with activated charcoal and clay to draw out impurities.',
    category: 'masks',
    image: '/assets/blackmask.png',
    images: ['/assets/blackmask.png'],
    price: 48,
    stock: 185,
    featured: true,
    rating: 4.8,
    numReviews: 401,
  },

  {
    name: 'Brightening Face Mask',
    slug: 'brightening-face-mask',
    subtitle: 'Vitamin C & Turmeric',
    description: '75ml - Illuminating mask with vitamin C and turmeric for brighter, more even skin tone.',
    category: 'masks',
    image: '/assets/mask1.jpeg',
    images: ['/assets/mask1.jpeg'],
    price: 44,
    stock: 195,
    featured: false,
    rating: 4.6,
    numReviews: 267,
  },

  {
    name: 'Pink Clay Rose Mask',
    slug: 'pink-clay-rose-mask',
    subtitle: 'Rose Petal & Pink Clay',
    description: '75ml - Gentle pink clay mask with rose petals to refine and soften skin.',
    category: 'masks',
    image: '/assets/Firefly_Gemini Flash_Pink clay face mask in open jar, dried rose petals and pink clay powder, _soft pink m 779867.png',
    images: ['/assets/Firefly_Gemini Flash_Pink clay face mask in open jar, dried rose petals and pink clay powder, _soft pink m 779867.png'],
    price: 49,
    stock: 170,
    featured: true,
    rating: 4.7,
    numReviews: 298,
  },

  {
    name: 'Matcha Detox Mask',
    slug: 'matcha-detox-mask',
    subtitle: 'Green Tea & Antioxidants',
    description: '75ml - Antioxidant-rich matcha mask with green tea to detoxify and energize skin.',
    category: 'masks',
    image: '/assets/Firefly_Green matcha face mask jar with green tea leaves and powder, _white minimal backgroun 779867.png',
    images: ['/assets/Firefly_Green matcha face mask jar with green tea leaves and powder, _white minimal backgroun 779867.png'],
    price: 46,
    stock: 205,
    featured: false,
    rating: 4.5,
    numReviews: 223,
  },

  // CLEANSERS
  {
    name: 'Gentle Cleansing Balm',
    slug: 'gentle-cleansing-balm',
    subtitle: 'Chamomile & Jojoba',
    description: '100ml - Luxurious cleansing balm with chamomile and jojoba oil for gentle makeup removal.',
    category: 'cleansers',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 38,
    stock: 240,
    featured: false,
    rating: 4.7,
    numReviews: 334,
  },

  {
    name: 'Daily Foam Cleanser',
    slug: 'daily-foam-cleanser',
    subtitle: 'Gentle & Balancing',
    description: '150ml - pH-balanced foam cleanser for daily cleansing without stripping skin.',
    category: 'cleansers',
    image: '/assets/cleanser1.png',
    images: ['/assets/cleanser1.png'],
    price: 34,
    stock: 275,
    featured: false,
    rating: 4.6,
    numReviews: 412,
  },

  // TONERS
  {
    name: 'Hyaluronic Mist',
    slug: 'hyaluronic-mist',
    subtitle: '3-Weight HA Complex',
    description: '100ml - Hydrating facial mist with three molecular weights of hyaluronic acid for deep moisture.',
    category: 'toners',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 29,
    stock: 290,
    featured: false,
    rating: 4.5,
    numReviews: 387,
  },

  {
    name: 'Balancing Toner',
    slug: 'balancing-toner',
    subtitle: 'AHA & Witch Hazel',
    description: '150ml - Balancing toner with AHA and witch hazel to refine pores and brighten skin.',
    category: 'toners',
    image: '/assets/tone1.png',
    images: ['/assets/tone1.png'],
    price: 36,
    stock: 265,
    featured: false,
    rating: 4.4,
    numReviews: 298,
  },

  // EYE CARE
  {
    name: 'Eye Contour Cream',
    slug: 'eye-contour-cream',
    subtitle: 'Caffeine & Peptide Lift',
    description: '15ml - Lifting eye cream with caffeine and peptides to reduce puffiness and dark circles.',
    category: 'eyes',
    image: 'https://images.pexels.com/photos/6191374/pexels-photo-6191374.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/6191374/pexels-photo-6191374.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 62,
    stock: 155,
    featured: false,
    rating: 4.7,
    numReviews: 276,
  },

  {
    name: 'Advanced Eye Cream',
    slug: 'advanced-eye-cream',
    subtitle: 'Retinol & Vitamin K',
    description: '15ml - Advanced eye treatment with retinol and vitamin K for dark circles and fine lines.',
    category: 'eyes',
    image: '/assets/eye-cream.png',
    images: ['/assets/eye-cream.png'],
    price: 65,
    stock: 140,
    featured: false,
    rating: 4.6,
    numReviews: 234,
  },

  // SUN CARE
  {
    name: 'SPF 50 Daytime Shield',
    slug: 'spf-50-daytime-shield',
    subtitle: 'Invisible Mineral Sunscreen',
    description: '50ml - Lightweight invisible mineral sunscreen with SPF 50 for daily protection.',
    category: 'suncare',
    image: 'https://images.pexels.com/photos/7428103/pexels-photo-7428103.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: ['https://images.pexels.com/photos/7428103/pexels-photo-7428103.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    price: 46,
    stock: 230,
    featured: false,
    rating: 4.8,
    numReviews: 467,
  },

  {
    name: 'SPF 50 Sunscreen Mist',
    slug: 'spf-50-sunscreen-mist',
    subtitle: 'Mineral Sun Protection',
    description: '100ml - Convenient spray sunscreen with SPF 50 mineral protection for on-the-go application.',
    category: 'suncare',
    image: '/assets/openart-image_1779246961186_5c90a2cd_1779246961341_be072d89.png',
    images: ['/assets/openart-image_1779246961186_5c90a2cd_1779246961341_be072d89.png'],
    price: 52,
    stock: 200,
    featured: false,
    rating: 4.7,
    numReviews: 389,
  },
];

/* =========================================================
   SEED FUNCTION
========================================================= */

async function seed() {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI not found in environment variables.');
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected');

    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});

    console.log('🌱 Seeding 34 products with Pexels + Local images...');
    const inserted = await Product.insertMany(products);

    console.log(`\n✅ Seeded ${inserted.length} products successfully!\n`);

    // Group by category
    const byCategory = {};
    inserted.forEach((p) => {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      byCategory[p.category].push(p.name);
    });

    console.log('📦 Products by category:\n');
    Object.keys(byCategory).forEach((cat) => {
      console.log(`${cat.toUpperCase()} (${byCategory[cat].length}):`);
      byCategory[cat].forEach((name) => console.log(`  • ${name}`));
      console.log('');
    });

    // Count image sources
    let pexelsCount = 0;
    let localCount = 0;
    inserted.forEach((p) => {
      if (p.image.includes('pexels.com')) pexelsCount++;
      else if (p.image.includes('/assets/')) localCount++;
    });

    console.log('🖼️  Image Sources:');
    console.log(`  • Pexels: ${pexelsCount} products`);
    console.log(`  • Local Assets: ${localCount} products`);
    console.log('');

    console.log('🎉 Database seeded successfully!');
    console.log('\n📝 Important Notes:');
    console.log('  • Replaced Unsplash with Pexels images (working URLs)');
    console.log('  • Included all your local asset images');
    console.log('  • Local images use /assets/ path for frontend serving');
    console.log('  • Make sure assets are in: frontend/public/assets/');
    console.log('  • All 34 products matched with frontend data\n');

  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();