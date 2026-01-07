## MODIFIED Requirements

### Requirement: Feature-based 目录结构

系统 SHALL 在每个应用内采用 Feature-based 目录结构，按业务功能组织代码。主进程代码和渲染进程代码都应遵循此原则。

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

#### Scenario: 主进程功能模块化

- **WHEN** 开发者需要添加主进程新功能（如菜单、窗口管理、IPC 处理）
- **THEN** 在 `apps/[app-name]/main/features/[feature-name]/` 目录下创建相关文件
- **AND** 功能相关的代码（配置、逻辑、处理器）都在该目录下
- **AND** 通过 `index.ts` 暴露公共 API
- **AND** 主入口文件（`main/index.ts`）只负责应用生命周期管理和功能模块组装

## ADDED Requirements

### Requirement: 主进程 Feature-based 架构

系统 SHALL 在主进程代码中采用 Feature-based 架构，按功能模块组织代码，而非将所有代码集中在一个文件中。

#### Scenario: 主进程代码组织

- **WHEN** 查看主进程代码结构
- **THEN** 存在 `apps/[app-name]/main/features/` 目录
- **AND** 每个功能模块都有独立的目录（如 `menu/`, `window/`, `ipc/`）
- **AND** 每个功能模块通过 `index.ts` 暴露公共 API
- **AND** 主入口文件（`main/index.ts`）简洁，只负责应用生命周期管理

#### Scenario: 菜单功能模块

- **WHEN** 应用启动
- **THEN** 菜单功能通过 `features/menu/` 模块提供
- **AND** 菜单模板定义、菜单构建逻辑都在该模块中
- **AND** 主入口文件通过导入菜单模块设置菜单栏

#### Scenario: 窗口管理功能模块

- **WHEN** 应用需要创建窗口
- **THEN** 窗口创建功能通过 `features/window/` 模块提供
- **AND** 窗口配置、窗口创建逻辑都在该模块中
- **AND** 主入口文件通过导入窗口模块创建窗口

#### Scenario: IPC 处理功能模块

- **WHEN** 应用需要注册 IPC 处理器
- **THEN** IPC 处理功能通过 `features/ipc/` 模块提供
- **AND** 所有 IPC 处理器都在该模块中
- **AND** 主入口文件通过导入 IPC 模块注册处理器
