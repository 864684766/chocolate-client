## 1. 创建主进程 Feature-based 目录结构

- [x] 1.1 创建 `apps/admin/main/features/` 目录
- [x] 1.2 创建 `apps/admin/main/features/menu/` 目录（菜单功能模块）
- [x] 1.3 创建 `apps/admin/main/features/window/` 目录（窗口管理功能模块）
- [x] 1.4 创建 `apps/admin/main/features/ipc/` 目录（IPC 处理功能模块）

## 2. 提取菜单功能模块

- [x] 2.1 创建 `apps/admin/main/features/menu/index.ts` 导出菜单相关功能
- [x] 2.2 创建 `apps/admin/main/features/menu/menuBuilder.ts` 实现菜单构建逻辑
- [x] 2.3 创建 `apps/admin/main/features/menu/menuTemplate.ts` 定义菜单模板
- [x] 2.4 将 `setMenuBar` 函数从 `index.ts` 移动到菜单模块
- [x] 2.5 添加菜单模块的完整注释（函数说明、参数说明、返回值说明）

## 3. 提取窗口管理功能模块

- [x] 3.1 创建 `apps/admin/main/features/window/index.ts` 导出窗口相关功能
- [x] 3.2 创建 `apps/admin/main/features/window/windowConfig.ts` 定义窗口配置常量
- [x] 3.3 创建 `apps/admin/main/features/window/windowCreator.ts` 实现窗口创建逻辑
- [x] 3.4 将 `createWindow` 函数从 `index.ts` 移动到窗口模块
- [x] 3.5 将 `getDevPort` 函数移动到窗口模块（或工具模块）
- [x] 3.6 添加窗口模块的完整注释

## 4. 提取 IPC 处理功能模块

- [x] 4.1 创建 `apps/admin/main/features/ipc/index.ts` 导出 IPC 相关功能
- [x] 4.2 创建 `apps/admin/main/features/ipc/handlers.ts` 实现 IPC 处理器
- [x] 4.3 将 `registerIpcHandlers` 函数从 `index.ts` 移动到 IPC 模块
- [x] 4.4 添加 IPC 模块的完整注释

## 5. 重构主进程入口文件

- [x] 5.1 简化 `apps/admin/main/index.ts`，只保留应用生命周期管理
- [x] 5.2 从各功能模块导入并组装功能
- [x] 5.3 确保应用启动流程保持不变
- [x] 5.4 添加入口文件的完整注释

## 6. 代码规范和优化

- [x] 6.1 确保所有函数体不超过 20 行（如超过，拆分为更小的函数）
- [x] 6.2 确保所有字面量提取为常量或配置
- [x] 6.3 确保所有方法和函数都有完整注释
- [x] 6.4 运行 TypeScript 类型检查，确保无类型错误
- [x] 6.5 运行 ESLint 检查，确保代码规范

## 7. 测试验证

- [x] 7.1 验证应用可以正常启动
- [x] 7.2 验证菜单栏正常显示
- [x] 7.3 验证窗口创建和配置正常
- [x] 7.4 验证 IPC 通信正常（如 `app:getVersion`, `app:getPlatform`）
- [x] 7.5 验证开发模式和生产模式都能正常工作
