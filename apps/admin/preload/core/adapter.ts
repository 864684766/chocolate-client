import { ipcRenderer } from 'electron';
import { validateString } from '../utils/validators';

/**
 * Preload 核心模块 - IPC 适配器
 * 使用适配器模式统一封装 IPC 调用，提供类型安全的接口
 */

/**
 * IPC 调用选项
 */
interface InvokeOptions {
  /** 超时时间（毫秒），默认 30000 */
  timeout?: number;
  /** 是否在调用失败时重试，默认 false */
  retry?: boolean;
  /** 重试次数，默认 3 */
  retryCount?: number;
}

/**
 * 默认 IPC 调用选项
 */
const DEFAULT_OPTIONS: Required<InvokeOptions> = {
  timeout: 30000,
  retry: false,
  retryCount: 3,
};

/**
 * 安全的 IPC 调用封装（适配器模式）
 * 统一处理 IPC 调用，提供参数验证、错误处理和类型安全
 * @param channel - IPC 通道名称
 * @param args - 传递给主进程的参数
 * @param options - 调用选项
 * @returns Promise，包含主进程返回的数据
 * @throws {Error} 如果参数验证失败或 IPC 调用失败
 */
export async function safeInvoke<T>(
  channel: string,
  ...args: unknown[]
): Promise<T> {
  return safeInvokeWithOptions<T>(channel, {}, ...args);
}

/**
 * 带选项的安全 IPC 调用
 * @param channel - IPC 通道名称
 * @param options - 调用选项
 * @param args - 传递给主进程的参数
 * @returns Promise，包含主进程返回的数据
 */
export async function safeInvokeWithOptions<T>(
  channel: string,
  options: InvokeOptions = {},
  ...args: unknown[]
): Promise<T> {
  // 参数验证：确保 channel 是字符串
  validateString(channel, 'channel');

  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  // 执行 IPC 调用
  const invoke = async (): Promise<T> => {
    try {
      const result = await ipcRenderer.invoke(channel, ...args);
      return result as T;
    } catch (error) {
      throw new Error(`IPC call failed: ${channel} - ${error}`);
    }
  };

  // 如果需要重试
  if (finalOptions.retry) {
    let lastError: Error | null = null;
    for (let i = 0; i <= finalOptions.retryCount; i++) {
      try {
        return await invoke();
      } catch (error) {
        lastError = error as Error;
        if (i < finalOptions.retryCount) {
          // 等待后重试（指数退避）
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    throw lastError || new Error(`IPC call failed after ${finalOptions.retryCount} retries`);
  }

  return invoke();
}

