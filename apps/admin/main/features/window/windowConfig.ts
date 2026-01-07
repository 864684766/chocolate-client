/**
 * 窗口管理功能模块 - 窗口配置常量
 * 定义窗口的尺寸、标题等配置常量
 */

/**
 * 应用名称常量
 */
export const APP_NAME = 'Chocolate Admin';

/**
 * 窗口尺寸配置
 */
export const WINDOW_SIZE = {
  /** 窗口初始宽度（像素） */
  WIDTH: 1400,
  /** 窗口初始高度（像素） */
  HEIGHT: 900,
  /** 窗口最小宽度（像素），用户无法将窗口缩小到小于此值 */
  MIN_WIDTH: 1000,
  /** 窗口最小高度（像素），用户无法将窗口缩小到小于此值 */
  MIN_HEIGHT: 700,
} as const;

/**
 * 开发服务器配置
 */
export const DEV_SERVER_CONFIG = {
  /** 默认开发服务器端口 */
  DEFAULT_PORT: '5174',
  /** 端口文件路径（相对于主进程目录） */
  PORT_FILE_PATH: '../.vite-port',
} as const;

/**
 * 环境变量键名
 */
export const ENV_KEYS = {
  /** 开发服务器端口环境变量 */
  VITE_DEV_PORT: 'VITE_DEV_PORT',
  /** Node 环境变量 */
  NODE_ENV: 'NODE_ENV',
} as const;

/**
 * 环境值常量
 */
export const ENV_VALUES = {
  /** 开发环境标识 */
  DEVELOPMENT: 'development',
} as const;

/**
 * 路径配置
 */
export const PATH_CONFIG = {
  /** Preload 脚本路径（相对于主进程目录） */
  PRELOAD_SCRIPT: '../preload/index.cjs',
  /** 生产环境 HTML 文件路径（相对于主进程目录） */
  PROD_HTML: '../dist/index.html',
} as const;

/**
 * 开发服务器 URL 模板
 */
export const DEV_URL_TEMPLATE = 'http://localhost';

