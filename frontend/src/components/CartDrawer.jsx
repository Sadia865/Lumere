import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, removeFromCart, updateQuantity, itemCount } = useCart();
  const navigate = useNavigate();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(26,26,24,0.4)',
          zIndex: 300, backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          background: 'var(--linen)',
          zIndex: 301, display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(26,26,24,0.12)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 28px', borderBottom: '1px solid rgba(123,143,114,0.12)',
        }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: '1.3rem' }}>
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={onClose} aria-label="Close cart"
            style={{ fontSize: '1.5rem', color: 'var(--warm-gray)', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p style={{ color: 'var(--warm-gray)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Your cart is empty.
              </p>
              <Link
                to="/products" onClick={onClose}
                className="btn-primary" style={{ display: 'inline-block' }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {items.map(({ product, quantity }) => (
                <li key={product._id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Link to={`/products/${product._id}`} onClick={onClose}>
                    <img
                      src={product.image} alt={product.name}
                      style={{ width: 72, height: 90, objectFit: 'cover', borderRadius: 4, background: 'var(--cream-dark)' }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/products/${product._id}`} onClick={onClose}
                      style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', color: 'var(--charcoal)' }}
                    >
                      {product.name}
                    </Link>
                    <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', marginTop: 2 }}>{product.subtitle}</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: 6 }}>${product.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                      <button
                        onClick={() => updateQuantity(product._id, quantity - 1)}
                        style={{ width: 28, height: 28, border: '1px solid rgba(26,26,24,0.2)', borderRadius: 2, fontSize: '1rem', cursor: 'pointer', background: 'transparent' }}
                      >−</button>
                      <span style={{ fontSize: '0.9rem', minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product._id, quantity + 1)}
                        style={{ width: 28, height: 28, border: '1px solid rgba(26,26,24,0.2)', borderRadius: 2, fontSize: '1rem', cursor: 'pointer', background: 'transparent' }}
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    aria-label={`Remove ${product.name}`}
                    style={{ color: 'var(--warm-gray)', fontSize: '1.1rem', marginTop: 2, background: 'none', border: 'none', cursor: 'pointer' }}
                  >×</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(123,143,114,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--warm-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>${subtotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginBottom: 14, textAlign: 'center' }}>
              Shipping &amp; taxes calculated at checkout
            </p>
            <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Proceed to Checkout
            </button>
            <Link
              to="/cart" onClick={onClose}
              style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: '0.82rem', color: 'var(--warm-gray)', textDecoration: 'underline' }}
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}