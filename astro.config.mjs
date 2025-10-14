import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://visualizedata.github.io',
  // Always use /archive base for GitHub Pages deployment
  base: '/archive',
  
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
})