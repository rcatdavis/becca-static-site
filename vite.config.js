import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works under any GitHub Pages subpath,
// e.g. https://github.internal.digitalocean.com/pages/rdavis/prototypes/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
