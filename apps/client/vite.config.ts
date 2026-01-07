import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { electronPortNotifier } from '../../packages/shared/src/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite配置文件 - 客户端应用
 * 配置React SWC插件和路径别名
 */
export default defineConfig({
  plugins: [
    react(),
    // 使用共享的 Electron 端口通知插件
    electronPortNotifier(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: Number.parseInt(process.env.VITE_DEV_PORT || '5173', 10),
    strictPort: false, // 允许自动分配端口，如果指定端口被占用
    // Vite 会在控制台输出实际使用的端口
  },
  clearScreen: false,
  envPrefix: ['VITE_', 'ELECTRON_'],
});
