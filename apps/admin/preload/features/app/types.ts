/**
 * 应用功能模块 - 类型定义
 * 定义应用相关 API 的 TypeScript 类型
 */

/**
 * 应用 API 接口定义
 */
export interface AppAPI {
  /**
   * 获取应用版本
   * @returns {Promise<string>} 应用版本号
   */
  getVersion: () => Promise<string>;

  /**
   * 获取平台信息
   * @returns {Promise<NodeJS.Platform>} 平台名称（如 'win32', 'darwin', 'linux'）
   */
  getPlatform: () => Promise<NodeJS.Platform>;
}

