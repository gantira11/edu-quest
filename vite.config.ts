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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
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
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            urlPattern: /\**\/*/,
            handler: 'NetworkFirst', // or any other caching strategy you prefer
            method: 'GET',
            options: {
              cacheName: 'all-cache',
              expiration: {
                maxEntries: 100, // adjust as needed
                maxAgeSeconds: 60 * 60 * 24 * 90 // cache for 1 hour
              },
              cacheableResponse: {
                statuses: [200, 201] // Cache successful responses only
              }
            }
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/edu-quest-c471f\.appspot\.com\/o\/.*\?.*$/,
            handler: 'CacheFirst', // or any other caching strategy you prefer
            options: {
              cacheName: 'video-cache',
              expiration: {
                maxEntries: 100, // adjust as needed
                maxAgeSeconds: 60 * 60 * 24 * 90 // cache for 1 hour
              },
              cacheableResponse: {
                statuses: [200, 304] // Cache successful responses only
              }
            }
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
