/**
 * Preload 核心模块 - API 注册器
 * 使用注册模式统一管理各个功能模块的 API
 */

/**
 * API 模块定义接口
 * 每个功能模块必须实现此接口
 */
export interface APIModule {
  /** 模块名称（用于命名空间） */
  name: string;
  /** 模块的 API 对象 */
  api: Record<string, (...args: unknown[]) => Promise<unknown>>;
  /** 模块的类型定义（用于 TypeScript 类型推断） */
  types?: Record<string, unknown>;
}

/**
 * API 注册器类（注册模式）
 * 负责注册、管理和获取各个功能模块的 API
 */
class APIRegistry {
  /** 存储已注册的 API 模块 */
  private modules: Map<string, APIModule> = new Map();

  /**
   * 注册 API 模块
   * @param module - API 模块对象
   * @throws {Error} 如果模块名称已存在
   */
  register(module: APIModule): void {
    if (this.modules.has(module.name)) {
      throw new Error(`API module "${module.name}" is already registered`);
    }
    this.modules.set(module.name, module);
  }

  /**
   * 获取指定模块的 API
   * @param name - 模块名称
   * @returns API 对象，如果模块不存在则返回 undefined
   */
  getModule(name: string): APIModule | undefined {
    return this.modules.get(name);
  }

  /**
   * 获取所有已注册的模块名称
   * @returns 模块名称数组
   */
  getModuleNames(): string[] {
    return Array.from(this.modules.keys());
  }

  /**
   * 构建完整的 API 对象
   * 将所有注册的模块按命名空间组织
   * @returns 完整的 API 对象
   */
  buildAPI(): Record<string, Record<string, (...args: unknown[]) => Promise<unknown>>> {
    const api: Record<string, Record<string, (...args: unknown[]) => Promise<unknown>>> = {};

    for (const [name, module] of this.modules) {
      api[name] = module.api;
    }

    return api;
  }

  /**
   * 检查模块是否已注册
   * @param name - 模块名称
   * @returns 是否已注册
   */
  hasModule(name: string): boolean {
    return this.modules.has(name);
  }
}

/**
 * 全局 API 注册器实例
 * 单例模式，确保整个应用只有一个注册器
 */
export const apiRegistry = new APIRegistry();

