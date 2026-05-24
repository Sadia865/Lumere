import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import API from '../api/axios';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
const resolveImg = (src) => src?.startsWith('http') ? src : `${BASE_URL}${src}`;

// ✅ match Order model enum values exactly
const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrderDetail() {
  const { id }   = useParams();
  const location = useLocation();
  const newOrder = location.state?.newOrder;
  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data.order || data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
      Loading order…
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic' }}>Order not found</p>
      <Link to="/orders" className="btn-primary">My Orders</Link>
    </div>
  );

  // ✅ use orderStatus not status
  const stepIdx = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>

        {newOrder && (
          <div style={{ background: 'rgba(123,143,114,0.12)', borderRadius: 8, padding: '20px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '1.5rem' }}>✓</span>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', marginBottom: 4 }}>Order placed successfully!</p>
              {/* ✅ get email from populated user object */}
              <p style={{ fontSize: '0.88rem', color: 'var(--warm-gray)' }}>
                A confirmation email has been sent to {order.user?.email}
              </p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6 }}>Order</p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400 }}>
              #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p style={{ color: 'var(--warm-gray)', fontSize: '0.88rem', marginTop: 4 }}>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link to="/orders" style={{ fontSize: '0.82rem', color: 'var(--charcoal)', textDecoration: 'underline' }}>← All Orders</Link>
        </div>

        {/* Status tracker */}
        {order.orderStatus !== 'Cancelled' && (
          <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 32 }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 20 }}>Order Status</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {STATUS_STEPS.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= stepIdx ? 'var(--sage)' : 'var(--cream-dark)', color: i <= stepIdx ? '#fff' : 'var(--warm-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                      {i < stepIdx ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === stepIdx ? 'var(--charcoal)' : 'var(--warm-gray)', whiteSpace: 'nowrap' }}>
                      {s}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: i < stepIdx ? 'var(--sage)' : 'var(--cream-dark)', margin: '0 8px', marginBottom: 28 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {/* Items - ✅ use orderItems and qty */}
          <div style={{ gridColumn: 'span 2', background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 20 }}>Items Ordered</p>
            {order.orderItems?.map(({ product, qty, price, name, image }, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(123,143,114,0.12)' }}>
                <img
                  src={resolveImg(product?.image || image)}
                  alt={product?.name || name}
                  style={{ width: 64, height: 80, objectFit: 'cover', borderRadius: 4, background: 'var(--cream-dark)', flexShrink: 0 }}
                  onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=60'; }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem' }}>{product?.name || name}</p>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Qty: {qty} · ${price} each</p>
                </div>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem' }}>${(price * qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Shipping - ✅ use fullName and postalCode */}
          <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 16 }}>Shipping Address</p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              {order.shippingAddress?.fullName}<br />
              {order.shippingAddress?.address}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
              {order.shippingAddress?.country}
            </p>
          </div>

          {/* Summary - ✅ use itemsPrice, shippingPrice, taxPrice, totalPrice */}
          <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 16 }}>Order Summary</p>
            {[
              ['Subtotal',  `$${order.itemsPrice?.toFixed(2)}`],
              ['Shipping',  order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice?.toFixed(2)}`],
              ['Tax',       `$${order.taxPrice?.toFixed(2)}`],
              ['Total',     `$${order.totalPrice?.toFixed(2)}`],
            ].map(([l, v]) => (
              <div key={l} style={{
                display: 'flex', justifyContent: 'space-between', marginBottom: 10,
                fontSize: l === 'Total' ? '1rem' : '0.88rem',
                fontFamily: l === 'Total' ? 'var(--serif)' : 'inherit',
                borderTop: l === 'Total' ? '1px solid rgba(123,143,114,0.15)' : 'none',
                paddingTop: l === 'Total' ? 10 : 0,
                marginTop: l === 'Total' ? 4 : 0,
              }}>
                <span style={{ color: l === 'Total' ? 'var(--charcoal)' : 'var(--warm-gray)' }}>{l}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}