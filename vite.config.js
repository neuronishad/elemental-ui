import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.js'),
            },
            output: {
                entryFileNames: 'elemental-ui.min.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: 'elemental-ui.css'
            },
        },
        outDir: 'dist', // Output directory for production builds
        emptyOutDir: true, // Clean the output directory before building
        cssCodeSplit: false, // Combine CSS into a single file
    },
});

