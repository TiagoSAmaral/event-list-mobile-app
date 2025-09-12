import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.event-list-mobile-app',
  appName: 'EventList',
  webDir: 'www',
  server: {
    cleartext: true, // permite HTTP sem HTTPS
  }
};

export default config;
