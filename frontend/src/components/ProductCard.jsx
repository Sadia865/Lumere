import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const BASE_URL = 'http://localhost:5000';
const resolveImg = (src) => src?.startsWith('http') ? src : `${BASE_URL}${src}`;

export default function ProductCard({ product }) {
  const { addToCart }       = useCart();
  const { isAuthenticated } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);
  const [wLoading,   setWLoading]   = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
API.get(`/wishlist/check/${product._id}`)
      .then(({ data }) => setWishlisted(data.inWishlist))
      .catch(() => {});
  }, [product._id, isAuthenticated]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { window.location.href = '/login'; return; }
    setWLoading(true);
    try {
      if (wishlisted) {
        await API.delete(`/wishlist/${product._id}`);
        setWishlisted(false);
      } else {
        await API.post(`/wishlist/${product._id}`);
        setWishlisted(true);
      }
    } catch { /* ignore */ }
    finally { setWLoading(false); }
  };

  const rating  = product.rating || 0;
  const stars   = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  const imgSrc  = resolveImg(product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60');

  return (
    <article className="pc-wrap">
      <div className="pc-img-box">
        <Link to={`/products/${product._id}`} className="pc-img-link">
          <img src={imgSrc} alt={product.name} loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60'; }} />
        </Link>

        {product.tag && <span className={`pc-tag pc-tag--${product.tagType}`}>{product.tag}</span>}

        {/* Wishlist button */}
        <button
          className={`pc-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          disabled={wLoading}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '♥' : '♡'}
        </button>

        <button className="pc-atb" onClick={() => addToCart(product, 1)} aria-label={`Add ${product.name} to cart`}>
          Add to Cart
        </button>
      </div>

      <div className="pc-info">
        <Link to={`/products/${product._id}`} className="pc-name">{product.name}</Link>
        <p className="pc-sub">{product.subtitle}</p>
        <div className="pc-price-row">
          <span className="pc-price">${product.price}</span>
          {product.comparePrice && <span className="pc-compare">${product.comparePrice}</span>}
        </div>
        {product.numReviews > 0 && (
          <div className="pc-rating">
            <span className="pc-stars" aria-hidden="true">{stars}</span>
            <span className="pc-reviews">({product.numReviews})</span>
          </div>
        )}
      </div>
    </article>
  );
}