# Design: 主进程 Feature-based 架构重构

## Context

当前主进程代码（`apps/admin/main/index.ts`）包含 248 行代码，将所有功能集中在一个文件中：
- 窗口创建和管理（`createWindow`, `getDevPort`）
- 菜单栏设置（`setMenuBar`）
- IPC 处理器注册（`registerIpcHandlers`）
- 应用生命周期管理（`onAppReady`, `onWindowAllClosed`, `onActivate`）

随着功能增加，该文件会变得臃肿，难以维护。项目规范（`openspec/project.md`）明确要求采用 Feature-based 架构，但目前主进程代码尚未遵循这一原则。

## Goals / Non-Goals

### Goals

- 将主进程代码重构为 Feature-based 架构，按功能模块组织代码
- 提取菜单设置代码到独立模块，便于后续扩展和维护
- 建立清晰的主进程代码组织结构，为后续功能扩展提供模板
- 保持应用功能不变，确保重构不影响现有功能
- 遵循项目规范：函数注释、代码拆分、单一职责原则

### Non-Goals

- 不修改渲染进程代码结构（本次仅处理主进程）
- 不修改 IPC 通信协议（仅重构代码组织方式）
- 不添加新功能（纯重构，不改变行为）
- 不处理客户端应用（`apps/client/main/`）的主进程代码（后续单独处理）

## Decisions

### Decision: 主进程 Feature-based 目录结构

**What:** 在主进程目录下创建 `features/` 目录，按功能模块组织代码。

**Why:**
- 符合项目规范（`openspec/project.md` 要求 Feature-based 架构）
- 提高代码可维护性和可发现性
- 便于团队协作，功能模块边界清晰
- 为后续功能扩展提供清晰的代码组织方式

**Alternatives considered:**
- 按文件类型组织（handlers/, utils/, config/）：会导致相关代码分散，不符合项目规范
- 保持单文件结构：随着功能增加会变得臃肿，难以维护

**目录结构：**
```
apps/admin/main/
├── index.ts                    # 主入口文件（应用生命周期管理）
├── features/                    # 功能模块目录
│   ├── menu/                   # 菜单功能模块
│   │   ├── index.ts           # 导出公共 API
│   │   ├── menuBuilder.ts     # 菜单构建逻辑
│   │   └── menuTemplate.ts    # 菜单模板定义
│   ├── window/                 # 窗口管理功能模块
│   │   ├── index.ts           # 导出公共 API
│   │   ├── windowConfig.ts    # 窗口配置常量
│   │   └── windowCreator.ts   # 窗口创建逻辑
│   └── ipc/                    # IPC 处理功能模块
│       ├── index.ts           # 导出公共 API
│       └── handlers.ts       # IPC 处理器实现
```

### Decision: 菜单功能模块设计

**What:** 将菜单相关代码提取到 `features/menu/` 模块，包含菜单模板定义、菜单构建逻辑。

**Why:**
- 菜单功能相对独立，可以单独维护
- 便于后续扩展菜单功能（如动态菜单、上下文菜单）
- 符合单一职责原则

**模块职责：**
- `menuTemplate.ts`: 定义菜单模板结构（菜单项、快捷键等）
- `menuBuilder.ts`: 实现菜单构建逻辑（根据平台差异构建菜单）
- `index.ts`: 导出 `setMenuBar` 函数供主入口使用

### Decision: 窗口管理功能模块设计

**What:** 将窗口创建和管理相关代码提取到 `features/window/` 模块。

**Why:**
- 窗口配置和创建逻辑相对独立
- 便于后续扩展窗口功能（如多窗口、窗口状态管理）
- 符合单一职责原则

**模块职责：**
- `windowConfig.ts`: 定义窗口配置常量（尺寸、最小尺寸、标题等）
- `windowCreator.ts`: 实现窗口创建逻辑（`createWindow`, `getDevPort`）
- `index.ts`: 导出 `createWindow` 函数供主入口使用

### Decision: IPC 处理功能模块设计

**What:** 将 IPC 处理器相关代码提取到 `features/ipc/` 模块。

**Why:**
- IPC 处理器相对独立，可以单独维护
- 便于后续扩展 IPC 功能（如添加新的 IPC 通道）
- 符合单一职责原则

**模块职责：**
- `handlers.ts`: 实现所有 IPC 处理器（`app:getVersion`, `app:getPlatform` 等）
- `index.ts`: 导出 `registerIpcHandlers` 函数供主入口使用

### Decision: 主入口文件简化

**What:** 主入口文件（`index.ts`）只保留应用生命周期管理，从各功能模块导入并组装功能。

**Why:**
- 主入口文件应该简洁，只负责应用启动流程
- 具体功能实现应该在对应的功能模块中
- 便于理解和维护

**主入口文件职责：**
- 导入各功能模块
- 注册 IPC 处理器
- 处理应用生命周期事件（ready, window-all-closed, activate）
- 创建主窗口
- 设置菜单栏

## Risks / Trade-offs

### Risk: 重构可能引入 bug

**Mitigation:**
- 保持功能不变，只重构代码组织方式
- 充分测试应用启动、菜单显示、窗口创建、IPC 通信等核心功能
- 逐步重构，先提取一个模块，验证无误后再继续

### Risk: 代码拆分过度，增加文件数量

**Mitigation:**
- 遵循单一职责原则，但不过度拆分
- 每个模块保持合理的复杂度
- 如果某个模块代码很少（<50 行），可以考虑合并到相关模块

### Risk: 导入路径变长，影响可读性

**Mitigation:**
- 使用清晰的模块命名
- 通过 `index.ts` 导出公共 API，简化导入路径
- 保持导入路径的简洁性

## Migration Plan

### 步骤 1: 创建目录结构
创建 `features/` 目录及子目录，不修改现有代码。

### 步骤 2: 提取菜单模块
1. 创建菜单模块文件
2. 将菜单相关代码移动到菜单模块
3. 在主入口文件中导入并使用菜单模块
4. 测试验证菜单功能正常

### 步骤 3: 提取窗口管理模块
1. 创建窗口管理模块文件
2. 将窗口相关代码移动到窗口管理模块
3. 在主入口文件中导入并使用窗口管理模块
4. 测试验证窗口功能正常

### 步骤 4: 提取 IPC 处理模块
1. 创建 IPC 处理模块文件
2. 将 IPC 相关代码移动到 IPC 处理模块
3. 在主入口文件中导入并使用 IPC 处理模块
4. 测试验证 IPC 功能正常

### 步骤 5: 简化主入口文件
1. 清理主入口文件，只保留应用生命周期管理
2. 确保所有功能通过模块导入
3. 完整测试应用功能

### 回滚计划
如果重构过程中出现问题，可以：
1. 使用 Git 回滚到重构前的版本
2. 逐步回滚，先回滚有问题的模块，其他模块保持不变

## Open Questions

- [ ] 是否需要创建主进程的工具函数模块（`utils/`）？目前 `getDevPort` 可以放在窗口模块或工具模块
- [ ] 是否需要为主进程功能模块编写单元测试？（当前项目规范未明确要求主进程单元测试）
- [ ] 客户端应用（`apps/client/main/`）是否也需要应用相同的架构？（建议后续单独处理）

