import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    name: 'Radiance Renewal Serum',
    slug: 'lumiere-radiance-serum',
    subtitle: '30ml · Vitamin C & Bakuchiol',
    description:
      'A high-performance brightening serum powered by stabilised Vitamin C and plant-derived Bakuchiol.',
    shortDescription:
      'Brightening serum with Vitamin C & Bakuchiol for radiant skin.',
    category: 'serums',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
        alt: 'Radiance Renewal Serum',
        isPrimary: true,
      },
    ],
    price: 89,
    comparePrice: 110,
    stock: 150,
    volume: '30ml',
    badge: 'bestseller',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    numReviews: 312,
    sku: 'LUM-SERUM-001',
  },

  {
    name: 'Hydra-Plump Moisturiser',
    slug: 'lumiere-hydra-cream',
    subtitle: '50ml · Hyaluronic & Ceramide',
    description:
      'Deep hydration moisturiser with multi-weight Hyaluronic Acid.',
    shortDescription:
      'Hydration moisturiser with Hyaluronic Acid and Ceramides.',
    category: 'moisturizers',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
        alt: 'Hydra-Plump Moisturiser',
        isPrimary: true,
      },
    ],
    price: 74,
    stock: 200,
    volume: '50ml',
    badge: 'new',
    isFeatured: true,
    isNewProduct: true,
    rating: 4.8,
    numReviews: 198,
    sku: 'LUM-MOIST-001',
  },

  {
    name: 'Botanical Face Oil',
    slug: 'lumiere-botanical-oil',
    subtitle: '30ml · Rosehip & Sea Buckthorn',
    description:
      'Luxurious dry oil blend with Rosehip and Sea Buckthorn.',
    shortDescription:
      'Nourishing face oil with Rosehip and Marula.',
    category: 'serums',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
        alt: 'Botanical Face Oil',
        isPrimary: true,
      },
    ],
    price: 112,
    stock: 120,
    volume: '30ml',
    isFeatured: true,
    rating: 4.7,
    numReviews: 156,
    sku: 'LUM-OIL-001',
  },

  {
    name: 'Revival Eye Complex',
    slug: 'lumiere-eye-complex',
    subtitle: '15ml · Caffeine & Peptide',
    description:
      'Eye treatment for puffiness, dark circles, and fine lines.',
    shortDescription:
      'Eye cream with Caffeine and Peptides.',
    category: 'eye-care',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80',
        alt: 'Revival Eye Complex',
        isPrimary: true,
      },
    ],
    price: 98,
    comparePrice: 120,
    stock: 90,
    volume: '15ml',
    badge: 'sale',
    isFeatured: true,
    rating: 4.9,
    numReviews: 87,
    sku: 'LUM-EYE-001',
  },

  {
    name: 'Gentle Botanical Cleanser',
    slug: 'lumiere-gentle-cleanser',
    subtitle: '150ml · Aloe & Green Tea',
    description:
      'pH-balanced cleanser that removes impurities gently.',
    shortDescription:
      'Gentle cleanser with Aloe Vera and Green Tea.',
    category: 'cleansers',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&q=80',
        alt: 'Gentle Botanical Cleanser',
        isPrimary: true,
      },
    ],
    price: 48,
    stock: 250,
    volume: '150ml',
    rating: 4.6,
    numReviews: 203,
    sku: 'LUM-CLEAN-001',
  },
];

/* =========================================================
   SEED FUNCTION
========================================================= */

async function seed() {
  try {
    if (!MONGO_URI) {
      throw new Error(
        'MONGO_URI not found in environment variables.'
      );
    }

    console.log('🔗 Connecting to MongoDB...');

    await mongoose.connect(MONGO_URI);

    console.log('✅ Connected');

    console.log('🗑️ Clearing existing products...');

    await Product.deleteMany({});

    console.log('🌱 Seeding products...');

    const inserted = await Product.insertMany(products);

    console.log(
      `✅ Seeded ${inserted.length} products successfully!\n`
    );

    inserted.forEach((p) => {
      console.log(`• ${p.name} → /${p.slug}`);
    });

    console.log('\n🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();