import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 200,
        width: 44, height: 44, borderRadius: '50%',
        background: 'var(--charcoal)', color: '#fff',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', boxShadow: 'var(--shadow-lg)',
        transition: 'background 0.2s, transform 0.2s',
        opacity: visible ? 1 : 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage-dark)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      ↑
    </button>
  );
}