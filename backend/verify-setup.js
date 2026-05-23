#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run this to check if your images and folders are correctly set up
 * 
 * Usage: node verify-setup.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required image files from the seeder
const requiredImages = [
  'gold-elixir.png',
  'serum1.png',
  'serum22.png',
  'serum2.png',
  'serum.png',
  'oil1.jpeg',
  'serum222.png',
  'firefly.png',
  'banner serum.png',
  'collagen-cream.png',
  'moisturizer1.png',
  'aloevera.png',
  'soothingcream.png',
  'cream1.png',
  'blackmask.png',
  'mask1.jpeg',
  'cleanser1.png',
  'tone1.png',
  'eye-cream.png',
  'openart-image_1779246961186_5c90a2cd_1779246961341_be072d89.png',
  'women22.png',
  'women banner.png',
];

// Firefly images (may vary)
const fireflyPatterns = [
  'Firefly_Collagen face cream',
  'Firefly_Gemini Flash_Vitamin C serum',
  'Firefly_Gemini Flash_Pink clay face mask',
  'Firefly_Green matcha face mask',
];

console.log('🔍 Lumière Beauty - Setup Verification\n');

// Check 1: Public folder exists
console.log('📁 Checking folder structure...');
const publicPath = path.join(__dirname, '../public');
const imagesPath = path.join(publicPath, 'images');

if (!fs.existsSync(publicPath)) {
  console.error('❌ public/ folder not found!');
  console.log('   Create it at: backend/public/');
} else {
  console.log('✅ public/ folder exists');
}

if (!fs.existsSync(imagesPath)) {
  console.error('❌ public/images/ folder not found!');
  console.log('   Create it at: backend/public/images/');
} else {
  console.log('✅ public/images/ folder exists');
}

// Check 2: Image files
console.log('\n🖼️  Checking image files...');
let missingCount = 0;
let foundCount = 0;

if (fs.existsSync(imagesPath)) {
  const existingFiles = fs.readdirSync(imagesPath);
  
  requiredImages.forEach(img => {
    const exists = existingFiles.includes(img);
    if (exists) {
      console.log(`✅ ${img}`);
      foundCount++;
    } else {
      console.log(`❌ ${img} - MISSING`);
      missingCount++;
    }
  });

  // Check for Firefly images
  console.log('\n🔥 Checking Firefly images...');
  const fireflyImages = existingFiles.filter(f => f.startsWith('Firefly_'));
  if (fireflyImages.length > 0) {
    console.log(`✅ Found ${fireflyImages.length} Firefly images:`);
    fireflyImages.forEach(img => console.log(`   - ${img}`));
  } else {
    console.log('⚠️  No Firefly images found (check seeder for exact filenames)');
  }
}

// Check 3: Required files
console.log('\n📄 Checking required files...');

const requiredFiles = [
  { path: 'src/server.js', desc: 'Server file' },
  { path: 'src/seeders/productSeeder.js', desc: 'Product seeder' },
  { path: 'src/models/Product.js', desc: 'Product model' },
  { path: 'src/routes/products.js', desc: 'Product routes' },
  { path: '.env', desc: 'Environment variables' },
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file.path);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file.desc} (${file.path})`);
  } else {
    console.log(`❌ ${file.desc} (${file.path}) - MISSING`);
  }
});

// Check 4: .env configuration
console.log('\n⚙️  Checking environment variables...');
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const requiredVars = ['MONGO_URI', 'PORT', 'FRONTEND_URL'];
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} configured`);
    } else {
      console.log(`⚠️  ${varName} not found in .env`);
    }
  });
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY');
console.log('='.repeat(50));
console.log(`✅ Images found: ${foundCount}`);
console.log(`❌ Images missing: ${missingCount}`);

if (missingCount === 0) {
  console.log('\n🎉 All images are present! You\'re ready to go!');
  console.log('\n📝 Next steps:');
  console.log('   1. Run seeder: node src/seeders/productSeeder.js');
  console.log('   2. Start server: npm run dev');
  console.log('   3. Test images: http://localhost:5000/images/gold-elixir.png');
} else {
  console.log(`\n⚠️  You're missing ${missingCount} images.`);
  console.log('   Add them to backend/public/images/ folder');
}

// Check for common issues
console.log('\n🔧 Common Issues:');
console.log('   - Images not loading? Check express.static() in server.js');
console.log('   - Product not found? Re-run the seeder with new ObjectIds');
console.log('   - CORS errors? Check FRONTEND_URL in .env');
console.log('   - Still issues? Check the FIX_GUIDE.md');