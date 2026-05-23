// Sample product data

export const productsData = [
  {
    id: 1,
    name: 'Lumière Radiance Serum',
    category: 'serums',
    price: 89.0,
    description:
      "Our signature concentrated serum that works with your skin's natural intelligence to reveal a radiant, healthy glow.",
    longDescription:
      'LUMIÈRE Radiance Serum is a concentrated formula designed to work in harmony with your skin.',
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop&q=90',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 342,
  },

  {
    id: 2,
    name: 'Hydrating Face Oil',
    category: 'serums',
    price: 75.0,
    description:
      'Lightweight face oil that nourishes and balances your skin.',
    longDescription:
      'A luxurious blend of natural oils that absorbs quickly.',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 256,
  },

  {
    id: 3,
    name: 'Intensive Night Cream',
    category: 'moisturizers',
    price: 95.0,
    description:
      'Rich night cream that repairs and rejuvenates skin overnight.',
    longDescription:
      'Advanced peptide formula for smoother, radiant skin.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 189,
  },

  {
    id: 4,
    name: 'Daily Defense Moisturizer SPF 30',
    category: 'moisturizers',
    price: 68.0,
    description:
      'Daily moisturizer with SPF 30 protection.',
    longDescription:
      'Hydrates and protects against harmful UV rays.',
    image:
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 412,
  },

  {
    id: 5,
    name: 'Gentle Foam Cleanser',
    category: 'cleansers',
    price: 42.0,
    description:
      'Soft foaming cleanser that removes impurities.',
    longDescription:
      'Maintains moisture balance while deeply cleansing.',
    image:
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 324,
  },

  {
    id: 6,
    name: 'Exfoliating Gel Cleanser',
    category: 'cleansers',
    price: 48.0,
    description:
      'Gentle exfoliating cleanser for smoother skin.',
    longDescription:
      'Combines exfoliation with deep cleansing.',
    image:
      'https://images.unsplash.com/photo-1556229010-aa9ead0a4b5?w=800&h=800&fit=crop&q=90',
    images: [
      'https://images.unsplash.com/photo-1556229010-aa9ead0a4b5?w=800&h=800&fit=crop&q=90',
    ],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 267,
  },
]

export const getProductById = (id) => {
  return productsData.find((product) => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return productsData

  return productsData.filter(
    (product) => product.category === category
  )
}

export const getFeaturedProducts = () => {
  return productsData.filter((product) => product.featured)
}
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'serums', label: 'Serums' },
  { id: 'moisturizers', label: 'Moisturizers' },
  { id: 'cleansers', label: 'Cleansers' },
]