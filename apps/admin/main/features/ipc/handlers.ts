import { ipcMain, app } from 'electron';

/**
 * IPC 处理功能模块 - IPC 处理器
 * 处理来自渲染进程的 IPC 调用
 */

/**
 * IPC 通道名称常量
 */
const IPC_CHANNELS = {
  /** 获取应用版本 */
  APP_GET_VERSION: 'app:getVersion',
  /** 获取平台信息 */
  APP_GET_PLATFORM: 'app:getPlatform',
} as const;

/**
 * 注册获取应用版本的 IPC 处理器
 */
function registerVersionHandler(): void {
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => {
    console.log('app.getVersion()', app.getVersion());
    return app.getVersion();
  });
}

/**
 * 注册获取平台信息的 IPC 处理器
 */
function registerPlatformHandler(): void {
  ipcMain.handle(IPC_CHANNELS.APP_GET_PLATFORM, () => {
    console.log('process.platform', process.platform);
    return process.platform;
  });
}

/**
 * 注册所有 IPC 处理器
 * 处理来自渲染进程的 IPC 调用
 */
export function registerIpcHandlers(): void {
  registerVersionHandler();
  registerPlatformHandler();
}
