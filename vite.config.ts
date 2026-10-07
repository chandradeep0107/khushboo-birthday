import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path makes it deploy seamlessly to GitHub Pages, Vercel, Netlify, etc.
  server: {
    port: 3000,
    open: true
  }
})
