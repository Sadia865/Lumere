import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref             = useRef(null);
  const { user, logout, isAdmin } = useAuth();
  const navigate        = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setOpen(false);
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Profile menu"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--sage)', color: '#fff',
          fontFamily: 'var(--body)', fontWeight: 500,
          fontSize: '0.75rem', letterSpacing: '0.06em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {initials}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0,
          background: 'var(--cream)', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)', minWidth: 200,
          border: '1px solid rgba(123,143,114,0.12)',
          overflow: 'hidden', zIndex: 200,
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(123,143,114,0.12)' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--charcoal)' }}>{user?.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginTop: 2 }}>{user?.email}</p>
          </div>

          {[
            { to: '/account',  label: 'My Account'   },
            { to: '/orders',   label: 'My Orders'     },
            { to: '/wishlist', label: 'Wishlist'      },
            ...(isAdmin ? [{ to: '/admin', label: 'Admin Panel' }] : []),
          ].map(({ to, label }) => (
            <Link
              key={to} to={to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '12px 20px',
                fontSize: '0.85rem', color: 'var(--charcoal)',
                borderBottom: '1px solid rgba(123,143,114,0.07)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '12px 20px', fontSize: '0.85rem',
              color: '#c0392b', background: 'none', border: 'none',
              cursor: 'pointer', transition: 'background 0.2s',
              fontFamily: 'var(--body)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}