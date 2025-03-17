import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import {defineConfig} from 'vite'
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    base: '/',
    plugins: [vue(), nodePolyfills()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        sourcemap: false
    }
})