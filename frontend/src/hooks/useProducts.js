import { useState, useEffect, useCallback, useRef } from 'react';
import API from '../api/axios';

export default function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [total,    setTotal]    = useState(0);
  const [pages,    setPages]    = useState(1);

  // ✅ use ref so params changes always trigger fresh fetch
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const fetchProducts = useCallback(async (overrides = {}) => {
    setLoading(true);
    setError(null);
    try {
      const merged = { ...paramsRef.current, ...overrides };
      // remove undefined/null/empty values
      Object.keys(merged).forEach(k => {
        if (merged[k] === undefined || merged[k] === null || merged[k] === '') delete merged[k];
      });
      const query = new URLSearchParams(merged).toString();
      const { data } = await API.get(`/products${query ? `?${query}` : ''}`);
      setProducts(data.products || []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []); // stable reference

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, total, pages, refetch: fetchProducts };
}