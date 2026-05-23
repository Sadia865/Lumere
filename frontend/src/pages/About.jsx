import { useEffect } from 'react';
import BrandStory from '../components/BrandStory';
import Features from '../components/Features';
import bannerSerum from '../assets/banner serum.png';
import girl from '../assets/girl.jpeg';
import women22 from '../assets/women22.png';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>

      {/* ── Hero Banner Section ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={bannerSerum}
          alt="Botanical Hydrate Drops"
          style={{
            width: '100%',
            height: 'clamp(320px, 45vw, 560px)',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(30,28,24,0.62) 0%, rgba(30,28,24,0.18) 60%, transparent 100%)',
        }} />
        {/* Text over banner */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(1.5rem, 6vw, 7rem)',
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '0.75rem',
            fontWeight: 500,
          }}>
            Our Story
          </span>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            color: '#fff',
            lineHeight: 1.18,
            marginBottom: '1.1rem',
            fontWeight: 400,
            maxWidth: '560px',
          }}>
            Where Nature Meets <em style={{ fontStyle: 'italic', color: 'var(--gold, #c9a96e)' }}>Science</em>
          </h1>
          <p style={{
            fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
            lineHeight: '1.8',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '480px',
            fontWeight: 300,
          }}>
            Founded in 2018 — luxury skincare rooted in botanical wisdom and clinical science.
          </p>
        </div>
      </section>

      {/* ── Intro Strip ─────────────────────────────────────────────────── */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--cream)',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
            lineHeight: '1.9',
            color: 'var(--warm-gray)',
            maxWidth: '820px',
            margin: '0 auto',
            fontWeight: 300,
          }}>
            Founded in 2018, Lumière emerged from a simple belief: skincare should be both
            luxurious and honest. We combine centuries-old botanical wisdom with cutting-edge
            dermatological research to create products that truly transform your skin.
          </p>
        </div>
      </section>

      {/* ── Mission Section (image + text side by side) ─────────────────── */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--linen)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
          }}>
            {/* Image side */}
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
            }}>
              <img
                src={girl}
                alt="Lumière mission"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Text side */}
            <div>
              <span className="section-label">What Drives Us</span>
              <h2 className="section-heading" style={{ marginBottom: 'var(--space-md)' }}>
                Our <em>Mission</em>
              </h2>
              <div style={{
                fontSize: 'clamp(0.92rem, 1.3vw, 1rem)',
                lineHeight: '1.9',
                color: 'var(--warm-gray)',
                fontWeight: 300,
              }}>
                <p style={{ marginBottom: 'var(--space-md)' }}>
                  At Lumière, we believe beautiful skin begins with understanding what goes into
                  your products. That's why we're committed to radical transparency — every
                  ingredient, every process, every choice is made with your skin's health as our
                  priority.
                </p>
                <p style={{ marginBottom: 'var(--space-md)' }}>
                  We source our botanicals from sustainable farms around the world, working
                  directly with growers who share our commitment to ethical practices and
                  environmental stewardship.
                </p>
                <p>
                  Our formulations are developed in partnership with leading dermatologists and
                  backed by clinical studies. We never test on animals, and we're continuously
                  working to reduce our environmental impact.
                </p>
              </div>

              {/* Stats row */}
              <div style={{
                display: 'flex',
                gap: 'var(--space-lg)',
                marginTop: 'var(--space-lg)',
                flexWrap: 'wrap',
              }}>
                {[
                  { num: '2018', label: 'Founded' },
                  { num: '34+', label: 'Products' },
                  { num: '100%', label: 'Cruelty-Free' },
                  { num: '50k+', label: 'Happy Customers' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                      color: 'var(--charcoal)',
                      fontWeight: 400,
                    }}>{s.num}</div>
                    <div style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--sage)',
                      fontWeight: 500,
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ──────────────────────────────────────────────── */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--cream-dark)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>What We Stand For</span>
            <h2 className="section-heading">
              Our <em>Values</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-md)',
          }}>
            {[
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c4-4 8-8 8-13A8 8 0 0 0 4 9c0 5 4 9 8 13z"/>
                    <path d="M12 22V10"/>
                    <path d="M8 14l4-4 4 4"/>
                  </svg>
                ),
                title: 'Clean Beauty',
                desc: 'Free from parabens, sulfates, phthalates, and over 1,800 other questionable ingredients. Our formulas are as clean as they are effective.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M12 7v5l4 2"/>
                  </svg>
                ),
                title: 'Sustainable',
                desc: "From recyclable packaging to carbon-neutral shipping, we're committed to minimizing our environmental footprint at every step.",
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
                title: 'Cruelty-Free',
                desc: 'We never test on animals and work exclusively with suppliers who share this commitment. Certified by Leaping Bunny.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
                  </svg>
                ),
                title: 'Science-Backed',
                desc: 'Every product is developed with dermatologists and backed by clinical studies. Beauty that works, proven by science.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                ),
                title: 'Transparent',
                desc: 'Full ingredient disclosure, clear sourcing information, and honest communication about what our products can and cannot do.',
              },
              {
                icon: (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: 'Inclusive',
                desc: 'Skincare for everyone, regardless of age, gender, or skin type. We believe beautiful skin is universal.',
              },
            ].map((value, idx) => (
              <div key={idx} style={{
                background: 'var(--linen)',
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(123,143,114,0.12)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(123,143,114,0.15) 0%, rgba(123,143,114,0.05) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--sage)',
                  marginBottom: 'var(--space-md)',
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                  color: 'var(--charcoal)',
                  marginBottom: 'var(--space-sm)',
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.92rem)',
                  lineHeight: '1.75',
                  color: 'var(--warm-gray)',
                  fontWeight: 300,
                }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story Component ────────────────────────────────────────── */}
      <BrandStory />

      {/* ── Features Component ───────────────────────────────────────────── */}
      <Features />

      {/* ── Team Section ─────────────────────────────────────────────────── */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--linen)',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="section-label" style={{ justifyContent: 'center' }}>The People Behind Lumière</span>
          <h2 className="section-heading" style={{ marginBottom: 'var(--space-md)' }}>
            Meet Our <em>Founders</em>
          </h2>
          <p style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
            lineHeight: '1.8',
            color: 'var(--warm-gray)',
            maxWidth: '700px',
            margin: '0 auto var(--space-lg)',
            fontWeight: 300,
          }}>
            Lumière was founded by Dr. Sarah Chen and Emma Rodriguez, two women who shared
            a vision of creating skincare that honored both tradition and innovation.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
            marginTop: 'var(--space-lg)',
          }}>
            {[
              {
                img: women22,
                name: 'Dr. Sarah Chen',
                role: 'Co-Founder & Chief Scientific Officer',
                bio: 'Board-certified dermatologist with 15 years of research in botanical compounds and their effects on skin health.',
              },
              {
                img: girl,
                name: 'Emma Rodriguez',
                role: 'Co-Founder & Creative Director',
                bio: 'Former beauty editor and sustainability advocate with a passion for ethical sourcing and clean formulations.',
              },
            ].map((person, idx) => (
              <div key={idx} style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                textAlign: 'left',
              }}>
                {/* Founder photo */}
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img
                    src={person.img}
                    alt={person.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                    marginBottom: 'var(--space-xs)',
                    color: 'var(--charcoal)',
                  }}>
                    {person.name}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.78rem)',
                    color: 'var(--sage)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-sm)',
                    fontWeight: 500,
                  }}>
                    {person.role}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.85rem, 1.1vw, 0.92rem)',
                    lineHeight: '1.75',
                    color: 'var(--warm-gray)',
                    fontWeight: 300,
                  }}>
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--space-2xl) 0',
        background: 'var(--charcoal)',
        textAlign: 'center',
      }}>
        <img
          src={bannerSerum}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.18,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'block',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '0.75rem',
          }}>
            Ready to Transform Your Skin?
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: '#fff',
            fontWeight: 400,
            marginBottom: 'var(--space-md)',
          }}>
            Discover the Lumière <em style={{ color: 'var(--gold, #c9a96e)' }}>Collection</em>
          </h2>
          <a href="/products" style={{
            display: 'inline-block',
            padding: '0.85rem 2.4rem',
            background: 'var(--gold, #c9a96e)',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '0.88rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Shop Now
          </a>
        </div>
      </section>

    </div>
  );
}