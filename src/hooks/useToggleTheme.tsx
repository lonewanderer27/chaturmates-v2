import { useState, useEffect, useCallback } from 'react';
import { Preferences } from '@capacitor/preferences';

export const useToggleTheme = (modeKey: string, className: string): [boolean, () => void] => {
  const [mode, setMode] = useState<boolean>(false);

  useEffect(() => {
    const checkMode = async () => {
      const storedMode = await Preferences.get({ key: modeKey });
      const isActive = storedMode?.value === 'true';
      setMode(isActive);
      document.documentElement.classList.toggle(className, isActive);
    };
    checkMode();
  }, [modeKey, className]);

  const toggleTheme = useCallback(() => {
    const newMode = !mode;
    setMode(newMode);
    document.documentElement.classList.toggle(className, newMode);
    Preferences.set({ key: modeKey, value: newMode ? 'true' : 'false' });
  }, [mode, modeKey, className]);

  return [mode, toggleTheme];
};
