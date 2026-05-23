import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    num: '01',
    name: 'Clinically <em>Proven</em>',
    desc: 'Every formula is independently tested in double-blind clinical trials. Results are published — never cherry-picked.',
  },
  {
    num: '02',
    name: '<em>Botanical</em> Intelligence',
    desc: 'We source over 40 rare botanicals directly from certified organic farms across 18 countries. Traceability guaranteed.',
  },
  {
    num: '03',
    name: 'Zero <em>Compromise</em>',
    desc: 'No parabens, sulphates, silicones, synthetic fragrances or microplastics. Ever. Our formulation list is public.',
  },
  {
    num: '04',
    name: 'Microbiome <em>Safe</em>',
    desc: 'Tested for microbiome compatibility by certified dermatologists. Strengthens, never strips.',
  },
  {
    num: '05',
    name: '<em>Circular</em> Packaging',
    desc: 'All packaging is refillable, recyclable or compostable. Our carbon offset programme is fully third-party verified.',
  },
  {
    num: '06',
    name: 'Skin-<em>First</em> Science',
    desc: 'Our in-house biotech lab develops patented delivery systems that carry actives exactly where they need to work.',
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features-header reveal">
          <span className="section-label">Why Lumière</span>
          <h2 className="section-heading">
            The standard we <em>set ourselves</em>
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className={`feature-item reveal reveal-delay-${(i % 4) + 1}`}
            >
              <span className="feature-num" aria-hidden="true">{f.num}</span>
              <h3
                className="feature-name"
                dangerouslySetInnerHTML={{ __html: f.name }}
              />
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}