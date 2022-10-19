import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePlugin as TSCheckerPlugin } from 'vite-esbuild-typescript-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        TSCheckerPlugin(),
    ],
});
