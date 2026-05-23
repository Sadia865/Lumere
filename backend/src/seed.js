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
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38e50?w=600&q=80',
    ],
    price: 89,
    comparePrice: 110,
    stock: 150,
    featured: true,
    rating: 4.9,
    numReviews: 312,
  },

  {
    name: 'Hydra-Plump Moisturiser',
    slug: 'lumiere-hydra-cream',
    subtitle: '50ml · Hyaluronic & Ceramide',
    description:
      'Deep hydration moisturiser with multi-weight Hyaluronic Acid and Ceramides for plump, healthy skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    ],
    price: 74,
    stock: 200,
    featured: true,
    rating: 4.8,
    numReviews: 198,
  },

  {
    name: 'Botanical Face Oil',
    slug: 'lumiere-botanical-oil',
    subtitle: '30ml · Rosehip & Sea Buckthorn',
    description:
      'Luxurious dry oil blend with Rosehip and Sea Buckthorn for nourished, glowing skin.',
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    ],
    price: 112,
    stock: 120,
    featured: true,
    rating: 4.7,
    numReviews: 156,
  },

  {
    name: 'Revival Eye Complex',
    slug: 'lumiere-eye-complex',
    subtitle: '15ml · Caffeine & Peptide',
    description:
      'Eye treatment for puffiness, dark circles, and fine lines with Caffeine and Peptides.',
    category: 'eyes',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&q=80',
    ],
    price: 98,
    comparePrice: 120,
    stock: 90,
    featured: true,
    rating: 4.9,
    numReviews: 87,
  },

  {
    name: 'Gentle Botanical Cleanser',
    slug: 'lumiere-gentle-cleanser',
    subtitle: '150ml · Aloe & Green Tea',
    description:
      'pH-balanced cleanser that removes impurities gently with Aloe Vera and Green Tea.',
    category: 'cleansers',
    image: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&q=80',
    ],
    price: 48,
    stock: 250,
    rating: 4.6,
    numReviews: 203,
  },

  // Additional Moisturiser Products
  {
    name: 'Collagen Boost Cream',
    slug: 'collagen-boost-cream',
    subtitle: '50ml · Marine Collagen & Peptides',
    description:
      'Anti-aging moisturiser with Marine Collagen and Peptides to firm and plump skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80',
    ],
    price: 85,
    stock: 180,
    featured: true,
    rating: 4.8,
    numReviews: 145,
  },

  {
    name: 'Soothing Relief Cream',
    slug: 'soothing-relief-cream',
    subtitle: '50ml · Oat & Chamomile',
    description:
      'Calming moisturiser with Oat and Chamomile for sensitive, irritated skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    ],
    price: 68,
    stock: 220,
    featured: false,
    rating: 4.7,
    numReviews: 132,
  },

  {
    name: 'Moisture Surge Cream',
    slug: 'moisture-surge-cream',
    subtitle: '50ml · Ceramide & Squalane',
    description:
      'Intensive hydration cream with Ceramides and Squalane for dry skin.',
    category: 'moisturisers',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    ],
    price: 72,
    stock: 195,
    featured: false,
    rating: 4.6,
    numReviews: 98,
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