import { createAPIModule } from '../../core/factory';
import type { APIModule } from '../../core/registry';

/**
 * 应用功能模块 - API 实现
 * 定义应用相关的 IPC API 调用
 */

/**
 * IPC 通道名称常量
 */
const IPC_CHANNELS = {
  /** 获取应用版本 */
  GET_VERSION: 'app:getVersion',
  /** 获取平台信息 */
  GET_PLATFORM: 'app:getPlatform',
} as const;

/**
 * 创建应用 API 模块
 * @returns {APIModule} 应用 API 模块
 */
export function createAppAPIModule(): APIModule {
  return createAPIModule('app', {
    getVersion: {
      channel: IPC_CHANNELS.GET_VERSION,
    },
    getPlatform: {
      channel: IPC_CHANNELS.GET_PLATFORM,
    },
  });
}

/**
 * 应用 API 模块实例
 */
export const appAPIModule = createAppAPIModule();

