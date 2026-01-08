import { contextBridge } from 'electron';
import { apiRegistry } from './core/registry';
import { appAPIModule } from './features/app';

/**
 * 管理端应用 preload 脚本
 * 使用 contextBridge 安全地暴露 IPC API 给渲染进程
 * 采用注册模式 + 工厂模式 + 适配器模式，保证代码的可维护性和可扩展性
 */

// 注册所有功能模块的 API
apiRegistry.register(appAPIModule);

// 未来扩展示例：
// import { fileAPIModule } from './features/file';
// apiRegistry.register(fileAPIModule);

// 构建完整的 API 对象
const electronAPI = apiRegistry.buildAPI();

// 使用 contextBridge 安全地暴露 API
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// 类型定义在 types.d.ts 文件中
// 当添加新的功能模块时，需要在 types.d.ts 中更新类型定义
