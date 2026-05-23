// src/data/productsData.js

import aloevera from '../assets/aloevera.png';
import bannerSerum from '../assets/banner serum.png';
import blackmask from '../assets/blackmask.png';
import cleanser1 from '../assets/cleanser1.png';
import collagenCream from '../assets/collagen-cream.png';
import cream1 from '../assets/cream1.png';
import eyeCream from '../assets/eye-cream.png';
import firefly from '../assets/firefly.png';
import goldElixir from '../assets/gold-elixir.png';
import mask1 from '../assets/mask1.jpeg';
import moisturizer1 from '../assets/moisturizer1.png';
import oil1 from '../assets/oil1.jpeg';
import serum from '../assets/serum.png';
import serum1 from '../assets/serum1.png';
import serum2 from '../assets/serum2.png';
import serum22 from '../assets/serum22.png';
import serum222 from '../assets/serum222.png';
import soothingcream from '../assets/soothingcream.png';
import tone1 from '../assets/tone1.png';
import womenBanner from '../assets/women banner.png';
import women22 from '../assets/women22.png';
import openart from '../assets/openart-image_1779246961186_5c90a2cd_1779246961341_be072d89.png';
import fireflyCream from '../assets/Firefly_Collagen face cream with pearl and marine elements, _soft blue and white tones, elega 779867.png';
import fireflyPink from '../assets/Firefly_Gemini Flash_Pink clay face mask in open jar, dried rose petals and pink clay powder, _soft pink m 779867.png';
import fireflyVitC from '../assets/Firefly_Gemini Flash_Vitamin C serum bottle with orange slices and citrus leaves, _bright fresh aesthetic, 779867.png';
import fireflyMatcha from '../assets/Firefly_Green matcha face mask jar with green tea leaves and powder, _white minimal backgroun 779867.png';

const products = [
  {
    _id: '1',
    name: 'Radiance Serum',
    subtitle: 'Vitamin C & Niacinamide',
    price: 89,
    comparePrice: 110,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'serums',
    featured: true,
  },

  {
    _id: '2',
    name: 'Botanical Hydra Cream',
    subtitle: 'Rose & Ceramide Complex',
    price: 72,
    image:
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '3',
    name: 'Purifying Clay Mask',
    subtitle: 'Kaolin & Green Tea',
    price: 54,
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'masks',
    featured: true,
  },

  {
    _id: '4',
    name: 'Retinol Night Elixir',
    subtitle: '0.5% Retinol & Peptides',
    price: 98,
    image:
      'https://images.unsplash.com/photo-1570194065650-d99fb4a8b5f1?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4a8b5f1?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'serums',
    featured: true,
  },

  {
    _id: '5',
    name: 'SPF 50 Daytime Shield',
    subtitle: 'Invisible Mineral Sunscreen',
    price: 46,
    image:
      'https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1631390561706-9f3e1fcea1e0?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'suncare',
    featured: false,
  },

  {
    _id: '6',
    name: 'Gentle Cleansing Balm',
    subtitle: 'Chamomile & Jojoba',
    price: 38,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'cleansers',
    featured: false,
  },

  {
    _id: '7',
    name: 'Hyaluronic Mist',
    subtitle: '3-Weight HA Complex',
    price: 29,
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'toners',
    featured: false,
  },

  {
    _id: '8',
    name: 'Eye Contour Cream',
    subtitle: 'Caffeine & Peptide Lift',
    price: 62,
    image:
      'https://images.unsplash.com/photo-1590440165072-f5a8b5bfb399?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1590440165072-f5a8b5bfb399?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'eyes',
    featured: false,
  },

  {
    _id: '9',
    name: 'Aloe Vera Gel',
    subtitle: 'Pure & Soothing',
    price: 32,
    image: aloevera,
    images: [aloevera],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '10',
    name: 'Black Purifying Mask',
    subtitle: 'Activated Charcoal & Clay',
    price: 48,
    image: blackmask,
    images: [blackmask],
    category: 'masks',
    featured: true,
  },

  {
    _id: '11',
    name: 'Daily Foam Cleanser',
    subtitle: 'Gentle & Balancing',
    price: 34,
    image: cleanser1,
    images: [cleanser1],
    category: 'cleansers',
    featured: false,
  },

  {
    _id: '12',
    name: 'Collagen Boost Cream',
    subtitle: 'Marine Collagen & Peptides',
    price: 85,
    image: collagenCream,
    images: [collagenCream],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '13',
    name: 'Glow Face Cream',
    subtitle: 'Brightening & Nourishing',
    price: 58,
    image: cream1,
    images: [cream1],
    category: 'moisturisers',
    featured: false,
  },

  {
    _id: '14',
    name: 'Advanced Eye Cream',
    subtitle: 'Retinol & Vitamin K',
    price: 65,
    image: eyeCream,
    images: [eyeCream],
    category: 'eyes',
    featured: false,
  },

  {
    _id: '15',
    name: 'Gold Luxury Elixir',
    subtitle: '24K Gold & Hyaluronic Acid',
    price: 120,
    image: goldElixir,
    images: [goldElixir],
    category: 'serums',
    featured: true,
  },

  {
    _id: '16',
    name: 'Brightening Face Mask',
    subtitle: 'Vitamin C & Turmeric',
    price: 44,
    image: mask1,
    images: [mask1],
    category: 'masks',
    featured: false,
  },

  {
    _id: '17',
    name: 'Moisture Surge Cream',
    subtitle: 'Ceramide & Squalane',
    price: 68,
    image: moisturizer1,
    images: [moisturizer1],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '18',
    name: 'Rosehip Face Oil',
    subtitle: 'Cold-Pressed & Regenerating',
    price: 55,
    image: oil1,
    images: [oil1],
    category: 'serums',
    featured: false,
  },

  {
    _id: '19',
    name: 'Glow Booster Serum',
    subtitle: 'Niacinamide & AHA Complex',
    price: 78,
    image: serum,
    images: [serum],
    category: 'serums',
    featured: false,
  },

  {
    _id: '20',
    name: 'Renewal Night Serum',
    subtitle: 'Bakuchiol & Peptides',
    price: 92,
    image: serum1,
    images: [serum1],
    category: 'serums',
    featured: true,
  },

  {
    _id: '21',
    name: 'Barrier Repair Serum',
    subtitle: 'Ceramide & Centella',
    price: 76,
    image: serum2,
    images: [serum2],
    category: 'serums',
    featured: false,
  },

  {
    _id: '22',
    name: 'Vitamin C Radiance Serum',
    subtitle: '20% Stabilised Vitamin C',
    price: 95,
    image: serum22,
    images: [serum22],
    category: 'serums',
    featured: true,
  },

  {
    _id: '23',
    name: 'Soothing Relief Cream',
    subtitle: 'Oat & Chamomile Calm',
    price: 50,
    image: soothingcream,
    images: [soothingcream],
    category: 'moisturisers',
    featured: false,
  },

  {
    _id: '24',
    name: 'Balancing Toner',
    subtitle: 'AHA & Witch Hazel',
    price: 36,
    image: tone1,
    images: [tone1],
    category: 'toners',
    featured: false,
  },

  {
    _id: '25',
    name: 'Brightening Serum Banner',
    subtitle: 'Vitamin C & Ferulic Acid',
    price: 88,
    image: bannerSerum,
    images: [bannerSerum],
    category: 'serums',
    featured: true,
  },

  {
    _id: '26',
    name: 'Botanical Glow Drops',
    subtitle: 'Firefly Botanical Blend',
    price: 74,
    image: firefly,
    images: [firefly],
    category: 'serums',
    featured: true,
  },

  {
    _id: '27',
    name: 'Triple Serum Complex',
    subtitle: 'Anti-Ageing & Firming',
    price: 105,
    image: serum222,
    images: [serum222],
    category: 'serums',
    featured: true,
  },

  {
    _id: '28',
    name: 'Women Glow Ritual Set',
    subtitle: 'Complete Skincare Routine',
    price: 145,
    image: womenBanner,
    images: [womenBanner],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '29',
    name: 'Luminous Skin Serum',
    subtitle: 'Botanical Brightening Formula',
    price: 82,
    image: women22,
    images: [women22],
    category: 'serums',
    featured: false,
  },

  {
    _id: '30',
    name: 'SPF 50 Sunscreen Mist',
    subtitle: 'Mineral Sun Protection',
    price: 52,
    image: openart,
    images: [openart],
    category: 'suncare',
    featured: false,
  },

  {
    _id: '31',
    name: 'Marine Collagen Cream',
    subtitle: 'Pearl & Marine Collagen',
    price: 92,
    image: fireflyCream,
    images: [fireflyCream],
    category: 'moisturisers',
    featured: true,
  },

  {
    _id: '32',
    name: 'Pink Clay Rose Mask',
    subtitle: 'Rose Petal & Pink Clay',
    price: 49,
    image: fireflyPink,
    images: [fireflyPink],
    category: 'masks',
    featured: true,
  },

  {
    _id: '33',
    name: 'Vitamin C Citrus Serum',
    subtitle: 'Orange & Citrus Bright',
    price: 79,
    image: fireflyVitC,
    images: [fireflyVitC],
    category: 'serums',
    featured: false,
  },

  {
    _id: '34',
    name: 'Matcha Detox Mask',
    subtitle: 'Green Tea & Antioxidants',
    price: 46,
    image: fireflyMatcha,
    images: [fireflyMatcha],
    category: 'masks',
    featured: false,
  },
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'serums', label: 'Serums' },
  { id: 'moisturisers', label: 'Moisturisers' },
  { id: 'masks', label: 'Masks' },
  { id: 'cleansers', label: 'Cleansers' },
  { id: 'suncare', label: 'Sun Care' },
  { id: 'toners', label: 'Toners' },
  { id: 'eyes', label: 'Eye Care' },
];

export default products;