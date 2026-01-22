import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Vital for IPFS relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
