import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const BASE_URL = 'http://localhost:5000';
const resolveImg = (src) => src?.startsWith('http') ? src : `${BASE_URL}${src}`;

const STATUS_COLORS = {
  Pending:    { bg: '#fef3c7', color: '#92400e' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
  Shipped:    { bg: '#d1fae5', color: '#065f46' },
  Delivered:  { bg: '#f0fdf4', color: '#166534' },
  Cancelled:  { bg: '#fee2e2', color: '#991b1b' },
};

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/orders/my-orders')
      .then(({ data }) => setOrders(Array.isArray(data) ? data : data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
      Loading orders…
    </div>
  );

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, marginBottom: 40 }}>My Orders</h1>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--warm-gray)', marginBottom: 24 }}>No orders yet</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.map(order => {
              // ✅ use orderStatus not status
              const sc = STATUS_COLORS[order.orderStatus] || STATUS_COLORS.Pending;
              return (
                <div key={order._id} style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Order</p>
                      <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem' }}>#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Date</p>
                      <p style={{ fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Total</p>
                      {/* ✅ use totalPrice not total */}
                      <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem' }}>${order.totalPrice?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Status</p>
                      <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 500, ...sc }}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* ✅ use orderItems not items */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                    {order.orderItems?.slice(0, 4).map(({ product, qty }, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img
                          src={resolveImg(product?.image || product?.images?.[0])}
                          alt={product?.name}
                          style={{ width: 56, height: 70, objectFit: 'cover', borderRadius: 4, background: 'var(--cream-dark)' }}
                          onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=60'; }}
                        />
                        {qty > 1 && (
                          <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--charcoal)', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {qty}
                          </span>
                        )}
                      </div>
                    ))}
                    {order.orderItems?.length > 4 && (
                      <div style={{ width: 56, height: 70, borderRadius: 4, background: 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
                        +{order.orderItems.length - 4}
                      </div>
                    )}
                  </div>

                  <Link to={`/orders/${order._id}`} style={{ fontSize: '0.82rem', color: 'var(--charcoal)', textDecoration: 'underline', letterSpacing: '0.06em' }}>
                    View Order Details →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}