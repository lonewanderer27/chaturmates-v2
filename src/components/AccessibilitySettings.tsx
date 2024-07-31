import React, { useRef } from 'react';
import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonToggle
} from '@ionic/react';
import { useToggleTheme } from '../hooks/useToggleTheme'; 

const AccessibilitySettings: React.FC = () => {
  const [darkMode, toggleDarkMode] = useToggleTheme('darkModeActivated', 'ion-palette-dark');
  const [highContrastMode, toggleHighContrastMode] = useToggleTheme('highContrastModeActivated', 'ion-palette-high-contrast');
  const [increaseFontMode, toggleFontMode] = useToggleTheme('increaseFontModeActivated', 'fontSize20');
  const modal = useRef<HTMLIonModalElement>(null);

  const dismiss = () => {
    modal.current?.dismiss();
  };

  return (
    <IonModal id="settings-modal" ref={modal} trigger="open-modal">
      <IonContent>
        <IonToolbar>
          <IonTitle>Accessibility</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => dismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonList>
          <IonItem>
            <IonToggle checked={darkMode} onIonChange={toggleDarkMode} justify="space-between">
              Dark Mode
            </IonToggle>
          </IonItem>

          <IonItem>
            <IonToggle mode="ios" checked={highContrastMode} onIonChange={toggleHighContrastMode} justify="space-between">
              High Contrast
            </IonToggle>
          </IonItem>

          <IonItem>
            <IonToggle checked={increaseFontMode} onIonChange={toggleFontMode} justify="space-between">
              Increase Font size (20%)
            </IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default AccessibilitySettings;
