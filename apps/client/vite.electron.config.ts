import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

/**
 * Vite Electron 构建配置 - 客户端应用
 * 用于构建 Electron 主进程和 preload 脚本
 */
export default defineConfig({
  build: {
    outDir: 'dist-electron',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'main/index.ts'),
        preload: resolve(__dirname, 'preload/index.ts'),
      },
      output: {
        entryFileNames: '[name]/index.cjs',
        format: 'cjs',
      },
      external: [
        'electron',
        'path',
        'url',
        'fs',
        'os',
        'crypto',
        'stream',
        'util',
        'events',
        'buffer',
        'process',
      ],
    },
  },
});
