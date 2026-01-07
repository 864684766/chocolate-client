# electron-menu Specification

## Purpose
TBD - created by archiving change add-custom-menu. Update Purpose after archive.
## Requirements
### Requirement: 自定义菜单配置

系统 SHALL 提供自定义 Electron 应用菜单的功能，支持三种配置方式：完全隐藏菜单栏、设置空菜单、自定义菜单。

#### Scenario: 完全隐藏菜单栏（Windows/Linux）

- **WHEN** 应用在 Windows 或 Linux 平台运行
- **AND** 调用 `setMenuBar(mainWindow)` 并启用方式 1
- **THEN** 菜单栏完全隐藏，不显示任何菜单项
- **AND** 在 macOS 平台上，即使隐藏菜单栏，应用菜单仍会显示在系统菜单栏

#### Scenario: 设置空菜单

- **WHEN** 应用调用 `Menu.setApplicationMenu(null)`
- **THEN** 所有默认菜单项被移除
- **AND** 应用不显示任何菜单栏

#### Scenario: 自定义菜单（推荐方式）

- **WHEN** 应用使用自定义菜单模板
- **THEN** 显示自定义的菜单项（文件、编辑、视图、帮助等）
- **AND** 菜单项支持中文标签
- **AND** 菜单项支持快捷键（如 Ctrl+Q 退出、Ctrl+R 刷新）
- **AND** 菜单项使用 Electron 内置角色（如 undo、redo、cut、copy、paste）

#### Scenario: 文件菜单功能

- **WHEN** 用户点击文件菜单
- **THEN** 显示"退出"菜单项
- **AND** 点击退出或使用快捷键（Ctrl+Q / Cmd+Q）时，应用退出

#### Scenario: 编辑菜单功能

- **WHEN** 用户点击编辑菜单
- **THEN** 显示撤销、重做、剪切、复制、粘贴等菜单项
- **AND** 这些菜单项使用 Electron 内置角色，自动处理对应的功能

#### Scenario: 视图菜单功能

- **WHEN** 用户点击视图菜单
- **THEN** 显示重新加载、强制重新加载、切换开发者工具、缩放、全屏等菜单项
- **AND** 这些菜单项使用 Electron 内置角色，自动处理对应的功能

#### Scenario: 帮助菜单功能

- **WHEN** 用户点击帮助菜单
- **THEN** 显示"关于"菜单项
- **AND** 点击关于时，可以显示关于对话框或执行自定义操作

#### Scenario: macOS 平台特殊处理

- **WHEN** 应用在 macOS 平台运行
- **AND** 使用自定义菜单
- **THEN** 自动添加应用菜单（显示应用名称）
- **AND** 应用菜单包含关于、服务、隐藏、退出等系统标准菜单项
- **AND** 应用菜单显示在系统菜单栏（屏幕顶部）

#### Scenario: 菜单配置函数调用

- **WHEN** 主进程创建窗口后
- **THEN** 调用 `setMenuBar(mainWindow)` 函数
- **AND** 函数根据配置方式设置相应的菜单
- **AND** 函数处理不同平台的差异（Windows/Linux/macOS）

