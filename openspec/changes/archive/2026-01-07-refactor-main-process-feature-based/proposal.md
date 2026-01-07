# Change: 重构主进程代码为 Feature-based 架构

## Why

当前主进程代码（`apps/admin/main/index.ts`）将所有功能集中在一个文件中，包括窗口管理、菜单设置、IPC 处理等。随着功能增加，该文件会变得臃肿，难以维护。项目规范要求采用 Feature-based 架构组织代码，但目前主进程代码尚未遵循这一原则。

将主进程代码重构为 Feature-based 架构可以：
- 提高代码可维护性和可发现性
- 便于团队协作，功能模块边界清晰
- 符合项目规范（`openspec/project.md` 中明确要求 Feature-based 目录结构）
- 为后续功能扩展提供清晰的代码组织方式

## What Changes

- **REFACTORED** 将菜单设置代码从 `apps/admin/main/index.ts` 提取到独立模块
- **ADDED** 建立主进程 Feature-based 目录结构（`apps/admin/main/features/`）
- **ADDED** 创建菜单功能模块（`apps/admin/main/features/menu/`）
- **ADDED** 创建窗口管理功能模块（`apps/admin/main/features/window/`）
- **ADDED** 创建 IPC 处理功能模块（`apps/admin/main/features/ipc/`）
- **MODIFIED** 主进程入口文件（`apps/admin/main/index.ts`）简化为功能模块的组装
- **ADDED** 主进程 Feature-based 架构规范文档

## Impact

- **Affected specs:** 修改 `base-framework` capability，添加主进程 Feature-based 架构要求
- **Affected code:**
  - `apps/admin/main/index.ts` - 重构为主入口文件
  - `apps/admin/main/features/menu/` - 新增菜单功能模块
  - `apps/admin/main/features/window/` - 新增窗口管理功能模块
  - `apps/admin/main/features/ipc/` - 新增 IPC 处理功能模块
  - `apps/client/main/` - 后续也需要应用相同的架构（本次仅处理 admin）

