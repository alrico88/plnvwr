import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { VitePWA } from 'vite-plugin-pwa';
import ViteFonts from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'plnvwr - Flight plan viewer',
        short_name: 'plnvwr',
        description:
          'View Flight Simulator flight plans in the browser (.fpl files)',
        theme_color: '#00336E',
        background_color: '#effaf8',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Inter',
            styles: 'wght@400;600;700',
          },
          {
            name: 'Fira Mono',
            styles: 'wght@400;700',
          },
        ],
      },
    }),
  ],
});
