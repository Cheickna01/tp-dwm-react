import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour détecter quand un élément devient visible dans le viewport
 * @param {Object} options - Options pour l'IntersectionObserver
 * @param {boolean} options.enabled - Est-ce que l'observer est actif
 * @param {number} options.threshold - Seuil de visibilité de l'élément (0 à 1)
 * @param {string} options.rootMargin - Marge autour de la racine
 * @returns {[React.RefObject, boolean]} Référence à attacher à l'élément et état d'intersection
 */
function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px'
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);

    return [targetRef, isIntersecting];

}

export default useIntersectionObserver;