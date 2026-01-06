# Change: 基础框架搭建

## Why

Chocolate Client 是一个全新的项目，需要建立完整的技术基础设施，包括 Electron 应用架构、React 19 前端框架、状态管理、UI 组件系统、构建工具链等。只有搭建好这些基础框架，才能在此基础上开发具体的业务功能。

## What Changes

- **ADDED** Monorepo 项目结构（支持客户端和管理端双应用）
- **ADDED** 客户端应用基础框架（用户 AI 聊天界面）
- **ADDED** 管理端应用基础框架（RAG 数据管理后台）
- **ADDED** 共享代码包（UI 组件、工具函数、类型定义）
- **ADDED** Electron 主进程和渲染进程的基础配置（双应用独立配置）
- **ADDED** React 19 + TypeScript + Vite 开发环境配置
- **ADDED** shadcn/ui + Tailwind CSS UI 系统配置
- **ADDED** Redux Toolkit 状态管理配置
- **ADDED** IPC 通信桥接（preload.js + contextBridge）
- **ADDED** Electron 安全配置（contextIsolation, sandbox）
- **ADDED** 基础构建和打包配置（Electron Builder，生成两个独立 exe 程序）
- **ADDED** 开发工具配置（ESLint, Prettier, TypeScript strict mode）

## Impact

- **Affected specs:** 新增 `base-framework` capability
- **Affected code:**
  - 项目根目录配置文件（package.json, pnpm-workspace.yaml, tsconfig.json 等）
  - 客户端应用代码（apps/client/）
  - 管理端应用代码（apps/admin/）
  - 共享代码包（packages/shared/）
  - Electron 主进程代码（每个应用独立的 main/）
  - 渲染进程代码（每个应用独立的 src/）
  - IPC 通信层（每个应用独立的 preload.ts）
  - 项目目录结构（Monorepo 架构）
