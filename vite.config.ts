import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      global: 'global',
      util: 'util/', // Add this line
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
});
