import { app, BrowserWindow } from 'electron';
import { createWindow } from './features/window';
import { registerIpcHandlers } from './features/ipc';

/**
 * 管理端应用主进程入口文件
 * 负责应用生命周期管理和功能模块组装
 */

/**
 * 应用准备就绪时的处理函数
 * 注册 IPC 处理器并创建主窗口
 */
function onAppReady(): void {
  registerIpcHandlers();
  createWindow();
}

/**
 * 所有窗口关闭时的处理函数（macOS特殊处理）
 * 在 Windows 和 Linux 上退出应用，在 macOS 上保持应用运行
 */
function onWindowAllClosed(): void {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

/**
 * 应用激活时的处理函数（macOS特殊处理）
 * 当应用被激活且没有窗口时，创建新窗口
 */
function onActivate(): void {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

// 应用事件监听
app.whenReady().then(() => {
  onAppReady();
});
app.on('window-all-closed', onWindowAllClosed);
app.on('activate', onActivate);
