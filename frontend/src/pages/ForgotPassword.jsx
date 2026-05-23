import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState('idle');
  const [error,   setError]   = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      await forgotPassword(email);
      setStatus('sent');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '100px var(--pad-x) 60px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <Link to="/" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--charcoal)', display: 'block', textAlign: 'center', marginBottom: 40 }}>
          Lumière
        </Link>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400, textAlign: 'center', marginBottom: 8 }}>Reset your password</h1>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(123,143,114,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem' }}>✓</div>
            <p style={{ color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: 28 }}>
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="btn-primary" style={{ display: 'inline-block' }}>Back to Sign In</Link>
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', color: 'var(--warm-gray)', fontSize: '0.9rem', marginBottom: 36, fontWeight: 300 }}>
              Enter your email address and we'll send you a reset link.
            </p>
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 4, padding: '12px 16px', marginBottom: 20, color: '#c0392b', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6, display: 'block' }}>Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid rgba(26,26,24,0.2)', borderRadius: 4, background: 'var(--linen)', fontFamily: 'var(--body)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', padding: '15px' }}>
                {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.88rem', color: 'var(--warm-gray)' }}>
              <Link to="/login" style={{ color: 'var(--charcoal)', textDecoration: 'underline' }}>← Back to Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}