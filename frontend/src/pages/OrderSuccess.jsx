import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('verifying');
  const [order,  setOrder]  = useState(null);

  useEffect(() => {
    const sessionId = params.get('session_id');
    const orderId   = params.get('orderId');
    if (!sessionId || !orderId) { setStatus('error'); return; }

    API.post('/orders/verify-payment', { sessionId, orderId })
      .then(({ data }) => {
        if (data.success) {
          setOrder(data.order);
          setStatus('success');
          clearCart();
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'verifying') return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--warm-gray)' }}>Verifying payment…</p>
    </div>
  );

  if (status === 'error') return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: '#c0392b' }}>Payment verification failed</p>
      <Link to="/orders" className="btn-primary">View My Orders</Link>
    </div>
  );

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)', maxWidth: 600, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>✓</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, marginBottom: 12 }}>
          Payment Successful!
        </h1>
        <p style={{ color: 'var(--warm-gray)', marginBottom: 8 }}>Your order has been confirmed and is being processed.</p>
        {order && (
          <p style={{ fontSize: '0.88rem', color: 'var(--warm-gray)', marginBottom: 36 }}>
            Order #{order._id.slice(-8).toUpperCase()} · ${order.totalPrice?.toFixed(2)}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {order && <Link to={`/orders/${order._id}`} className="btn-primary">View Order</Link>}
          <Link to="/products" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}