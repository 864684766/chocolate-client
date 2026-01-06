import { contextBridge, ipcRenderer } from 'electron';

/**
 * 客户端应用 preload 脚本
 * 使用 contextBridge 安全地暴露 IPC API 给渲染进程
 */

/**
 * IPC API 接口定义
 * 定义渲染进程可以调用的主进程方法
 */
interface ElectronAPI {
  // 示例：获取应用版本
  getVersion: () => Promise<string>;
  // 示例：平台信息
  getPlatform: () => Promise<NodeJS.Platform>;
}

/**
 * 验证参数是否为字符串类型
 * @param value - 待验证的值
 * @param paramName - 参数名称（用于错误信息）
 * @returns 是否为字符串
 */
function validateString(value: unknown, paramName: string): value is string {
  if (typeof value !== 'string') {
    throw new Error(`Invalid parameter: ${paramName} must be a string`);
  }
  return true;
}


/**
 * 安全的 IPC 调用封装
 * @param channel - IPC 通道名称
 * @param args - 传递给主进程的参数
 * @returns Promise，包含主进程返回的数据
 */
async function safeInvoke<T>(channel: string, ...args: unknown[]): Promise<T> {
  // 参数验证：确保 channel 是字符串
  validateString(channel, 'channel');
  
  // 调用主进程并返回结果
  return ipcRenderer.invoke(channel, ...args) as Promise<T>;
}

// 暴露给渲染进程的 API
const electronAPI: ElectronAPI = {
  getVersion: () => safeInvoke<string>('app:getVersion'),
  getPlatform: () => safeInvoke<NodeJS.Platform>('app:getPlatform'),
};

// 使用 contextBridge 安全地暴露 API
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// 类型声明，使 TypeScript 能够识别 window.electronAPI
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

