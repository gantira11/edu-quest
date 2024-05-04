import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        skipWaiting: true,
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: 5000000000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            urlPattern: /https:\/\/phet\.colorado\.edu\/sims\/html\/circuit-construction-kit-dc\/latest\/circuit-construction-kit-dc_en\.html/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'iframe-cache',
              expiration: {
                // maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
            },
          },
          {
            urlPattern: /\**\/*/,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'all-cache',
              expiration: {
                // maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
            }
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*\.mp4/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'firebase-storage-mp4-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365 // Cache for 1 year
              },
            },
          }
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Edu Quest',
        short_name: 'Edu Quest',
        description: 'PWA for SHS',
        theme_color: '#DF3B3B',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './src/config'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
    }
  }
});
