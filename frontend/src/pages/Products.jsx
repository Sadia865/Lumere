import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/productsData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API from '../api/axios';
import localProducts from '../data/productsData';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [category,    setCategory]    = useState(initialCategory);
  const [sort,        setSort]        = useState('default');
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const PER_PAGE = 8;

  useScrollAnimation([products]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort !== 'default')  params.set('sort', sort);
    if (search)              params.set('search', search);
    params.set('page', page);
    params.set('limit', PER_PAGE);

    API.get(`/products?${params}`)
      .then(({ data }) => {
        setProducts(data.products);
        setTotalPages(data.pages ?? 1);
      })
      .catch(() => {
        // fallback to local
        let p = [...localProducts];
        if (category !== 'all') p = p.filter(x => x.category === category);
        if (search) p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
        if (sort === 'price-asc')  p.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') p.sort((a, b) => b.price - a.price);
        if (sort === 'rating')     p.sort((a, b) => b.rating - a.rating);
        const start = (page - 1) * PER_PAGE;
        setTotalPages(Math.ceil(p.length / PER_PAGE));
        setProducts(p.slice(start, start + PER_PAGE));
      })
      .finally(() => setLoading(false));
  }, [category, sort, search, page]);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
    setSearchParams(cat !== 'all' ? { category: cat } : {});
  };

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '100vh' }}>
      <div className="container">
        {/* Page header */}
        <div style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>All Products</span>
          <h1 className="section-heading" style={{ textAlign: 'center' }}>
            The <em>complete</em> collection
          </h1>
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          {/* Category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleCategory(id)}
                style={{
                  padding: '7px 16px', borderRadius: 2,
                  fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: 'pointer', fontFamily: 'var(--body)', fontWeight: 400,
                  border: `1px solid ${category === id ? 'var(--charcoal)' : 'rgba(26,26,24,0.2)'}`,
                  background: category === id ? 'var(--charcoal)' : 'transparent',
                  color:      category === id ? '#fff' : 'var(--warm-gray)',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort & search */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="search" placeholder="Search…" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="newsletter-input"
              style={{ width: 200, padding: '8px 14px' }}
            />
            <select
              value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
              className="newsletter-input"
              style={{ width: 'auto', padding: '8px 14px', cursor: 'pointer' }}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--warm-gray)', fontStyle: 'italic' }}>
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--warm-gray)' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic', marginBottom: 12 }}>
              No products found
            </p>
            <button className="btn-outline" onClick={() => { setCategory('all'); setSearch(''); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="home-products-grid" style={{ marginBottom: 'var(--space-lg)' }}>
            {products.map((p, i) => (
              <div key={p._id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: 'var(--space-md) 0' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p} onClick={() => setPage(p)}
                style={{
                  width: 36, height: 36, borderRadius: 2,
                  border: `1px solid ${page === p ? 'var(--charcoal)' : 'rgba(26,26,24,0.2)'}`,
                  background: page === p ? 'var(--charcoal)' : 'transparent',
                  color: page === p ? '#fff' : 'var(--charcoal)',
                  cursor: 'pointer', fontFamily: 'var(--body)', fontSize: '0.85rem',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}