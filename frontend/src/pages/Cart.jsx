import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BASE_URL = 'http://localhost:5000';
const resolveImg = (src) => src?.startsWith('http') ? src : `${BASE_URL}${src}`;

export default function Cart() {
  const { items, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping  = subtotal > 75 ? 0 : 9.95;
  const total     = subtotal + shipping;

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400, marginBottom: 40 }}>
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--warm-gray)', marginBottom: 24 }}>
              Your cart is empty
            </p>
            <Link to="/products" className="btn-primary">Discover Our Collection</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,6vw,60px)', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
                <button onClick={clearCart} style={{ fontSize: '0.78rem', letterSpacing: '0.1em', color: 'var(--warm-gray)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Clear Cart
                </button>
              </div>

              {items.map(({ product, quantity }) => (
                <div key={product._id} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: '1px solid rgba(123,143,114,0.15)', alignItems: 'flex-start' }}>
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={resolveImg(product.image || product.images?.[0])}
                      alt={product.name}
                      style={{ width: 90, height: 112, objectFit: 'cover', borderRadius: 4, background: 'var(--cream-dark)', flexShrink: 0 }}
                      onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=60'; }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link to={`/products/${product._id}`} style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', color: 'var(--charcoal)' }}>
                      {product.name}
                    </Link>
                    <p style={{ fontSize: '0.82rem', color: 'var(--warm-gray)', marginTop: 4, fontWeight: 300 }}>{product.subtitle}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 500, marginTop: 8 }}>${product.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                      <div style={{ display: 'flex', border: '1px solid rgba(26,26,24,0.2)', borderRadius: 2 }}>
                        <button onClick={() => updateQuantity(product._id, quantity - 1)} style={{ width: 32, height: 36, cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.1rem' }}>−</button>
                        <span style={{ width: 36, textAlign: 'center', lineHeight: '36px', fontSize: '0.9rem' }}>{quantity}</span>
                        <button onClick={() => updateQuantity(product._id, quantity + 1)} style={{ width: 32, height: 36, cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.1rem' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(product._id)} style={{ fontSize: '0.78rem', color: 'var(--warm-gray)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 32, position: 'sticky', top: 100 }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 24 }}>Order Summary</h2>
              {[{ label: 'Subtotal', val: `$${subtotal.toFixed(2)}` }, { label: 'Shipping', val: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }].map(({ label, val }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.9rem', color: 'var(--warm-gray)' }}>
                  <span>{label}</span><span style={{ color: 'var(--charcoal)' }}>{val}</span>
                </div>
              ))}
              {shipping > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--sage)', marginBottom: 12 }}>
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div style={{ borderTop: '1px solid rgba(123,143,114,0.2)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>Total</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>${total.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%' }}>
                Proceed to Checkout
              </button>
              <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: '0.82rem', color: 'var(--warm-gray)', textDecoration: 'underline' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}