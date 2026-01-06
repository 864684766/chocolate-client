# Chocolate Client

现代化 AI 聊天桌面应用（客户端 + 管理端）

## 项目结构

```
chocolate-client/
├── apps/
│   ├── client/          # 客户端应用（用户AI聊天界面）
│   └── admin/           # 管理端应用（RAG数据管理后台）
├── packages/
│   └── shared/          # 共享代码包（UI组件、工具函数、类型定义）
└── package.json         # 根 package.json（Monorepo 配置）
```

## 技术栈

- **Electron** - 桌面应用框架
- **React 19** - UI 框架
- **TypeScript 5.x** - 类型系统
- **Vite** - 构建工具
- **Redux Toolkit** - 状态管理
- **shadcn/ui** - UI 组件库
- **Tailwind CSS** - 样式方案
- **pnpm** - 包管理器（Workspace）

## 开发环境要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动客户端应用：
```bash
pnpm dev:client
```

启动管理端应用：
```bash
pnpm dev:admin
```

### 构建

构建客户端：
```bash
pnpm build:client
```

构建管理端：
```bash
pnpm build:admin
```

构建所有应用：
```bash
pnpm build:all
```

## 项目特性

- ✅ Monorepo 架构，支持双应用开发
- ✅ Electron 安全配置（contextIsolation + sandbox）
- ✅ React 19 + TypeScript 严格模式
- ✅ Feature-based 代码组织
- ✅ 共享 UI 组件和工具函数
- ✅ Redux Toolkit 状态管理
- ✅ 完整的开发工具链（ESLint、Prettier）

## 开发规范

- 所有代码必须通过 TypeScript 类型检查
- 所有代码必须通过 ESLint 检查
- 使用 Prettier 格式化代码
- 遵循 Feature-based 目录结构
- 所有函数、类、变量必须有注释

## 许可证

MIT

