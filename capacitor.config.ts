
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4327a57434df4a5d9df14d57c0ebaf57',
  appName: 'RentlyApp',
  webDir: 'dist',
  server: {
    url: 'https://4327a574-34df-4a5d-9df1-4d57c0ebaf57.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false,
      androidSpinnerStyle: "large",
      spinnerColor: "#FFFFFF",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
