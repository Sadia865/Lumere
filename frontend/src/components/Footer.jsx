import { Link } from 'react-router-dom';

const COLS = [
  {
    title: 'Shop',
    links: [
      { to: '/products?category=serums',       label: 'Serums'        },
      { to: '/products?category=moisturisers', label: 'Moisturisers'  },
      { to: '/products?category=masks',        label: 'Masks'         },
      { to: '/products?category=cleansers',    label: 'Cleansers'     },
      { to: '/products?category=suncare',      label: 'Sun Care'      },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about',   label: 'Our Story'    },
      { to: '/contact', label: 'Contact'      },
      { to: '/about',   label: 'Sustainability' },
      { to: '/about',   label: 'Press'        },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/contact', label: 'Help Centre'     },
      { to: '/contact', label: 'Shipping Policy' },
      { to: '/contact', label: 'Returns'         },
      { to: '/contact', label: 'Privacy Policy'  },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <Link to="/" className="footer-logo">Lumière</Link>
            <p className="footer-tagline">
              Premium botanical skincare. Formulated with purpose, 
              backed by science, rooted in nature.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              <ul className="footer-links">
                {col.links.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} Lumière Skincare. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Instagram', 'TikTok', 'Pinterest'].map(s => (
              <a
                key={s} href="#" target="_blank" rel="noreferrer"
                className="footer-copy"
                style={{ opacity: 0.6, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}