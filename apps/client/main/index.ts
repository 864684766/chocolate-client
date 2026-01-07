import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 客户端应用主进程入口文件
 * 负责创建和管理Electron窗口，处理系统级操作
 */

// 应用名称常量
const APP_NAME = 'Chocolate Client';
// 开发模式标识
const IS_DEV = process.env.NODE_ENV === 'development' || !app.isPackaged;

/**
 * 获取开发服务器端口
 * 优先级：环境变量 > .vite-port 文件 > 默认值
 * @returns {string} 开发服务器端口号
 */
function getDevPort(): string {
  // 1. 优先使用环境变量
  if (process.env.VITE_DEV_PORT) {
    return process.env.VITE_DEV_PORT;
  }

  // 2. 尝试从 .vite-port 文件读取（Vite 插件写入的实际端口）
  const portFile = path.join(__dirname, '../.vite-port');
  if (fs.existsSync(portFile)) {
    try {
      const port = fs.readFileSync(portFile, 'utf-8').trim();
      if (port) {
        return port;
      }
    } catch (error) {
      console.warn(`Failed to read port file: ${error}`);
    }
  }

  // 3. 使用默认端口
  return '5173';
}

// 开发服务器端口
const DEV_PORT = getDevPort();

/**
 * 创建主窗口
 * @returns {BrowserWindow} 创建的浏览器窗口实例
 */
function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
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
    mainWindow.loadURL(`http://localhost:${DEV_PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 设置菜单栏
  setMenuBar(mainWindow);

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
 * 设置菜单栏
 * 提供三种方式：完全隐藏、空菜单、自定义菜单
 * @param _mainWindow - 主窗口实例（当前未使用，保留用于将来可能的功能，如隐藏菜单栏）
 */
function setMenuBar(_mainWindow: BrowserWindow): void {
  // 方式 1：完全隐藏菜单栏（Windows/Linux）
  // 在 Windows 和 Linux 上完全隐藏菜单栏
  // 注意：在 macOS 上，即使隐藏菜单栏，应用菜单仍会显示在系统菜单栏
  // 如果需要隐藏菜单栏，取消下面的注释
  // if (process.platform !== 'darwin') {
  //   mainWindow.setMenuBarVisibility(false);
  // }

  // 方式 2：设置空菜单（完全移除默认菜单）
  // 这会移除所有默认菜单项，包括 File、Edit、View 等
  // 取消下面的注释以启用
  // Menu.setApplicationMenu(null);

  // 方式 3：自定义菜单（推荐：保留必要的系统功能）
  // 创建一个最小化的自定义菜单，只保留必要的功能
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '重新加载' },
        { role: 'forceReload', label: '强制重新加载' },
        { role: 'toggleDevTools', label: '切换开发者工具' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '切换全屏' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            // 可以在这里显示关于对话框
            console.log('关于应用');
          },
        },
      ],
    },
  ];

  // macOS 特殊处理：添加应用菜单
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: '关于' },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: '隐藏' },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '显示全部' },
        { type: 'separator' },
        { role: 'quit', label: '退出' },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
