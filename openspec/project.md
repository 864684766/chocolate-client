# Project Context

## Purpose

**Chocolate Client** 是一个面向普通用户的现代化 AI 聊天桌面应用。
**目标：** 打造一个美观、流畅、类似 Apple iMessage / 微信风格的桌面客户端。用户无需理解技术细节，即可通过该界面与大模型（如 OpenAI 格式 API）进行流式对话。

## Tech Stack(Bleeding Edge 2025)

本项目强制使用业界最新技术栈，旨在学习和掌握 2025 年主流前端与桌面端开发范式。

- **Core:**
  - **Electron (Latest Stable):** 桌面应用容器。
  - **Node.js (Latest LTS):** 主进程运行时。
- **Frontend Framework:**
  - **React 19.x:** 必须充分利用 React 19 新特性 (Actions, `use` API, Server Components 概念在客户端的对应应用)。
  - **Language:** TypeScript 5.x+ (Strict Mode)。
  - **Build Tool:** Vite (配置 React SWC 插件，追求极致构建速度)。
- **UI System:**
  - **shadcn/ui:** 基于 **Radix UI** (无头组件) + **Tailwind CSS** (样式) 的组件体系。
  - **Tailwind CSS:** 使用 Utility-first 编写样式。
  - **Icons:** Lucide React (shadcn 默认图标库)。
- **State Management:**
  - **Redux Toolkit (RTK):** 用于管理全局状态（如用户信息、对话历史）。
- **Packaging:**
  - **Electron Builder:** 构建 Windows (.exe) 和 macOS (.dmg) 安装包。

## Project Conventions

### Code Style (React 19 & Modern ES2025)

AI 必须遵守以下现代编码规范，严禁使用过时写法：

1.  **React 19 Paradigm:**
    - **No `forwardRef`:** 直接将 `ref` 作为 props 传递给组件。
    - **Data Fetching:** 优先使用 `use(Promise)` 或 React Query，而非手动写 `useEffect` 获取数据。
    - **Actions:** 处理表单提交或 IPC 调用时，使用 `useTransition` 和 `useActionState` 自动管理 Pending 状态，禁止手动维护 `isLoading` 变量。
    - **Compiler Friendly:** 减少不必要的 `useMemo/useCallback`，除非涉及重昂贵的计算。

2.  **Modern JavaScript:**
    - **Variables:** 全面禁止 `var`。默认使用 `const`，仅在必须时使用 `let`。
    - **Async:** 在允许的层级全面使用 Top-level `await`。
    - **Immutability:** 操作数组时使用 `toSorted()`, `toSpliced()`, `toReversed()` 等返回新数组的方法，**严禁**使用 `sort()`, `splice()` 直接修改原数组。
    - **Safety:** 强制使用 Optional Chaining (`user?.name`) 和 Nullish Coalescing (`count ?? 0`)。

3.  **UI Implementation (shadcn/ui):**
    - **流程:** 先检查 shadcn 是否有现成组件 (如 Dialog, ScrollArea, Input)。
    - **扩展:** 如果需要修改样式，通过 Tailwind 类名覆盖；如果需要修改交互逻辑，查阅 **Radix UI** 文档。
    - **工具:** 使用 `cn()` 函数 (clsx + tailwind-merge) 来动态合并类名。

### File Structure: Feature-based (特性驱动)

**Rule:** Organize code by **Business Feature**, not by technical type.
**规则：** 按业务功能组织代码，不要按文件类型（不要把所有组件堆在一起）。

**Standard Pattern:**

```text
src/
  features/                 # Feature Modules (业务功能模块)
    [feature-name]/         # e.g., auth, chat, settings
      components/           # Components specific to this feature (该功能独有的组件)
      hooks/                # Hooks specific to this feature
      api/                  # API calls for this feature
      [name]Slice.ts        # Redux State for this feature
      index.ts              # Public API (只暴露外部需要的东西)
  components/               # Shared/Generic UI Components (全局通用组件，如 shadcn)
    ui/
    layout/
  lib/                      # Shared Utilities (公共工具)
  hooks/                    # Shared Hooks (公共 Hooks)
```

### Architecture Patterns

严格遵循“主进程(Main)与渲染进程(Renderer)隔离”的安全模型，确保应用的安全性和稳定性。

1.  **Main Process (主进程):**
    - **职责:** 处理操作系统级操作（如文件系统访问、系统通知、原生菜单、托盘图标、窗口管理）、底层数据库操作、Electron 安全配置。
    - **特点:** 拥有 Node.js 的全部能力。
2.  **Renderer Process (渲染进程):**
    - **职责:** 纯粹的 React 19 UI 渲染。
    - **限制:** **绝对禁止**直接访问 Node.js API (如 `fs`, `path`, `child_process`)。
3.  **IPC Bridge (进程间通信):**
    - **核心:** 必须启用 `contextIsolation: true` 和 `sandbox: true`。
    - **实现:** 通过 `preload.js` 脚本使用 `contextBridge` 安全地暴露有限的 API 给渲染进程。
    - **通信模式:**
      - **从 Renderer 到 Main:** 使用 `ipcRenderer.invoke('channel', data)` (单向请求带返回值)。
      - **从 Main 到 Renderer:** 使用 `ipcRenderer.on('channel', handler)` (单向事件)。
    - **安全性:** 暴露的 API 必须经过严格的参数验证，避免注入攻击。

### Testing Strategy

确保代码质量和应用稳定性。

- **Unit Test (单元测试):** 使用 **Vitest** 测试 Redux store 的 reducer、selector、thunk，以及工具函数、自定义 Hook 等纯逻辑模块。
- **E2E Test (端到端测试):** 使用 **Playwright** 模拟真实用户操作流程，验证应用从启动到主要功能（如发送消息、切换设置）的完整性。

### Git Workflow

采用清晰的 Git 工作流，便于团队协作和版本管理。

- **分支策略:**
  - `main` 分支为稳定版本，只接受 `release` 或 `hotfix` 分支的合并。
  - `develop` 分支为开发主线，所有新功能从 `develop` 分支拉出 `feature/xxx` 分支开发。
  - `release/vX.Y.Z` 分支用于发布前的集成测试和 Bug 修复。
- **提交信息:**
  - 遵循 Conventional Commits 规范（如 `feat: add AI chat streaming`, `fix: correct markdown render issue`, `chore: update dependencies`）。
  - 每个提交应聚焦一个逻辑变更。

## Domain Context

**Chocolate Client** 作为 AI 前端界面，需要理解以下业务和用户特点：

- **用户画像:** 面向普通非技术用户，他们不了解 API Key、大模型原理，注重**简洁直观**的交互。
- **核心交互:** 与 AI 进行多轮对话，前端需维护和展示多轮对话的历史记录 (Conversation History UI)。
- **AI 模型:** 后端通过 API 与各种大模型交互（例如 OpenAI 兼容 API），前端无需关心具体模型细节。
- **流式传输 (Streaming):** AI 回复必须以打字机效果逐步显示，而不是一次性出现。
- **Markdown 支持:** AI 回复通常包含 Markdown 格式，前端需能正确渲染（包括代码块高亮）。

## Important Constraints

项目的开发和设计必须遵守以下重要限制：

- **Security First:** Electron 配置必须强制启用 `contextIsolation: true` 和 `sandbox: true`，`nodeIntegration: false`。这是最高优先级。
- **Cross-Platform Compatibility:** 应用必须在 Windows (10+) 和 macOS (Big Sur+) 上提供一致的用户体验。文件路径处理必须使用 Node.js 的 `path` 模块 (如 `path.join()`)。
- **Performance:**
  - **启动速度:** 应用程序启动时间需控制在 2 秒内。
  - **响应速度:** UI 在高频交互（如 AI 流式输出大量文本时）必须保持输入框响应灵敏，不出现卡顿。考虑使用虚拟列表 (Virtualization) 渲染长对话历史。
- **Accessibility (可访问性):** UI 组件必须考虑键盘导航和屏幕阅读器支持（受益于 Radix UI 的底层支持）。
- **Offline Mode:** 核心设置应能离线加载，增强用户体验。

## External Dependencies

本项目依赖以下外部服务和系统：

- **AI Model APIs:** 兼容 我们有私有的后端 API。
- **Local Storage:** 使用 Electron 的 `app.getPath('userData')` 存储用户配置和数据（如 SQLite 数据库或 JSON 文件）。
- **System Notifications:** 利用 Electron 的原生通知能力。

### OpenSpec Modification & Rollback Rules

为了确保 OpenSpec 的修改安全、可追踪、可回滚，必须遵循以下流程：

1. **问题分析**
   - 粘贴报错或问题描述
   - AI 或开发者先分析，不直接修改
   - 指出受影响模块或步骤

2. **提出修改方案**
   - 列出 2~3 种可行方案
   - 说明每种方案的优缺点和影响范围

3. **确认方案**
   - 团队或自己确认后，选择方案

4. **修改 OpenSpec**
   - 展示 diff / 修改前后对比
   - 只修改受影响部分

5. **自测验证**
   - 模拟执行脚手架
   - 检查关键命令是否成功（如 pnpm i、Electron 启动）
   - 验证环境依赖和安装流程

6. **版本管理**
   - 每次修改增加版本号（如 v1.0 → v1.1）
   - 不覆盖旧版本
   - 保留修改日志，方便回滚

7. **回滚**
   - 如果修改导致问题，直接退回上一个版本
   - 保留修改日志以便再次修复
