import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    try {
      const token = params.get('token');
      const name  = params.get('name');
      const email = params.get('email');
      const error = params.get('error');

      if (error || !token) {
        navigate('/login?error=google');
        return;
      }

      loginWithToken({ token, name, email });
      navigate('/');
    } catch (err) {
      console.error('Auth callback error:', err);
      navigate('/login');
    }
  }, [params, navigate, loginWithToken]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--cream)',
    }}>
      <p style={{ 
        fontFamily: 'var(--serif)', 
        fontStyle: 'italic', 
        fontSize: '1.2rem',
        color: 'var(--charcoal)',
      }}>
        Signing you in…
      </p>
    </div>
  );
}