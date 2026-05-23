const REVIEWS = [
  {
    quote: 'The Radiance Serum genuinely changed my skin. Within 3 weeks my hyperpigmentation faded noticeably — something nothing else had managed in years.',
    author: 'Sophie M. — Verified Buyer',
    stars: 5,
  },
  {
    quote: 'I\'ve tried dozens of luxury skincare brands. Lumière is the first where I can actually see and feel the difference. The Botanical Hydra Cream is extraordinary.',
    author: 'Nadia K. — Verified Buyer',
    stars: 5,
  },
  {
    quote: 'Clean ingredients, honest marketing, real results. As a dermatologist I recommend Lumière to patients looking for premium yet gentle formulations.',
    author: 'Dr. Elena R. — Dermatologist',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-inner">
          {/* Left heading */}
          <div className="reveal">
            <span className="section-label">Testimonials</span>
            <h2 className="section-heading">
              Heard from our <em>community</em>
            </h2>
            <p style={{ marginTop: '1.5rem', color: 'var(--warm-gray)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
              Over 12,000 five-star reviews. Real people, real results — never incentivised.
            </p>
          </div>

          {/* Cards */}
          <div className="testimonials-cards">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                <div className="testimonial-stars" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <span key={s} className="star" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="testimonial-quote">"{r.quote}"</p>
                <span className="testimonial-author">{r.author}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}