import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

// Local asset imports
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

const LOCAL_IMAGES = {
  'Aloe Vera Gel':            aloevera,
  'Brightening Serum Banner': bannerSerum,
  'Black Purifying Mask':     blackmask,
  'Daily Foam Cleanser':      cleanser1,
  'Collagen Boost Cream':     collagenCream,
  'Glow Face Cream':          cream1,
  'Advanced Eye Cream':       eyeCream,
  'Botanical Glow Drops':     firefly,
  'Gold Luxury Elixir':       goldElixir,
  'Brightening Face Mask':    mask1,
  'Moisture Surge Cream':     moisturizer1,
  'Rosehip Face Oil':         oil1,
  'Glow Booster Serum':       serum,
  'Renewal Night Serum':      serum1,
  'Barrier Repair Serum':     serum2,
  'Vitamin C Radiance Serum': serum22,
  'Triple Serum Complex':     serum222,
  'Soothing Relief Cream':    soothingcream,
  'Balancing Toner':          tone1,
  'Women Glow Ritual Set':    womenBanner,
  'Luminous Skin Serum':      women22,
  'SPF 50 Sunscreen Mist':    openart,
  'Marine Collagen Cream':    fireflyCream,
  'Pink Clay Rose Mask':      fireflyPink,
  'Vitamin C Citrus Serum':   fireflyVitC,
  'Matcha Detox Mask':        fireflyMatcha,
};

const resolveImg = (product) => {
  // Use local asset if available
  if (LOCAL_IMAGES[product.name]) return LOCAL_IMAGES[product.name];
  // Use product image if it's a full URL
  const src = product.image || product.images?.[0];
  if (src?.startsWith('http')) return src;
  return 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60';
};

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

  const rating = product.rating || 0;
  const stars  = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  const imgSrc = resolveImg(product);

  return (
    <article className="pc-wrap">
      <div className="pc-img-box">
        <Link to={`/products/${product._id}`} className="pc-img-link">
          <img src={imgSrc} alt={product.name} loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60';
            }} />
        </Link>

        {product.tag && <span className={`pc-tag pc-tag--${product.tagType}`}>{product.tag}</span>}

        <button
          className={`pc-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          disabled={wLoading}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
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