import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const shipping = subtotal > 75 ? 0 : 9.95;
  const tax      = Math.round(subtotal * 0.1 * 100) / 100;
  const total    = subtotal + shipping + tax;

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName:  user?.name?.split(' ').slice(1).join(' ') || '',
    email:     user?.email || '',
    phone:     '',
    address:   '', city: '', state: '', zip: '', country: 'QA',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid rgba(26,26,24,0.2)', borderRadius: 4,
    background: 'var(--linen)', fontFamily: 'var(--body)',
    fontSize: '0.92rem', color: 'var(--charcoal)', outline: 'none',
  };
  const labelStyle = {
    fontSize: '0.75rem', letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--warm-gray)',
    marginBottom: 6, display: 'block',
  };

  const shippingAddress = {
    fullName:   `${form.firstName} ${form.lastName}`.trim(),
    address:    form.address,
    city:       form.city,
    postalCode: form.zip,
    country:    form.country,
    phone:      form.phone,
  };

  // Build orderItems from cart context
  const orderItems = items.map(({ product, quantity }) => ({
    product:  product._id,
    name:     product.name,
    image:    product.image,
    price:    product.price,
    qty:      quantity,
  }));

  const placeOrder = async () => {
    if (!form.firstName || !form.address || !form.city || !form.zip) {
      setError('Please fill in all shipping fields.');
      setStep(0);
      return;
    }
    setLoading(true);
    setError('');

    try {
      if (paymentMethod === 'stripe') {
        // 1. Create order with items included
        const { data: orderData } = await API.post('/orders', {
          shippingAddress,
          paymentMethod: 'Stripe',
          orderItems,
        });
        const orderId = orderData.order._id;

        // 2. Create Stripe checkout session
        const { data: stripeData } = await API.post('/orders/create-checkout-session', {
          items: items.map(({ product, quantity }) => ({
            name:     product.name,
            price:    product.price,   // in dollars — route multiplies by 100
            quantity,
            image:    product.image,
          })),
          shippingAddress,
          orderId,
        });

        // 3. Redirect to Stripe
        window.location.href = stripeData.url;

      } else {
        // Cash on Delivery
        const { data } = await API.post('/orders', {
          shippingAddress,
          paymentMethod: 'Bank Transfer',
          orderItems,
        });
        await clearCart();
        navigate(`/orders/${data.order._id}`, { state: { newOrder: true } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) { navigate('/cart'); return null; }

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400, marginBottom: 40 }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', fontSize: '0.78rem', background: i <= step ? 'var(--charcoal)' : 'var(--cream-dark)', color: i <= step ? '#fff' : 'var(--warm-gray)' }}>{i + 1}</span>
              <span style={{ marginLeft: 8, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: i === step ? 'var(--charcoal)' : 'var(--warm-gray)' }}>{s}</span>
              {i < STEPS.length - 1 && <span style={{ margin: '0 16px', height: 1, width: 32, background: 'rgba(26,26,24,0.15)', display: 'inline-block' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'flex-start' }}>
          <div>
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 8 }}>Shipping Address</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[['firstName','First Name'],['lastName','Last Name']].map(([k,l]) => (
                    <div key={k}><label style={labelStyle}>{l}</label><input style={inputStyle} value={form[k]} onChange={set(k)} /></div>
                  ))}
                </div>
                <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} value={form.email} onChange={set('email')} /></div>
                <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={set('phone')} /></div>
                <div><label style={labelStyle}>Address</label><input style={inputStyle} value={form.address} onChange={set('address')} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                  {[['city','City'],['state','State'],['zip','ZIP']].map(([k,l]) => (
                    <div key={k}><label style={labelStyle}>{l}</label><input style={inputStyle} value={form[k]} onChange={set(k)} /></div>
                  ))}
                </div>
                <div>
                  <label style={labelStyle}>Country</label>
                  <select style={inputStyle} value={form.country} onChange={set('country')}>
                    {[['US','United States'],['GB','United Kingdom'],['CA','Canada'],['AU','Australia'],['PK','Pakistan'],['AE','UAE'],['QA','Qatar']].map(([v,l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <button className="btn-primary" onClick={() => setStep(1)} style={{ alignSelf: 'flex-start', marginTop: 8 }}>Continue to Payment</button>
              </div>
            )}

            {/* Step 1: Payment Method */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 8 }}>Payment Method</h2>

                <div
                  onClick={() => setPaymentMethod('stripe')}
                  style={{ border: `2px solid ${paymentMethod === 'stripe' ? 'var(--charcoal)' : 'rgba(26,26,24,0.15)'}`, borderRadius: 8, padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.2s' }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'stripe' ? 'var(--charcoal)' : 'rgba(26,26,24,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {paymentMethod === 'stripe' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--charcoal)' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem', marginBottom: 4 }}>💳 Credit / Debit Card</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>Securely pay via Stripe — Visa, Mastercard, Amex accepted</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['VISA', 'MC', 'AMEX'].map(c => (
                      <span key={c} style={{ fontSize: '0.6rem', border: '1px solid rgba(26,26,24,0.15)', borderRadius: 3, padding: '2px 6px', color: 'var(--warm-gray)' }}>{c}</span>
                    ))}
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  style={{ border: `2px solid ${paymentMethod === 'cod' ? 'var(--charcoal)' : 'rgba(26,26,24,0.15)'}`, borderRadius: 8, padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.2s' }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'cod' ? 'var(--charcoal)' : 'rgba(26,26,24,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {paymentMethod === 'cod' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--charcoal)' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: '1rem', marginBottom: 4 }}>🚚 Cash on Delivery</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>Pay when your order arrives at your door</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button className="btn-outline" onClick={() => setStep(0)}>Back</button>
                  <button className="btn-primary" onClick={() => setStep(2)}>Review Order</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, marginBottom: 20 }}>Review & Place Order</h2>
                <div style={{ background: 'var(--cream)', borderRadius: 8, padding: 20, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 6 }}>Shipping to</p>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>{form.firstName} {form.lastName}<br />{form.address}, {form.city}, {form.state} {form.zip}<br />{form.country}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 6 }}>Payment</p>
                    <p style={{ fontSize: '0.92rem' }}>{paymentMethod === 'stripe' ? '💳 Credit / Debit Card via Stripe' : '🚚 Cash on Delivery'}</p>
                  </div>
                </div>
                {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: 14 }}>{error}</p>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary" onClick={placeOrder} disabled={loading}>
                    {loading ? 'Processing…' : paymentMethod === 'stripe' ? `Pay $${total.toFixed(2)} with Stripe` : `Place Order — $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--cream)', borderRadius: 8, padding: 28, position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 400, marginBottom: 20 }}>Order Summary</h3>
            {items.map(({ product, quantity }) => (
              <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.88rem', color: 'var(--warm-gray)' }}>
                <span>{product.name} × {quantity}</span>
                <span style={{ color: 'var(--charcoal)' }}>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(123,143,114,0.15)', paddingTop: 12, marginTop: 8 }}>
              {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`], ['Tax (10%)', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--warm-gray)', marginBottom: 8 }}>
                  <span>{l}</span><span style={{ color: 'var(--charcoal)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--serif)', fontSize: '1.05rem', paddingTop: 10, borderTop: '1px solid rgba(123,143,114,0.15)', marginTop: 4 }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}