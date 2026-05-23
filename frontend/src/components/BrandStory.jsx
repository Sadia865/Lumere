import { Link } from 'react-router-dom';
import serum1 from '../assets/serum1.png';
import soothingcream from '../assets/soothingcream.png';

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-inner">

          {/* ── Images ── */}
          <div className="brand-img-wrap reveal">
            <div className="brand-img-main">
              <img src={serum1} alt="Botanical ingredient sourcing" />
            </div>
            <div className="brand-img-accent">
              <img src={soothingcream} alt="Lumière laboratory" />
            </div>
          </div>

          {/* ── Text ── */}
          <div className="brand-text-wrap reveal reveal-delay-2">
            <span className="section-label">Our Philosophy</span>
            <span className="brand-large-num" aria-hidden="true">12</span>
            <h2 className="section-heading">
              Twelve years of <em>botanical</em> mastery
            </h2>

            <p className="brand-body">
              Born from a belief that skin responds best to nature working in harmony
              with science. Every Lumière formula begins with a single botanical question:
              what does this plant do better than any synthetic? Then we amplify that
              intelligence with the most precise clinical actives available.
              <br /><br />
              No fillers, no fragrance, no compromise. Just the cleanest, most effective
              skincare we know how to make.
            </p>

            <Link to="/about" className="btn-primary">Read Our Story</Link>

            <div className="brand-stats">
              {[
                { val: '98%',  label: 'Natural Origin'  },
                { val: '40+',  label: 'Active Botanicals' },
                { val: '12yr', label: 'R&D Heritage'    },
              ].map(({ val, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-val">{val}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}