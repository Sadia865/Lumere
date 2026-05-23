import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    border: '1px solid rgba(26,26,24,0.2)', borderRadius: 4,
    background: 'var(--linen)', fontFamily: 'var(--body)',
    fontSize: '0.95rem', color: 'var(--charcoal)', outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--cream)', padding: '100px var(--pad-x) 60px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <Link to="/" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--charcoal)', display: 'block', textAlign: 'center', marginBottom: 40 }}>
          Lumière
        </Link>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400, textAlign: 'center', marginBottom: 8 }}>Welcome back</h1>
        <p style={{ textAlign: 'center', color: 'var(--warm-gray)', fontSize: '0.9rem', marginBottom: 36, fontWeight: 300 }}>
          Sign in to your account to continue
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 4, padding: '12px 16px', marginBottom: 20, color: '#c0392b', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%', padding: '13px 16px', marginBottom: 20,
            border: '1px solid rgba(26,26,24,0.2)', borderRadius: 4,
            background: '#fff', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            fontFamily: 'var(--body)', fontSize: '0.95rem', color: 'var(--charcoal)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(26,26,24,0.15)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(26,26,24,0.15)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6, display: 'block' }}>
              Email
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              style={inputStyle} required autoComplete="email"
              onFocus={e => e.currentTarget.style.borderColor = 'var(--sage)'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(26,26,24,0.2)'}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>
                Password
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--sage)', textDecoration: 'underline' }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={inputStyle} required autoComplete="current-password"
              onFocus={e => e.currentTarget.style.borderColor = 'var(--sage)'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(26,26,24,0.2)'}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: 8, padding: '15px' }}>
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.88rem', color: 'var(--warm-gray)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--charcoal)', textDecoration: 'underline', fontWeight: 500 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}