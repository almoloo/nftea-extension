import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: [
						'public/manifest.json',
						'public/favicon48.png',
						'public/favicon96.png',
						'public/favicon128.png',
						'public/favicon192.png',
						'public/favicon512.png',
					],
					dest: '.',
				},
			],
		}),
	],
	build: {
		outDir: 'build',
		rollupOptions: {
			input: {
				main: './index.html',
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
