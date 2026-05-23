export const mockProducts = [
  {
    _id: '1',
    name: 'Radiance Serum',
    description: 'Lightweight botanical serum with vitamin C',
    price: 89.99,
    compareAtPrice: 109.99,
    image: '/images/product1.jpg', // You can use placeholder images
    images: ['/images/product1.jpg'],
    category: 'Serums',
    rating: 4.8,
    numReviews: 124,
    countInStock: 15,
    featured: true,
    bestseller: true,
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Rose Water'],
    reviews: []
  },
  {
    _id: '2',
    name: 'Hydrating Cream',
    description: 'Deep moisture botanical face cream',
    price: 75.00,
    image: '/images/product2.jpg',
    images: ['/images/product2.jpg'],
    category: 'Moisturizers',
    rating: 4.9,
    numReviews: 89,
    countInStock: 20,
    featured: true,
    new: true,
    ingredients: ['Shea Butter', 'Aloe Vera', 'Chamomile'],
    reviews: []
  },
  {
    _id: '3',
    name: 'Gentle Cleanser',
    description: 'pH-balanced botanical face wash',
    price: 45.00,
    image: '/images/product3.jpg',
    images: ['/images/product3.jpg'],
    category: 'Cleansers',
    rating: 4.7,
    numReviews: 156,
    countInStock: 30,
    featured: true,
    ingredients: ['Green Tea', 'Calendula', 'Coconut Oil'],
    reviews: []
  },
  {
    _id: '4',
    name: 'Eye Cream',
    description: 'Anti-aging botanical eye treatment',
    price: 95.00,
    compareAtPrice: 120.00,
    image: '/images/product4.jpg',
    images: ['/images/product4.jpg'],
    category: 'Eye Care',
    rating: 4.6,
    numReviews: 67,
    countInStock: 12,
    sale: true,
    ingredients: ['Caffeine', 'Peptides', 'Cucumber Extract'],
    reviews: []
  }
];

export const mockUser = {
  _id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  isAdmin: false
};

export const mockOrders = [
  {
    _id: 'order1',
    orderItems: [
      { product: mockProducts[0], qty: 1, price: 89.99 }
    ],
    shippingAddress: {
      address: '123 Botanical Ave',
      city: 'San Francisco',
      postalCode: '94102',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    totalPrice: 89.99,
    isPaid: true,
    paidAt: new Date().toISOString(),
    isDelivered: false,
    createdAt: new Date().toISOString()
  }
];