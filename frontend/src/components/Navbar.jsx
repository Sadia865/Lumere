import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { isAuthenticated }       = useAuth();
  const { itemCount }             = useCart();
  const navigate                  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/',          label: 'Home'       },
    { to: '/products',  label: 'Shop'       },
    { to: '/about',     label: 'About'      },
    { to: '/contact',   label: 'Contact'    },
  ];

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">Lumière</Link>

        <ul className="nav-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <>
              <li><NavLink to="/wishlist">Wishlist</NavLink></li>
              <li><NavLink to="/orders">Orders</NavLink></li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>
              Sign In
            </Link>
          )}
          <button
            className="nav-cart"
            onClick={() => navigate('/cart')}
            aria-label={`Cart — ${itemCount} items`}
          >
            Cart ({itemCount})
          </button>

          <button
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(245,240,232,0.98)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem', backdropFilter: 'blur(12px)',
          }}
          onClick={() => setMenuOpen(false)}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to} to={to}
              style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--charcoal)' }}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <Link to="/wishlist" style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--charcoal)' }}>Wishlist</Link>
              <Link to="/orders"   style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--charcoal)' }}>Orders</Link>
              <Link to="/account"  style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--charcoal)' }}>Account</Link>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login" style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--charcoal)' }}>Sign In</Link>
          )}
        </div>
      )}
    </>
  );
}