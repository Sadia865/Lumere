import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const initialState = { items: [], loading: false, synced: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, synced: true, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ITEM': {
      if (!action.payload.product?._id) return state;
      const existing = state.items.findIndex(i => i.product._id === action.payload.product._id);
      if (existing >= 0) {
        const items = state.items.map((item, idx) =>
          idx === existing ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
        return { ...state, items };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.product._id !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.product._id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: 'SET_LOADING', payload: true });
      API.get('/cart')
        .then(({ data }) => {
          const validItems = (data.items || []).filter(i => i.product?._id);
          dispatch({ type: 'SET_CART', payload: validItems });
        })
        .catch(() => dispatch({ type: 'SET_LOADING', payload: false }));
    } else {
      try {
        const stored = localStorage.getItem('cart');
        dispatch({ type: 'SET_CART', payload: stored ? JSON.parse(stored) : [] });
      } catch {
        dispatch({ type: 'SET_CART', payload: [] });
      }
    }
  }, [isAuthenticated]);

  // Persist guest cart
  useEffect(() => {
    if (!isAuthenticated && state.synced) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated, state.synced]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    if (isAuthenticated) {
      try {
        await API.post('/cart', { productId: product._id, quantity });
      } catch { /* optimistic */ }
    }
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    if (isAuthenticated) {
      try { await API.delete(`/cart/${productId}`); } catch { /* ignore */ }
    }
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return; }
    dispatch({ type: 'UPDATE_QTY', payload: { id: productId, qty } });
    if (isAuthenticated) {
      try { await API.put(`/cart/${productId}`, { quantity: qty }); } catch { /* ignore */ }
    }
  }, [isAuthenticated, removeFromCart]);

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR' });
    if (isAuthenticated) {
      try { await API.delete('/cart'); } catch { /* ignore */ }
    } else {
      localStorage.removeItem('cart');
    }
  }, [isAuthenticated]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal  = state.items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      loading: state.loading,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartContext;