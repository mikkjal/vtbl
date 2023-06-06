import { fileURLToPath, URL } from 'node:url';

import { resolve } from 'node:path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: './src/assets/table.css',
                    dest: 'css',
                    rename: 'style.css',
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, './src/vtbl.ts'),
            name: 'VTable',
            fileName: 'vtbl',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
