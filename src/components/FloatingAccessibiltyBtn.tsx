import React, { useRef, useState, useEffect } from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { add, colorPalette, globe } from 'ionicons/icons';

const FloatingAccessibiltyBtn: React.FC = () => {
  const fabRef = useRef<HTMLIonFabElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: window.innerHeight - 120, left: window.innerWidth - 60 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setStartPos({
      x: event.clientX - position.left,
      y: event.clientY - position.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      let newTop = mousePos.y - startPos.y;
      let newLeft = mousePos.x - startPos.x;

      // Constrain within the window boundaries
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - 60));
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 60));

      setPosition({
        top: newTop,
        left: newLeft,
      });
    }
  }, [mousePos, startPos, isDragging]);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prevPosition) => {
        const newTop = Math.min(prevPosition.top, window.innerHeight - 60);
        const newLeft = Math.min(prevPosition.left, window.innerWidth - 60);
        return { top: newTop, left: newLeft };
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <IonFab
      ref={fabRef}
      style={{ top: position.top, left: position.left, position: 'fixed' }}
      vertical="bottom"
      horizontal="end"
      onMouseDown={handleMouseDown}
    >
      <IonFabButton>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton id="open-modal">
          <IonIcon icon={colorPalette}></IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={globe}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default FloatingAccessibiltyBtn;
