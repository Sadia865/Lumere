import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

import LOCAL_IMAGES from '../utils/localImages.js';

const resolveImg = (name, src) => {
  if (LOCAL_IMAGES[name]) return LOCAL_IMAGES[name];
  if (src?.startsWith('http')) return src;
  return 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=60';
};
export default function ProductDetail() {
  const { id } = useParams();
  const [product,   setProduct]   = useState(null);
  const [related,   setRelated]   = useState([]);
  const [qty,       setQty]       = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab,       setTab]       = useState('description');
  const [loading,   setLoading]   = useState(true);
  const [added,     setAdded]     = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    setAdded(false);

    API.get(`/products/${id}`)
      .then(({ data }) => {
        const p = data?.product || data;
        setProduct(p);
        return API.get(`/products?category=${p.category}&limit=5`);
      })
      .then(({ data }) => {
        const all = data?.products || data || [];
        setRelated(all.filter(x => x._id !== id).slice(0, 4));
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    await addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
      Loading…
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic' }}>Product not found</p>
      <Link to="/products" className="btn-primary">Back to Shop</Link>
    </div>
  );

const images = [resolveImg(product.name, product.image)];
  const stars  = '★'.repeat(Math.round(product.rating || 0)) + '☆'.repeat(5 - Math.round(product.rating || 0));
  const inStock = (product.stock ?? product.countInStock ?? 0) > 0;

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>

        {/* Breadcrumb — use div, NOT nav (nav gets global fixed-position styles) */}
        <div style={{ marginBottom: 32, fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
          <Link to="/">Home</Link>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          <Link to="/products">Shop</Link>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--charcoal)' }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,6vw,80px)' }}>

          {/* Images */}
          <div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4', background: 'var(--cream-dark)', marginBottom: 12 }}>
              <img src={images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{
                    width: 64, height: 80, borderRadius: 4, overflow: 'hidden',
                    border: `2px solid ${activeImg === i ? 'var(--charcoal)' : 'transparent'}`,
                    cursor: 'pointer', background: 'none', padding: 0,
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.tag && (
              <span className={`pc-tag pc-tag--${product.tagType}`} style={{ position: 'static', display: 'inline-block', marginBottom: 12 }}>
                {product.tag}
              </span>
            )}
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: 6 }}>
              {product.name}
            </h1>
            <p style={{ color: 'var(--warm-gray)', fontSize: '1rem', marginBottom: 14, fontWeight: 300 }}>{product.subtitle}</p>

            {product.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>{stars}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--warm-gray)' }}>({product.numReviews} reviews)</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem' }}>${product.price}</span>
              {product.comparePrice && (
                <span style={{ color: 'var(--warm-gray)', textDecoration: 'line-through', fontSize: '1.1rem' }}>${product.comparePrice}</span>
              )}
              {!inStock && (
                <span style={{ fontSize: '0.78rem', color: '#c0392b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Out of Stock</span>
              )}
            </div>

            {/* Qty */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>Qty</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(26,26,24,0.2)', borderRadius: 2 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 40, fontSize: '1.1rem', cursor: 'pointer', background: 'none', border: 'none' }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontSize: '0.95rem' }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock || 10, q + 1))} style={{ width: 36, height: 40, fontSize: '1.1rem', cursor: 'pointer', background: 'none', border: 'none' }}>+</button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="btn-primary"
              disabled={!inStock}
              style={{ width: '100%', marginBottom: 12, background: added ? 'var(--sage-dark)' : undefined }}
            >
              {!inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <p style={{ fontSize: '0.78rem', textAlign: 'center', color: 'var(--warm-gray)', letterSpacing: '0.08em' }}>
              Free shipping on orders over $75 · Easy 30-day returns
            </p>

            {/* Tabs */}
            <div style={{ marginTop: 36, borderTop: '1px solid rgba(123,143,114,0.15)' }}>
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(123,143,114,0.15)' }}>
                {['description', 'ingredients', 'how to use'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '12px 18px', fontSize: '0.75rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', cursor: 'pointer', background: 'none',
                    border: 'none', fontFamily: 'var(--body)', fontWeight: 400,
                    color: tab === t ? 'var(--charcoal)' : 'var(--warm-gray)',
                    borderBottom: `2px solid ${tab === t ? 'var(--charcoal)' : 'transparent'}`,
                    marginBottom: -1,
                  }}>{t}</button>
                ))}
              </div>
              <div style={{ padding: '20px 0', fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--warm-gray)', fontWeight: 300 }}>
                {tab === 'description'  && <p>{product.description}</p>}
                {tab === 'ingredients'  && <p style={{ fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 2 }}>{product.ingredients || 'Not listed.'}</p>}
                {tab === 'how to use'   && (
                  product.howToUse
                    ? <p style={{ lineHeight: 2 }}>{product.howToUse}</p>
                    : (
                      <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <li>Cleanse and tone your skin thoroughly.</li>
                        <li>Apply a pea-sized amount to fingertips.</li>
                        <li>Gently press into face and neck in upward motions.</li>
                        <li>Allow to absorb for 60 seconds before layering.</li>
                        <li>Use AM &amp; PM for best results. Always follow with SPF in the morning.</li>
                      </ol>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <span className="section-label">You may also like</span>
            <div className="home-products-grid" style={{ marginTop: 24 }}>
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}