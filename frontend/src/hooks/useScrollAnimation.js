import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to elements with class "reveal".
 * When they enter the viewport they get class "visible" (defined in CSS).
 */
export default function useScrollAnimation(deps = []) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}