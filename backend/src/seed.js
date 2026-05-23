import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

/* =========================================================
   COMPLETE PRODUCTS - ALL 34 FROM FRONTEND
========================================================= */

const products = [
  // SERUMS
  {
    name: 'Radiance Serum',
    slug: 'radiance-serum',
    subtitle: 'Vitamin C & Niacinamide',
    description: 'A powerful brightening serum with Vitamin C and Niacinamide to even skin tone and boost radiance.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80',
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
    description: 'Advanced night serum with 0.5% retinol and peptides for anti-aging and skin renewal.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a8b5f1?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4a8b5f1?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'Luxurious serum infused with 24K gold and hyaluronic acid for ultimate hydration and glow.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80'],
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
    description: 'Pure cold-pressed rosehip oil for skin regeneration and evening out skin tone.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80'],
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
    description: 'Brightening serum with niacinamide and AHA complex for glowing skin.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'],
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
    description: 'Gentle retinol alternative with bakuchiol and peptides for overnight skin renewal.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80'],
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
    description: 'Restorative serum with ceramides and centella to repair and strengthen skin barrier.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80'],
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
    description: 'High-potency vitamin C serum with 20% stabilised ascorbic acid for maximum brightness.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'],
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
    description: 'Advanced brightening formula with vitamin C and ferulic acid for enhanced antioxidant protection.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80'],
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
    description: 'Illuminating drops with botanical extracts for instant radiance and glow.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80'],
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
    description: 'Triple-action anti-aging serum with retinol, vitamin C, and hyaluronic acid.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'],
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
    description: 'Natural botanical serum for luminous, even-toned skin.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80'],
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
    description: 'Fresh citrus-infused vitamin C serum for brightening and energizing skin.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'],
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
    description: 'Luxurious hydrating cream with rose extract and ceramide complex for soft, supple skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=1200&q=80'],
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
    description: '99% pure aloe vera gel for soothing, hydrating, and calming irritated skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80'],
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
    description: 'Anti-aging moisturizer with marine collagen and peptides to firm and plump skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80'],
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
    description: 'Illuminating face cream with brightening actives for a healthy, radiant glow.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80'],
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
    description: 'Intensive hydration cream with ceramides and squalane for dry, dehydrated skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80'],
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
    description: 'Calming moisturizer with oat and chamomile for sensitive, irritated skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80'],
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
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80'],
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
    description: 'Luxurious cream with pearl extract and marine collagen for youthful, plump skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80'],
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
    description: 'Deep-cleansing clay mask with kaolin and green tea to purify pores and detoxify skin.',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'Detoxifying black mask with activated charcoal and clay to draw out impurities.',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80'],
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
    description: 'Illuminating mask with vitamin C and turmeric for brighter, more even skin tone.',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80'],
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
    description: 'Gentle pink clay mask with rose petals to refine and soften skin.',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80'],
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
    description: 'Antioxidant-rich matcha mask with green tea to detoxify and energize skin.',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80'],
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
    description: 'Luxurious cleansing balm with chamomile and jojoba oil for gentle makeup removal.',
    category: 'cleansers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'pH-balanced foam cleanser for daily cleansing without stripping skin.',
    category: 'cleansers',
    image: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&q=80'],
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
    description: 'Hydrating facial mist with three molecular weights of hyaluronic acid for deep moisture.',
    category: 'toners',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'Balancing toner with AHA and witch hazel to refine pores and brighten skin.',
    category: 'toners',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'],
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
    description: 'Lifting eye cream with caffeine and peptides to reduce puffiness and dark circles.',
    category: 'eyes',
    image: 'https://images.unsplash.com/photo-1590440165072-f5a8b5bfb399?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1590440165072-f5a8b5bfb399?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'Advanced eye treatment with retinol and vitamin K for dark circles and fine lines.',
    category: 'eyes',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80'],
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
    description: 'Lightweight invisible mineral sunscreen with SPF 50 for daily protection.',
    category: 'suncare',
    image: 'https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?auto=format&fit=crop&w=1200&q=80'],
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
    description: 'Convenient spray sunscreen with SPF 50 mineral protection for on-the-go application.',
    category: 'suncare',
    image: 'https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?w=600&q=80'],
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

    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});

    console.log('🌱 Seeding 34 products...');
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

    console.log('🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();