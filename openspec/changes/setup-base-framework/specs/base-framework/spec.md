# Base Framework Specification

## ADDED Requirements

### Requirement: Electron 应用架构

系统 SHALL 提供完整的 Electron 应用架构，包括主进程和渲染进程的分离，以及安全的进程间通信机制。

#### Scenario: 应用启动

- **WHEN** 用户启动应用
- **THEN** 主进程创建 BrowserWindow 实例
- **AND** 渲染进程加载 React 应用
- **AND** 两个进程通过 IPC 进行通信

#### Scenario: 安全隔离

- **WHEN** 渲染进程尝试访问 Node.js API
- **THEN** 访问被阻止（nodeIntegration: false）
- **AND** 只能通过 preload.ts 暴露的安全 API 访问系统能力

### Requirement: 前端开发环境

系统 SHALL 提供基于 React 19、TypeScript 5.x 和 Vite 的现代化前端开发环境。

#### Scenario: 开发模式启动

- **WHEN** 开发者运行 `npm run dev`
- **THEN** Vite 开发服务器启动
- **AND** React 应用在 Electron 窗口中渲染
- **AND** 支持热模块替换 (HMR)

#### Scenario: 生产构建

- **WHEN** 开发者运行 `npm run build`
- **THEN** Vite 构建优化的生产版本
- **AND** 生成的文件可用于 Electron 打包

### Requirement: TypeScript 类型安全

系统 SHALL 使用 TypeScript 5.x 严格模式，确保类型安全。

#### Scenario: 类型检查

- **WHEN** 代码包含类型错误
- **THEN** TypeScript 编译器报告错误
- **AND** 构建过程失败，阻止错误代码进入生产环境

### Requirement: UI 组件系统

系统 SHALL 提供基于 shadcn/ui 和 Tailwind CSS 的 UI 组件系统。

#### Scenario: 使用 UI 组件

- **WHEN** 开发者导入 shadcn/ui 组件
- **THEN** 组件可以正常使用
- **AND** 样式通过 Tailwind CSS 类名应用
- **AND** 组件支持可访问性特性（键盘导航、屏幕阅读器）

#### Scenario: 样式定制

- **WHEN** 开发者需要修改组件样式
- **THEN** 可以通过 Tailwind 类名覆盖默认样式
- **AND** 可以使用 `cn()` 函数动态合并类名

### Requirement: 状态管理

系统 SHALL 提供基于 Redux Toolkit 的全局状态管理能力。

#### Scenario: 创建 Redux Store

- **WHEN** 应用启动
- **THEN** Redux store 被创建并配置
- **AND** store 通过 Provider 提供给 React 组件树

#### Scenario: 使用状态

- **WHEN** 组件需要访问或修改全局状态
- **THEN** 可以使用 `useSelector` 和 `useDispatch` hooks
- **AND** 状态变更通过 Redux DevTools 可追踪

### Requirement: IPC 通信机制

系统 SHALL 提供安全的进程间通信机制，允许渲染进程请求主进程执行系统操作。

#### Scenario: 渲染进程调用主进程

- **WHEN** 渲染进程需要执行系统操作（如文件访问）
- **THEN** 通过 `window.electronAPI` 调用预定义的 IPC 方法
- **AND** 主进程处理请求并返回结果
- **AND** 所有参数经过验证，防止注入攻击

#### Scenario: 主进程通知渲染进程

- **WHEN** 主进程需要通知渲染进程（如系统事件）
- **THEN** 通过 IPC 事件发送消息
- **AND** 渲染进程通过事件监听器接收消息

### Requirement: Monorepo 项目结构

系统 SHALL 采用 Monorepo 结构，包含客户端应用、管理端应用和共享代码包。

#### Scenario: 项目目录结构

- **WHEN** 查看项目根目录
- **THEN** 存在 `apps/client/` 目录（客户端应用）
- **AND** 存在 `apps/admin/` 目录（管理端应用）
- **AND** 存在 `packages/shared/` 目录（共享代码包）
- **AND** 存在 `pnpm-workspace.yaml` 配置文件

#### Scenario: 共享代码使用

- **WHEN** 客户端或管理端需要使用 UI 组件
- **THEN** 从 `packages/shared/components/ui/` 导入组件
- **AND** 共享的组件、工具函数、类型定义都可以被两个应用引用

### Requirement: 双应用独立构建

系统 SHALL 支持构建两个独立的 Electron 应用，分别生成独立的安装包。

#### Scenario: 构建客户端

- **WHEN** 开发者运行 `npm run build:client`
- **THEN** 生成客户端应用的优化代码
- **AND** Electron Builder 创建客户端安装包（.exe 或 .dmg）
- **AND** 安装包名称包含 "client" 标识

#### Scenario: 构建管理端

- **WHEN** 开发者运行 `npm run build:admin`
- **THEN** 生成管理端应用的优化代码
- **AND** Electron Builder 创建管理端安装包（.exe 或 .dmg）
- **AND** 安装包名称包含 "admin" 标识

### Requirement: Feature-based 目录结构

系统 SHALL 在每个应用内采用 Feature-based 目录结构，按业务功能组织代码。

#### Scenario: 创建客户端新功能模块

- **WHEN** 开发者需要添加客户端新功能（如聊天功能）
- **THEN** 在 `apps/client/src/features/chat/` 目录下创建相关文件
- **AND** 功能相关的组件、hooks、API、状态管理都在该目录下
- **AND** 通过 `index.ts` 暴露公共 API

#### Scenario: 创建管理端新功能模块

- **WHEN** 开发者需要添加管理端新功能（如 RAG 数据管理）
- **THEN** 在 `apps/admin/src/features/rag/` 目录下创建相关文件
- **AND** 功能相关的组件、hooks、API、状态管理都在该目录下
- **AND** 通过 `index.ts` 暴露公共 API

#### Scenario: 使用共享组件

- **WHEN** 客户端或管理端需要相同的 UI 组件
- **THEN** 组件放在 `packages/shared/components/` 目录下
- **AND** 可以被两个应用引用

### Requirement: 构建和打包（双应用）

系统 SHALL 提供完整的构建和打包流程，支持为客户端和管理端分别构建，支持 Windows 和 macOS 平台。

#### Scenario: 构建所有应用

- **WHEN** 开发者运行 `npm run build:all`
- **THEN** 同时构建客户端和管理端应用
- **AND** 生成两个独立的安装包
- **AND** 支持 Windows (.exe) 和 macOS (.dmg) 格式

### Requirement: 开发工具配置

系统 SHALL 提供代码质量工具配置，包括 ESLint 和 Prettier。

#### Scenario: 代码检查

- **WHEN** 开发者保存代码文件
- **THEN** ESLint 自动检查代码规范
- **AND** Prettier 自动格式化代码
- **AND** 违反规范的代码会被标记

### Requirement: 安全配置

系统 SHALL 强制启用 Electron 安全最佳实践配置。

#### Scenario: 安全隔离验证

- **WHEN** 应用启动
- **THEN** contextIsolation 必须为 true
- **AND** sandbox 必须为 true
- **AND** nodeIntegration 必须为 false
- **AND** CSP (Content Security Policy) 已配置
