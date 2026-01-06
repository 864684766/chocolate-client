## 1. Monorepo 项目初始化

- [ ] 1.1 初始化根目录 package.json，配置 workspace
- [ ] 1.2 创建 pnpm-workspace.yaml，配置 workspace 结构
- [ ] 1.3 创建 apps/client/ 目录，初始化客户端应用
- [ ] 1.4 创建 apps/admin/ 目录，初始化管理端应用
- [ ] 1.5 创建 packages/shared/ 目录，初始化共享代码包
- [ ] 1.6 配置根目录 TypeScript (tsconfig.json)，启用 strict mode
- [ ] 1.7 配置 ESLint 和 Prettier，确保代码风格一致

## 2. Electron 基础配置（双应用）

- [ ] 2.1 创建客户端 Electron 主进程入口文件 (apps/client/main/index.ts)
- [ ] 2.2 创建管理端 Electron 主进程入口文件 (apps/admin/main/index.ts)
- [ ] 2.3 配置客户端 BrowserWindow，启用安全选项（contextIsolation, sandbox, nodeIntegration: false）
- [ ] 2.4 配置管理端 BrowserWindow，启用安全选项（contextIsolation, sandbox, nodeIntegration: false）
- [ ] 2.5 创建客户端 preload.ts，使用 contextBridge 暴露安全的 IPC API
- [ ] 2.6 创建管理端 preload.ts，使用 contextBridge 暴露安全的 IPC API
- [ ] 2.7 配置 Electron Builder，支持客户端和管理端分别打包为独立 exe/dmg

## 3. React 19 前端框架（双应用）

- [ ] 3.1 创建客户端 React 应用入口文件 (apps/client/src/main.tsx)
- [ ] 3.2 创建管理端 React 应用入口文件 (apps/admin/src/main.tsx)
- [ ] 3.3 配置客户端 React Router（如需要）
- [ ] 3.4 配置管理端 React Router（如需要）
- [ ] 3.5 创建客户端基础 Layout 组件
- [ ] 3.6 创建管理端基础 Layout 组件
- [ ] 3.7 配置全局样式和 Tailwind CSS（两个应用共享配置）

## 4. UI 系统配置（共享）

- [ ] 4.1 在共享包中初始化 shadcn/ui，安装基础组件 (packages/shared/components/ui/)
- [ ] 4.2 配置 Tailwind CSS，设置主题变量（共享配置）
- [ ] 4.3 创建共享 UI 组件目录结构 (packages/shared/components/ui/)
- [ ] 4.4 创建共享工具函数 (packages/shared/lib/utils.ts)，包含 cn() 函数
- [ ] 4.5 配置两个应用引用共享 UI 组件

## 5. 状态管理配置（双应用独立）

- [ ] 5.1 配置客户端 Redux Toolkit store (apps/client/src/store/)
- [ ] 5.2 配置管理端 Redux Toolkit store (apps/admin/src/store/)
- [ ] 5.3 创建客户端 store 类型定义
- [ ] 5.4 创建管理端 store 类型定义
- [ ] 5.5 配置客户端 React-Redux Provider
- [ ] 5.6 配置管理端 React-Redux Provider

## 6. 项目目录结构

- [ ] 6.1 创建客户端 Feature-based 目录结构 (apps/client/src/features/)
- [ ] 6.2 创建管理端 Feature-based 目录结构 (apps/admin/src/features/)
- [ ] 6.3 创建共享包目录结构 (packages/shared/)
  - [ ] 6.3.1 components/ - 共享 UI 组件
  - [ ] 6.3.2 lib/ - 共享工具函数
  - [ ] 6.3.3 types/ - 共享类型定义
  - [ ] 6.3.4 hooks/ - 共享 Hooks（如需要）
- [ ] 6.4 配置 workspace 依赖，使两个应用可以引用共享包

## 7. IPC 通信层（双应用独立）

- [ ] 7.1 定义客户端 IPC 通信协议和类型
- [ ] 7.2 定义管理端 IPC 通信协议和类型
- [ ] 7.3 实现客户端 preload.ts 中的 API 暴露
- [ ] 7.4 实现管理端 preload.ts 中的 API 暴露
- [ ] 7.5 在客户端主进程中实现对应的 IPC handlers
- [ ] 7.6 在管理端主进程中实现对应的 IPC handlers
- [ ] 7.7 创建客户端渲染进程 IPC 调用封装
- [ ] 7.8 创建管理端渲染进程 IPC 调用封装

## 8. 开发工具和脚本

- [ ] 8.1 配置根目录开发脚本（统一管理两个应用）
  - [ ] 8.1.1 dev:client - 启动客户端开发模式
  - [ ] 8.1.2 dev:admin - 启动管理端开发模式
  - [ ] 8.1.3 build:client - 构建客户端
  - [ ] 8.1.4 build:admin - 构建管理端
  - [ ] 8.1.5 build:all - 构建所有应用
- [ ] 8.2 配置 Electron 开发工具（如 electron-dev）
- [ ] 8.3 创建 .gitignore 文件
- [ ] 8.4 配置 Vite 构建工具，支持 Monorepo 结构

## 9. 基础安全配置

- [ ] 9.1 验证 contextIsolation 和 sandbox 已启用
- [ ] 9.2 配置 CSP (Content Security Policy)
- [ ] 9.3 实现 IPC 参数验证机制

## 10. 文档和测试准备

- [ ] 10.1 创建 README.md，说明项目结构和开发流程
- [ ] 10.2 配置 Vitest 测试环境（为后续单元测试准备）
- [ ] 10.3 配置 Playwright 测试环境（为后续 E2E 测试准备）
