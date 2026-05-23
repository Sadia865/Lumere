import { Link } from 'react-router-dom';
import womenBanner from '../assets/women banner.png';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-grid">
        <div className="hero-img-wrap">
          <img
            src={womenBanner}
            alt="Lumière botanical skincare"
          />
        </div>
      </div>

      <div className="hero-img-overlay" />

      <div className="hero-content">
        <span className="hero-eyebrow">Premium Botanical Skincare</span>

        <h1 className="hero-heading">
          Skin that <em>glows</em><br />from within
        </h1>

        <p className="hero-sub">
          Pure botanicals. Clinical actives. Crafted with intention for skin 
          that radiates health — not just a surface shimmer.
        </p>

        <div className="hero-btns">
          <Link to="/products" className="btn-primary">Shop the Collection</Link>
          <Link to="/about"    className="btn-outline">Our Story</Link>
        </div>
      </div>

      <span className="hero-ghost" aria-hidden="true">Lumière</span>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="scroll-line" />
        Scroll to explore
      </div>
    </section>
  );
}