# Change: 添加自定义 Electron 菜单

## Why

Electron 应用默认会显示系统菜单栏（File、Edit、View、Window、Help 等），这些默认菜单可能不符合应用的实际需求。为了提供更好的用户体验和更符合应用功能的菜单，需要支持自定义菜单功能。自定义菜单可以：

- 隐藏不需要的默认菜单项
- 添加应用特定的菜单项（如"设置"、"关于"等）
- 提供中文菜单支持
- 根据不同平台（Windows、macOS、Linux）提供合适的菜单体验

## What Changes

- **ADDED** 自定义菜单配置功能（支持完全隐藏、空菜单、自定义菜单三种方式）
- **ADDED** 菜单配置工具函数（`setMenuBar`），可在主进程中调用
- **ADDED** 平台特定的菜单处理（Windows/Linux 隐藏菜单栏，macOS 保留应用菜单）
- **ADDED** 自定义菜单模板（包含文件、编辑、视图、帮助等常用菜单项）
- **ADDED** 菜单项快捷键支持（如 Ctrl+Q 退出、Ctrl+R 刷新等）
- **ADDED** 菜单项角色支持（使用 Electron 内置角色，如 undo、redo、cut、copy、paste 等）

## Impact

- **Affected specs:** 新增 `electron-menu` capability
- **Affected code:**
  - 客户端应用主进程 (`apps/client/main/index.ts`)
  - 管理端应用主进程 (`apps/admin/main/index.ts`)
  - 两个应用都需要导入 `Menu` 模块并调用菜单配置函数
