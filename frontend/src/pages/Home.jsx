import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero        from '../components/Hero';
import Ticker      from '../components/Ticker';
import ProductCard from '../components/ProductCard';
import BrandStory  from '../components/BrandStory';
import Features    from '../components/Features';
import Testimonials from '../components/Testimonials';
import Collection  from '../components/Collection';
import NewsLetter  from '../components/NewsLetter';
import useProducts from '../hooks/useProducts';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Home() {
  const { products: featured, loading } = useProducts({ featured: true, limit: 4 });
  useScrollAnimation([featured]);

  return (
    <>
      <Hero />
      <Ticker />

      {/* Featured Products */}
      <section className="products">
        <div className="container">
          <div className="products-header reveal">
            <div>
              <span className="section-label">Bestsellers</span>
              <h2 className="section-heading">Our <em>hero</em> formulas</h2>
            </div>
            <Link to="/products" className="btn-outline">View All</Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
              Loading…
            </div>
          ) : (
            <div className="home-products-grid">
              {featured.map((p, i) => (
                <div key={p._id} className={`reveal reveal-delay-${i + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BrandStory />
      <Features />

      {/* Ritual CTA */}
      <section className="ritual">
        <div className="ritual-bg" />
        <div className="ritual-overlay" />
        <div className="ritual-content reveal">
          <span className="ritual-label">Begin Your Ritual</span>
          <h2 className="ritual-heading">
            Discover the <em>art</em> of<br />conscious skincare
          </h2>
          <p className="ritual-sub">
            Curated routines, personalised to your skin. 
            Science-backed. Nature-sourced. Always honest.
          </p>
          <Link to="/products" className="btn-ritual">Shop Now</Link>
        </div>
        <span className="ritual-ghost" aria-hidden="true">Ritual</span>
      </section>

      <Testimonials />
      <Collection />
      <NewsLetter />
    </>
  );
}