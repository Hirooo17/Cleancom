import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),

VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'CleanCom',
        short_name: 'ShortName',
        description: 'General Community Reporting App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon/icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: '/icon/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })

  ],
   server: {
    proxy: {
      '/api': {
        target: 'https://cleancom-backend-production.up.railway.app/', // Your backend URL
        changeOrigin: true,
        secure: false
      }
    }
  }
})
