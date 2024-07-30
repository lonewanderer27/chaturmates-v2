import { useEffect, useRef } from 'react';

const useDraggableFab = () => {
  const fabRef = useRef<HTMLIonFabElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const initialTop = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const handleDragStart = (clientY: number) => {
      isDragging.current = true;
      startY.current = clientY;
      initialTop.current = fabRef.current?.getBoundingClientRect().top || 0;
      if (fabRef.current) {
        fabRef.current.style.opacity = '1';
      }
    };

    const handleDragMove = (clientY: number) => {
      if (!isDragging.current) return;

      const deltaY = clientY - startY.current;
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
        }
      });
    };

    const handleDragEnd = () => {
      isDragging.current = false;
      if (fabRef.current) {
        fabRef.current.style.opacity = '0.4';
      }
    };

    const handleTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientY);
    const handleMouseDown = (e: MouseEvent) => handleDragStart(e.clientY);
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientY);
    const handleMouseUp = () => handleDragEnd();

    const fabElement = fabRef.current;

    if (fabElement) {
      fabElement.addEventListener('touchstart', handleTouchStart);
      fabElement.addEventListener('touchmove', handleTouchMove);
      fabElement.addEventListener('touchend', handleDragEnd);
      fabElement.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (fabElement) {
        fabElement.removeEventListener('touchstart', handleTouchStart);
        fabElement.removeEventListener('touchmove', handleTouchMove);
        fabElement.removeEventListener('touchend', handleDragEnd);
        fabElement.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { fabRef };
};

export default useDraggableFab;
