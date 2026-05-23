const ITEMS = [
  'Free shipping over $75',
  'Dermatologist tested',
  'Vegan & cruelty-free',
  '100% botanical actives',
  'Recyclable packaging',
  'Carbon neutral brand',
  'Free shipping over $75',
  'Dermatologist tested',
  'Vegan & cruelty-free',
  '100% botanical actives',
  'Recyclable packaging',
  'Carbon neutral brand',
];

export default function Ticker() {
  return (
    <div className="ticker" role="marquee" aria-label="Brand highlights">
      <div className="ticker-track">
        {ITEMS.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-dot" aria-hidden="true"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
}