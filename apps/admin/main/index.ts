import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 管理端应用主进程入口文件
 * 负责创建和管理Electron窗口，处理系统级操作
 */

// 应用名称常量
const APP_NAME = 'Chocolate Admin';
// 开发模式标识
const IS_DEV = process.env.NODE_ENV === 'development' || !app.isPackaged;

/**
 * 创建主窗口
 * @returns {BrowserWindow} 创建的浏览器窗口实例
 */
function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: APP_NAME,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
    },
  });

  // 开发模式下加载Vite开发服务器，生产模式下加载本地文件
  if (IS_DEV) {
    mainWindow.loadURL('http://localhost:5174');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  return mainWindow;
}

/**
 * 应用准备就绪时的处理函数
 */
function onAppReady(): void {
  createWindow();
}

/**
 * 所有窗口关闭时的处理函数（macOS特殊处理）
 */
function onWindowAllClosed(): void {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

/**
 * 应用激活时的处理函数（macOS特殊处理）
 */
function onActivate(): void {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

/**
 * 注册 IPC 处理器
 * 处理来自渲染进程的 IPC 调用
 */
function registerIpcHandlers(): void {
  // 获取应用版本
  ipcMain.handle('app:getVersion', () => {
    return app.getVersion();
  });

  // 获取平台信息
  ipcMain.handle('app:getPlatform', () => {
    return process.platform;
  });
}

// 应用事件监听
app.whenReady().then(() => {
  registerIpcHandlers();
  onAppReady();
});
app.on('window-all-closed', onWindowAllClosed);
app.on('activate', onActivate);

