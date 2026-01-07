import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { DEV_SERVER_CONFIG, ENV_KEYS } from './windowConfig';

/**
 * 窗口管理功能模块 - 开发端口读取器
 * 负责从不同来源读取开发服务器端口号
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 从环境变量读取端口
 * @returns {string | null} 端口号，如果不存在则返回 null
 */
function readPortFromEnv(): string | null {
  const port = process.env[ENV_KEYS.VITE_DEV_PORT];
  return port || null;
}

/**
 * 从端口文件读取端口
 * @returns {string | null} 端口号，如果读取失败则返回 null
 */
function readPortFromFile(): string | null {
  const portFile = path.join(__dirname, DEV_SERVER_CONFIG.PORT_FILE_PATH);

  if (!fs.existsSync(portFile)) {
    return null;
  }

  try {
    const port = fs.readFileSync(portFile, 'utf-8').trim();
    return port || null;
  } catch (error) {
    console.warn(`Failed to read port file: ${error}`);
    return null;
  }
}

/**
 * 获取开发服务器端口
 * 优先级：环境变量 > .vite-port 文件 > 默认值
 * @returns {string} 开发服务器端口号
 */
export function getDevPort(): string {
  // 1. 优先使用环境变量
  const envPort = readPortFromEnv();
  if (envPort) {
    return envPort;
  }

  // 2. 尝试从 .vite-port 文件读取（Vite 插件写入的实际端口）
  const filePort = readPortFromFile();
  if (filePort) {
    return filePort;
  }

  // 3. 使用默认端口
  return DEV_SERVER_CONFIG.DEFAULT_PORT;
}

