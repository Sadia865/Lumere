import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('/api/contact', formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: 'var(--space-2xl) 0 var(--space-xl)',
        background: 'var(--cream)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-label" style={{ justifyContent: 'center' }}>
            Get in Touch
          </span>
          <h1 className="section-heading" style={{ marginBottom: 'var(--space-md)' }}>
            We'd Love to <em>Hear</em> from You
          </h1>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            lineHeight: '1.8',
            color: 'var(--warm-gray)',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: 300
          }}>
            Have a question about our products? Want to share feedback? Our team is here 
            to help you on your skincare journey.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--linen)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-xl)',
            alignItems: 'start'
          }}>
            
            {/* Contact Form */}
            <div style={{
              gridColumn: window.innerWidth >= 900 ? '1 / span 2' : '1',
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 900 ? '1fr 1fr' : '1fr',
              gap: 'var(--space-lg)'
            }}>
              
              {/* Form */}
              <div style={{
                background: 'var(--cream)',
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(123, 143, 114, 0.1)'
              }}>
                <h2 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  marginBottom: 'var(--space-md)',
                  color: 'var(--charcoal)'
                }}>
                  Send us a <em style={{ color: 'var(--sage-dark)' }}>Message</em>
                </h2>

                {status.message && (
                  <div style={{
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-md)',
                    background: status.type === 'success' 
                      ? 'rgba(123, 143, 114, 0.1)' 
                      : 'rgba(196, 169, 107, 0.1)',
                    color: status.type === 'success' 
                      ? 'var(--sage-dark)' 
                      : 'var(--gold)',
                    fontSize: 'clamp(0.82rem, 1vw, 0.88rem)'
                  }}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'clamp(0.75rem, 0.95vw, 0.82rem)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--sage)',
                      marginBottom: 'var(--space-xs)',
                      fontWeight: 400
                    }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="newsletter-input"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'clamp(0.75rem, 0.95vw, 0.82rem)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--sage)',
                      marginBottom: 'var(--space-xs)',
                      fontWeight: 400
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="newsletter-input"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'clamp(0.75rem, 0.95vw, 0.82rem)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--sage)',
                      marginBottom: 'var(--space-xs)',
                      fontWeight: 400
                    }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="newsletter-input"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{
                      display: 'block',
                      fontSize: 'clamp(0.75rem, 0.95vw, 0.82rem)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--sage)',
                      marginBottom: 'var(--space-xs)',
                      fontWeight: 400
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="newsletter-input"
                      placeholder="Tell us more about your inquiry..."
                      style={{ resize: 'vertical', minHeight: '150px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <div style={{
                  background: 'var(--sage-dark)',
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-md)'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
                    color: 'var(--cream)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    Contact <em style={{ color: 'var(--sage-light)' }}>Information</em>
                  </h3>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <div style={{
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--sage-light)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Email
                    </div>
                    <a 
                      href="mailto:hello@lumiere.com"
                      style={{
                        fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                        color: 'var(--cream)',
                        fontWeight: 300
                      }}
                    >
                      hello@lumiere.com
                    </a>
                  </div>

                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <div style={{
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--sage-light)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Phone
                    </div>
                    <a 
                      href="tel:+1234567890"
                      style={{
                        fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                        color: 'var(--cream)',
                        fontWeight: 300
                      }}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.78rem)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--sage-light)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Address
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                      color: 'var(--cream)',
                      lineHeight: '1.6',
                      fontWeight: 300
                    }}>
                      123 Botanical Avenue<br />
                      Los Angeles, CA 90012<br />
                      United States
                    </p>
                  </div>
                </div>

                <div style={{
                  background: 'var(--cream)',
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(123, 143, 114, 0.1)'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    Business Hours
                  </h3>
                  <div style={{
                    fontSize: 'clamp(0.85rem, 1.1vw, 0.92rem)',
                    lineHeight: '1.8',
                    color: 'var(--warm-gray)',
                    fontWeight: 300
                  }}>
                    <div style={{ marginBottom: 'var(--space-xs)' }}>
                      <strong style={{ color: 'var(--charcoal)', fontWeight: 400 }}>
                        Monday - Friday:
                      </strong> 9:00 AM - 6:00 PM PST
                    </div>
                    <div style={{ marginBottom: 'var(--space-xs)' }}>
                      <strong style={{ color: 'var(--charcoal)', fontWeight: 400 }}>
                        Saturday:
                      </strong> 10:00 AM - 4:00 PM PST
                    </div>
                    <div>
                      <strong style={{ color: 'var(--charcoal)', fontWeight: 400 }}>
                        Sunday:
                      </strong> Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section style={{
        padding: 'var(--space-lg) 0',
        background: 'var(--cream-dark)'
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            textAlign: 'center',
            marginBottom: 'var(--space-lg)',
            color: 'var(--charcoal)'
          }}>
            Quick <em style={{ color: 'var(--sage-dark)' }}>Answers</em>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-md)'
          }}>
            {[
              {
                q: 'Shipping & Delivery',
                a: 'Free shipping on orders over $50. Standard delivery takes 3-5 business days.'
              },
              {
                q: 'Returns & Exchanges',
                a: '30-day return policy. Products must be unused and in original packaging.'
              },
              {
                q: 'Product Questions',
                a: 'Not sure which product is right for you? Our skincare quiz can help!'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'var(--linen)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(123, 143, 114, 0.1)'
              }}>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  marginBottom: 'var(--space-xs)',
                  color: 'var(--charcoal)'
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.82rem, 1vw, 0.88rem)',
                  lineHeight: '1.6',
                  color: 'var(--warm-gray)',
                  fontWeight: 300
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}