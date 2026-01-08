import { safeInvoke } from './adapter';
import type { APIModule } from './registry';

/**
 * Preload 核心模块 - API 工厂
 * 使用工厂模式创建统一的 API 模块
 */

/**
 * API 方法定义
 * 定义单个 API 方法的类型
 */
export interface APIMethodDefinition<TArgs extends unknown[] = unknown[], TReturn = unknown> {
  /** IPC 通道名称 */
  channel: string;
  /** 方法实现（可选，默认使用 safeInvoke） */
  implementation?: (...args: TArgs) => Promise<TReturn>;
}

/**
 * 创建 API 方法（工厂方法）
 * @param definition - API 方法定义
 * @returns API 方法实现
 */
export function createAPIMethod<TArgs extends unknown[] = unknown[], TReturn = unknown>(
  definition: APIMethodDefinition<TArgs, TReturn>
): (...args: TArgs) => Promise<TReturn> {
  if (definition.implementation) {
    return definition.implementation;
  }

  return async (...args: TArgs): Promise<TReturn> => {
    return safeInvoke<TReturn>(definition.channel, ...args);
  };
}

/**
 * 创建 API 模块（工厂方法）
 * 根据方法定义批量创建 API 方法
 * @param name - 模块名称
 * @param methods - 方法定义对象
 * @returns API 模块对象
 */
export function createAPIModule(
  name: string,
  methods: Record<string, APIMethodDefinition>
): APIModule {
  const api: Record<string, (...args: unknown[]) => Promise<unknown>> = {};

  for (const [methodName, definition] of Object.entries(methods)) {
    api[methodName] = createAPIMethod(definition);
  }

  return {
    name,
    api,
  };
}

