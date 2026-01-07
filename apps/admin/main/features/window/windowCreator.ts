import { BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { app } from 'electron';
import {
  APP_NAME,
  WINDOW_SIZE,
  PATH_CONFIG,
  DEV_URL_TEMPLATE,
  ENV_KEYS,
  ENV_VALUES,
} from './windowConfig';
import { getDevPort } from './devPortReader';
import { setMenuBar } from '../menu';
import { createWebPreferences } from './webPreferences';

/**
 * 窗口管理功能模块 - 窗口创建器
 * 负责创建和配置 Electron 浏览器窗口
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 判断是否为开发模式
 * @returns {boolean} 是否为开发模式
 */
function isDevelopmentMode(): boolean {
  return (
    process.env[ENV_KEYS.NODE_ENV] === ENV_VALUES.DEVELOPMENT ||
    !app.isPackaged
  );
}

/**
 * 加载开发模式 URL
 * @param mainWindow - 浏览器窗口实例
 */
function loadDevUrl(mainWindow: BrowserWindow): void {
  const port = getDevPort();
  const devUrl = `${DEV_URL_TEMPLATE}:${port}`;
  mainWindow.loadURL(devUrl);
  // mainWindow.webContents.openDevTools();
}

/**
 * 加载生产模式文件
 * @param mainWindow - 浏览器窗口实例
 */
function loadProdFile(mainWindow: BrowserWindow): void {
  const htmlPath = path.join(__dirname, PATH_CONFIG.PROD_HTML);
  mainWindow.loadFile(htmlPath);
}

/**
 * 加载窗口内容
 * 根据运行模式（开发/生产）加载不同的内容
 * @param mainWindow - 浏览器窗口实例
 */
function loadWindowContent(mainWindow: BrowserWindow): void {
  if (isDevelopmentMode()) {
    loadDevUrl(mainWindow);
  } else {
    loadProdFile(mainWindow);
  }
}

/**
 * 创建主窗口
 * @returns {BrowserWindow} 创建的浏览器窗口实例
 */
export function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.WIDTH,
    height: WINDOW_SIZE.HEIGHT,
    minWidth: WINDOW_SIZE.MIN_WIDTH,
    minHeight: WINDOW_SIZE.MIN_HEIGHT,
    title: APP_NAME,
    webPreferences: createWebPreferences(),
  });

  loadWindowContent(mainWindow);
  setMenuBar(mainWindow);

  return mainWindow;
}

