import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lonewanderer27.chaturmeyts2',
  appName: 'Chat-Ur-Meyts',
  webDir: 'dist',
  server: {
    "allowNavigation": [
      "*"
    ]
  }
};

export default config;
