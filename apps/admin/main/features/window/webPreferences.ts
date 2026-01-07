import path from 'path';
import { fileURLToPath } from 'url';
import type { WebPreferences } from 'electron';
import { PATH_CONFIG } from './windowConfig';

/**
 * 窗口管理功能模块 - Web 偏好设置
 * 负责创建窗口的 Web 偏好设置配置
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 获取 Preload 脚本路径
 * @returns {string} Preload 脚本的完整路径
 */
function getPreloadPath(): string {
  return path.join(__dirname, PATH_CONFIG.PRELOAD_SCRIPT);
}

/**
 * 创建 Web 偏好设置对象
 * 配置窗口的安全和行为设置
 * @returns {WebPreferences} Web 偏好设置对象
 */
export function createWebPreferences(): WebPreferences {
  const preloadPath = getPreloadPath();

  return {
    // Preload 脚本路径：在网页加载前运行的脚本
    // 用于通过 contextBridge 安全地暴露 API 给渲染进程
    preload: preloadPath,
    // 上下文隔离：将 preload 脚本的上下文与网页的上下文隔离
    contextIsolation: true,
    // 沙箱模式：限制渲染进程的能力，无法直接访问 Node.js API
    sandbox: true,
    // 禁用 Node.js 集成：渲染进程不能使用 require、process 等 Node.js API
    nodeIntegration: false,
    // 启用 Web 安全策略：启用浏览器的同源策略（CORS）、内容安全策略（CSP）等
    webSecurity: true,
  };
}

