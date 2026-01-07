import type { Plugin } from 'vite';
import type { ViteDevServer } from 'vite';
import path from 'node:path';
import fs from 'fs';

/**
 * Electron 端口通知插件
 * 在 Vite 开发服务器启动时，将实际使用的端口写入 .vite-port 文件
 * 供 Electron 主进程和等待脚本使用
 *
 * @param options - 插件配置选项
 * @param options.portFile - 端口文件路径（可选，默认使用应用根目录的 .vite-port）
 * @returns Vite 插件实例
 */
export function electronPortNotifier(options?: { portFile?: string }): Plugin {
  return {
    name: 'electron-port-notifier',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();

        // 检查地址是否为对象类型（包含 port 属性）
        if (address && typeof address === 'object') {
          const port = address.port;

          // 确定端口文件路径
          // 如果提供了自定义路径，使用自定义路径
          // 否则使用 Vite 配置文件的目录（通常是应用根目录）
          const portFile = options?.portFile
            ? path.resolve(options.portFile)
            : path.join(server.config.root || process.cwd(), '.vite-port');

          try {
            // 写入端口号到文件
            fs.writeFileSync(portFile, port.toString());
            console.log(`✅ Vite server running on port ${port}`);
          } catch (error) {
            console.error(`❌ Failed to write port file: ${error}`);
          }
        }
      });
    },
  };
}
