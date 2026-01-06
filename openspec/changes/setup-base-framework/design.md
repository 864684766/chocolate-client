# Design: 基础框架架构设计

## Context

Chocolate Client 是一个全新的 Electron 桌面应用项目，包含两个应用：
1. **客户端应用**：面向普通用户的 AI 聊天桌面应用
2. **管理端应用**：面向管理员的 RAG 数据管理后台

两个应用需要共享 UI 组件库和工具函数，但作为独立的 Electron 应用发布。项目要求使用 2025 年最新的技术栈，包括 React 19、TypeScript 5.x、Vite、shadcn/ui、Redux Toolkit 等。

## Goals / Non-Goals

### Goals

- 建立 Monorepo 项目结构，支持双应用开发
- 建立安全、可扩展的 Electron 应用架构（双应用独立配置）
- 配置共享代码包，实现代码复用
- 配置现代化的前端开发环境（React 19 + TypeScript + Vite）
- 实现主进程与渲染进程的安全隔离
- 建立清晰的 Feature-based 代码组织方式
- 配置完整的开发工具链（构建、打包、代码检查）
- 支持构建两个独立的安装包（客户端和管理端）

### Non-Goals

- 不实现具体的业务功能（聊天、设置等）
- 不配置 CI/CD 流程（后续单独处理）
- 不实现数据库或持久化存储（后续单独处理）

## Decisions

### Decision: Feature-based 目录结构

**What:** 采用按业务功能组织代码，而非按文件类型组织。
**Why:**

- 提高代码可维护性和可发现性
- 便于团队协作，功能模块边界清晰
- 符合现代前端开发最佳实践
  **Alternatives considered:**
- 按文件类型组织（components/, hooks/, utils/）：会导致相关代码分散，难以维护

### Decision: Electron 安全配置（contextIsolation + sandbox）

**What:** 强制启用 `contextIsolation: true` 和 `sandbox: true`，禁用 `nodeIntegration`。
**Why:**

- 防止 XSS 攻击，保护用户数据安全
- 符合 Electron 官方安全最佳实践
- 项目要求中明确标注为最高优先级
  **Alternatives considered:**
- 启用 nodeIntegration：会带来严重安全风险，不符合项目要求

### Decision: IPC 通信使用 contextBridge

**What:** 通过 preload.ts 使用 contextBridge 暴露有限的 API 给渲染进程。
**Why:**

- 在安全隔离的前提下，提供必要的系统能力
- 可以严格控制暴露的 API，避免安全漏洞
- 符合 Electron 安全模型
  **Alternatives considered:**
- 直接使用 ipcRenderer：需要启用 nodeIntegration，不符合安全要求

### Decision: Redux Toolkit 作为状态管理方案

**What:** 使用 Redux Toolkit (RTK) 管理全局状态。
**Why:**

- 项目要求中明确指定
- 提供良好的 TypeScript 支持
- 适合管理复杂的状态逻辑（如对话历史、用户信息）
  **Alternatives considered:**
- Zustand：更轻量，但项目要求使用 RTK
- Context API：适合简单状态，不适合复杂全局状态

### Decision: shadcn/ui + Tailwind CSS UI 系统

**What:** 使用 shadcn/ui 作为组件库，Tailwind CSS 作为样式方案。
**Why:**

- 项目要求中明确指定
- 基于 Radix UI，提供良好的可访问性支持
- Tailwind 提供高效的样式开发体验
  **Alternatives considered:**
- Material-UI：不符合项目技术栈要求
- Ant Design：不符合项目技术栈要求

## Risks / Trade-offs

### Risk: React 19 新特性兼容性

**Mitigation:**

- 使用 React 19 稳定版本
- 关注官方文档和社区反馈
- 如遇问题，及时降级到兼容版本

### Risk: Electron 安全配置可能导致功能受限

**Mitigation:**

- 仔细设计 IPC API，确保所有必要功能都可通过安全通道访问
- 在主进程实现系统级操作，通过 IPC 暴露给渲染进程

### Risk: 构建配置复杂

**Mitigation:**

- 使用 Vite 简化构建配置
- 参考 Electron + Vite 官方示例
- 逐步完善配置，先确保基础功能可用

## Migration Plan

不适用（新项目，无迁移需求）。

### Decision: Monorepo 双应用架构
**What:** 采用 Monorepo 结构，在一个项目中同时包含客户端应用和管理端应用，共享公共代码。
**Why:**
- 客户端和管理端共享 UI 组件库（shadcn/ui）和工具函数，避免代码重复
- 统一的开发工具链和代码规范，便于维护
- 类型定义可以在两个应用间共享，保证一致性
- 便于统一版本管理和发布流程
**Alternatives considered:**
- 两个独立项目：会导致代码重复，维护成本高，类型定义不一致
- 单一应用内切换模式：两个应用的用户群体和功能差异较大，独立应用更清晰

### Decision: 两个独立的 Electron 应用
**What:** 客户端和管理端分别构建为两个独立的 .exe/.dmg 程序。
**Why:**
- 客户端面向普通用户，管理端面向管理员，用户群体不同
- 两个应用可以独立安装、独立更新
- 降低单个应用的体积和复杂度
- 更好的安全隔离（管理端可能涉及敏感操作）
**Alternatives considered:**
- 单一应用内切换：会增加应用复杂度，不符合用户使用场景

### Decision: 共享代码包结构
**What:** 创建 `packages/shared/` 包，包含两个应用共享的代码。
**Why:**
- UI 组件（shadcn/ui 组件）可以在两个应用间复用
- 工具函数、类型定义、常量等可以共享
- 使用 workspace 机制，支持本地开发时的实时更新
**Alternatives considered:**
- 完全独立：会导致大量代码重复
- Git Submodule：增加复杂度，不如 workspace 方便

## Open Questions

- [ ] 是否需要配置代码分割和懒加载策略？
- [ ] IPC 通信的具体协议格式如何定义？（建议使用 TypeScript 类型定义）
- [ ] 是否需要配置环境变量管理？（开发/生产环境配置）
- [ ] 客户端和管理端是否需要共享数据存储？（如使用相同的数据库）
