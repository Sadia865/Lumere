import { useState } from 'react';
import API from '../api/axios';

export default function NewsLetter() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await API.post('/newsletter/subscribe', { email });
      setStatus('success');
      setMessage('Thank you — you\'re on the list.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-inner">
          <div className="reveal">
            <h2 className="newsletter-heading">
              Your skin ritual <em>starts here</em>
            </h2>
            <p className="newsletter-sub">
              Join 40,000+ subscribers for early access to new launches, 
              exclusive formulas and expert skincare guidance.
            </p>
          </div>

          <div className="reveal reveal-delay-2">
            {status === 'success' ? (
              <p style={{ color: 'var(--sage-dark)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
                ✓ {message}
              </p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'loading'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
                {status === 'error' && (
                  <p style={{ color: '#c0392b', fontSize: '0.82rem' }}>{message}</p>
                )}
                <p className="newsletter-note">
                  No spam, ever. Unsubscribe with one click. See our Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}