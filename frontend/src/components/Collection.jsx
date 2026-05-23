import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ITEMS = [
  {
    _id: '1',
    name:  'Radiance Serum',
    price: 89,
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?w=600&auto=compress',
  },
  {
    _id: '2',
    name:  'Botanical Hydra Cream',
    price: 72,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=600&auto=compress',
  },
  {
    _id: '3',
    name:  'Purifying Clay Mask',
    price: 54,
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?w=600&auto=compress',
  },
  {
    _id: '4',
    name:  'Retinol Night Elixir',
    price: 98,
    image: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?w=600&auto=compress',
  },
  {
    _id: '5',
    name:  'SPF 50 Daytime Shield',
    price: 46,
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?w=600&auto=compress',
  },
  {
    _id: '6',
    name:  'Gentle Cleansing Balm',
    price: 38,
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?w=600&auto=compress',
  },
];

export default function Collection() {
  const trackRef = useRef(null);
  const STEP = 340;

  const slide = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * STEP, behavior: 'smooth' });
  };

  return (
    <section className="collection">
      <div className="collection-header reveal">
        <div>
          <span className="section-label">Full Collection</span>
          <h2 className="section-heading">Explore <em>every ritual</em></h2>
        </div>
        <div className="slider-nav">
          <button className="slider-btn" onClick={() => slide(-1)} aria-label="Previous">
            <span>←</span>
          </button>
          <button className="slider-btn" onClick={() => slide(1)} aria-label="Next">
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="collection-track-wrap">
        <div
          ref={trackRef}
          className="collection-track"
          style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
        >
          {ITEMS.map(item => (
            <div
              key={item._id}
              className="collection-item"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link to={`/products/${item._id}`}>
                <div className="collection-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?w=600&auto=compress';
                    }}
                  />
                </div>
              </Link>
              <Link to={`/products/${item._id}`} className="collection-name">{item.name}</Link>
              <p className="collection-price">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}