import { Menu } from 'electron';
import type { BrowserWindow } from 'electron';
import { getMenuTemplate } from './menuTemplate';

/**
 * 菜单功能模块 - 菜单构建器
 * 负责根据模板构建和设置应用菜单
 */

/**
 * 设置应用菜单栏
 * 提供三种方式：完全隐藏、空菜单、自定义菜单
 * @param _mainWindow - 主窗口实例（当前未使用，保留用于将来可能的功能，如隐藏菜单栏）
 */
export function setMenuBar(_mainWindow: BrowserWindow): void {
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
  buildAndSetCustomMenu();
}

/**
 * 构建并设置自定义菜单
 * 从模板创建菜单并应用到应用
 */
function buildAndSetCustomMenu(): void {
  const template = getMenuTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

