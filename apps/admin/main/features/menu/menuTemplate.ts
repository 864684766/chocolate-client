import { app } from 'electron';
import type { MenuItemConstructorOptions } from 'electron';

/**
 * 菜单功能模块 - 菜单模板定义
 * 定义应用菜单的结构和配置
 */

/**
 * 菜单项标签常量
 */
const MENU_LABELS = {
  FILE: '文件',
  EDIT: '编辑',
  VIEW: '视图',
  HELP: '帮助',
  EXIT: '退出',
  ABOUT: '关于',
  UNDO: '撤销',
  REDO: '重做',
  CUT: '剪切',
  COPY: '复制',
  PASTE: '粘贴',
  RELOAD: '重新加载',
  FORCE_RELOAD: '强制重新加载',
  TOGGLE_DEV_TOOLS: '切换开发者工具',
  RESET_ZOOM: '实际大小',
  ZOOM_IN: '放大',
  ZOOM_OUT: '缩小',
  TOGGLE_FULLSCREEN: '切换全屏',
  SERVICES: '服务',
  HIDE: '隐藏',
  HIDE_OTHERS: '隐藏其他',
  UNHIDE: '显示全部',
  QUIT: '退出',
} as const;

/**
 * 快捷键常量
 */
const ACCELERATORS = {
  QUIT_MAC: 'Cmd+Q',
  QUIT_WIN_LINUX: 'Ctrl+Q',
} as const;

/**
 * 创建基础菜单模板
 * @returns {MenuItemConstructorOptions[]} 菜单模板数组
 */
function createBaseMenuTemplate(): MenuItemConstructorOptions[] {
  return [createFileMenu(), createEditMenu(), createViewMenu(), createHelpMenu()];
}

/**
 * 创建文件菜单
 * @returns {MenuItemConstructorOptions} 文件菜单配置
 */
function createFileMenu(): MenuItemConstructorOptions {
  const quitAccelerator =
    process.platform === 'darwin' ? ACCELERATORS.QUIT_MAC : ACCELERATORS.QUIT_WIN_LINUX;

  return {
    label: MENU_LABELS.FILE,
    submenu: [
      {
        label: MENU_LABELS.EXIT,
        accelerator: quitAccelerator,
        click: () => {
          app.quit();
        },
      },
    ],
  };
}

/**
 * 创建编辑菜单
 * @returns {MenuItemConstructorOptions} 编辑菜单配置
 */
function createEditMenu(): MenuItemConstructorOptions {
  return {
    label: MENU_LABELS.EDIT,
    submenu: [
      { role: 'undo', label: MENU_LABELS.UNDO },
      { role: 'redo', label: MENU_LABELS.REDO },
      { type: 'separator' },
      { role: 'cut', label: MENU_LABELS.CUT },
      { role: 'copy', label: MENU_LABELS.COPY },
      { role: 'paste', label: MENU_LABELS.PASTE },
    ],
  };
}

/**
 * 创建视图菜单
 * @returns {MenuItemConstructorOptions} 视图菜单配置
 */
function createViewMenu(): MenuItemConstructorOptions {
  return {
    label: MENU_LABELS.VIEW,
    submenu: [
      { role: 'reload', label: MENU_LABELS.RELOAD },
      { role: 'forceReload', label: MENU_LABELS.FORCE_RELOAD },
      { role: 'toggleDevTools', label: MENU_LABELS.TOGGLE_DEV_TOOLS },
      { type: 'separator' },
      { role: 'resetZoom', label: MENU_LABELS.RESET_ZOOM },
      { role: 'zoomIn', label: MENU_LABELS.ZOOM_IN },
      { role: 'zoomOut', label: MENU_LABELS.ZOOM_OUT },
      { type: 'separator' },
      { role: 'togglefullscreen', label: MENU_LABELS.TOGGLE_FULLSCREEN },
    ],
  };
}

/**
 * 创建帮助菜单
 * @returns {MenuItemConstructorOptions} 帮助菜单配置
 */
function createHelpMenu(): MenuItemConstructorOptions {
  return {
    label: MENU_LABELS.HELP,
    submenu: [
      {
        label: MENU_LABELS.ABOUT,
        click: () => {
          // 可以在这里显示关于对话框
          console.log('关于应用');
        },
      },
    ],
  };
}

/**
 * 创建 macOS 应用菜单
 * @returns {MenuItemConstructorOptions} macOS 应用菜单配置
 */
function createMacAppMenu(): MenuItemConstructorOptions {
  return {
    label: app.getName(),
    submenu: [
      { role: 'about', label: MENU_LABELS.ABOUT },
      { type: 'separator' },
      { role: 'services', label: MENU_LABELS.SERVICES },
      { type: 'separator' },
      { role: 'hide', label: MENU_LABELS.HIDE },
      { role: 'hideOthers', label: MENU_LABELS.HIDE_OTHERS },
      { role: 'unhide', label: MENU_LABELS.UNHIDE },
      { type: 'separator' },
      { role: 'quit', label: MENU_LABELS.QUIT },
    ],
  };
}

/**
 * 获取完整的菜单模板
 * 根据平台自动添加相应的菜单项
 * @returns {MenuItemConstructorOptions[]} 完整的菜单模板数组
 */
export function getMenuTemplate(): MenuItemConstructorOptions[] {
  const template = createBaseMenuTemplate();

  // macOS 特殊处理：添加应用菜单
  if (process.platform === 'darwin') {
    template.unshift(createMacAppMenu());
  }

  return template;
}
