import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/wildfire-classifier/',
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react(), tailwindcss()],
});
