import { useEffect, useRef } from 'react';

const useDraggableFab = () => {
  const fabRef = useRef<HTMLIonFabElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const initialTop = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDragging.current = true;
      startY.current = touch.clientY;
      initialTop.current = fabRef.current?.getBoundingClientRect().top || 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - startY.current;
      const newTop = initialTop.current + deltaY;
      const screenHeight = window.innerHeight;
      const maxTop = screenHeight * 0.85; 
      const minTop = screenHeight * 0.1;

      if (newTop < minTop) {
        currentY.current = minTop;
      } else if (newTop > maxTop) {
        currentY.current = maxTop;
      } else {
        currentY.current = newTop;
      }

      requestAnimationFrame(() => {
        if (fabRef.current) {
          fabRef.current.style.top = `${currentY.current}px`;
          fabRef.current.style.opacity = '1';
        }
      });
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const fabElement = fabRef.current;

    if (fabElement) {
      fabElement.addEventListener('touchstart', handleTouchStart);
      fabElement.addEventListener('touchmove', handleTouchMove);
      fabElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (fabElement) {
        fabElement.removeEventListener('touchstart', handleTouchStart);
        fabElement.removeEventListener('touchmove', handleTouchMove);
        fabElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return { fabRef };
};

export default useDraggableFab;
