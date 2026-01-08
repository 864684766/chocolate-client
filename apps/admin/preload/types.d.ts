/**
 * Preload 类型定义文件
 * 定义暴露给渲染进程的 Electron API 类型
 * 当添加新的功能模块时，需要在此文件中更新类型定义
 */

/**
 * Electron API 类型定义
 * 根据注册的模块动态定义类型
 */
interface ElectronAPI {
  /**
   * 应用相关 API
   */
  app: {
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
  };

  // 未来扩展的类型定义示例：
  // /**
  //  * 文件操作相关 API
  //  */
  // file?: {
  //   /**
  //    * 读取文件内容
  //    * @param path - 文件路径
  //    * @returns {Promise<string>} 文件内容
  //    */
  //   read: (path: string) => Promise<string>;
  //
  //   /**
  //    * 写入文件内容
  //    * @param path - 文件路径
  //    * @param content - 文件内容
  //    * @returns {Promise<void>}
  //    */
  //   write: (path: string, content: string) => Promise<void>;
  // };
}

/**
 * 扩展 Window 接口，添加 electronAPI 属性
 */
declare global {
  interface Window {
    /**
     * Electron API 对象
     * 通过 contextBridge 暴露给渲染进程的安全 API
     */
    electronAPI: ElectronAPI;
  }
}

/**
 * 导出类型定义，供其他文件使用
 */
export type { ElectronAPI };
