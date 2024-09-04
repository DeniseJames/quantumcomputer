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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'aws-amplify': ['@aws-amplify/ui-react', 'aws-amplify'],
          // Add more chunks as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit if needed
  },
  define: {
    'process.env': {},
    global: 'window',
  },
});
