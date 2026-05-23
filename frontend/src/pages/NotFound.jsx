import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--cream)',
      padding: 'var(--space-xl) var(--pad-x)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px' }}>
        {/* Large 404 */}
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 400,
          color: 'rgba(123, 143, 114, 0.15)',
          lineHeight: 1,
          marginBottom: 'var(--space-md)',
          fontStyle: 'italic'
        }}>
          404
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          color: 'var(--charcoal)',
          marginBottom: 'var(--space-md)',
          lineHeight: 1.2
        }}>
          Page Not <em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>Found</em>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
          lineHeight: '1.7',
          color: 'var(--warm-gray)',
          marginBottom: 'var(--space-lg)',
          fontWeight: 300
        }}>
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/products" className="btn-outline">
            Shop Products
          </Link>
        </div>

        {/* Popular Links */}
        <div style={{
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid rgba(123, 143, 114, 0.15)'
        }}>
          <p style={{
            fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
            marginBottom: 'var(--space-md)',
            fontWeight: 400
          }}>
            Popular Pages
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
              { to: '/cart', label: 'View Cart' }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.92rem)',
                  color: 'var(--warm-gray)',
                  fontWeight: 300,
                  textDecoration: 'underline',
                  transition: 'color var(--transition-base)'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--sage-dark)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--warm-gray)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}