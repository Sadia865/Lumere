import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
const resolveImg = (src) => src?.startsWith('http') ? src : `${BASE_URL}${src}`;

export default function Wishlist() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchWishlist(); }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data.wishlist || []);
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      setWishlist(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const moveToCart = async (product) => {
    try {
      await addToCart(product, 1);
      await removeFromWishlist(product._id);
    } catch (err) {
      console.error('Error moving to cart:', err);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
      Loading wishlist…
    </div>
  );

  if (wishlist.length === 0) return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
      <h1 className="section-heading" style={{ marginBottom: 'var(--space-md)' }}>
        Your Wishlist is <em>Empty</em>
      </h1>
      <p style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', color: 'var(--warm-gray)', marginBottom: 'var(--space-lg)', maxWidth: '500px' }}>
        Save your favorite products to your wishlist and they'll appear here.
      </p>
      <Link to="/products" className="btn-primary">Explore Products</Link>
    </div>
  );

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, marginBottom: 8 }}>
          Your <em>Wishlist</em>
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--warm-gray)', marginBottom: 40 }}>
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
        </p>

        <div className="home-products-grid">
          {wishlist.map((product) => (
            <div key={product._id} style={{ position: 'relative' }}>
              <div className="pc-img-box">
                <Link to={`/products/${product._id}`} className="pc-img-link">
                  <img
                    src={resolveImg(product.image || product.images?.[0])}
                    alt={product.name}
                    onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60'; }}
                  />
                </Link>
                {product.tag && <span className="pc-tag">{product.tag}</span>}
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--sage)', zIndex: 3 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.color = 'var(--sage)'; }}
                >×</button>
              </div>
              <div className="pc-info">
                <Link to={`/products/${product._id}`} className="pc-name">{product.name}</Link>
                <p className="pc-sub">{product.subtitle || product.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <span className="pc-price">${product.price}</span>
                  <button onClick={() => moveToCart(product)} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.7rem' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}