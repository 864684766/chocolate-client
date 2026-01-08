/**
 * Preload 工具模块 - 参数验证器
 * 提供统一的参数验证功能
 */

/**
 * 验证参数是否为字符串类型
 * @param value - 待验证的值
 * @param paramName - 参数名称（用于错误信息）
 * @returns 是否为字符串
 * @throws {Error} 如果参数不是字符串类型
 */
export function validateString(value: unknown, paramName: string): value is string {
  if (typeof value !== 'string') {
    throw new Error(`Invalid parameter: ${paramName} must be a string`);
  }
  return true;
}

/**
 * 验证参数是否为数字类型
 * @param value - 待验证的值
 * @param paramName - 参数名称（用于错误信息）
 * @returns 是否为数字
 * @throws {Error} 如果参数不是数字类型
 */
export function validateNumber(value: unknown, paramName: string): value is number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Invalid parameter: ${paramName} must be a number`);
  }
  return true;
}

/**
 * 验证参数是否为数组类型
 * @param value - 待验证的值
 * @param paramName - 参数名称（用于错误信息）
 * @returns 是否为数组
 * @throws {Error} 如果参数不是数组类型
 */
export function validateArray(value: unknown, paramName: string): value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid parameter: ${paramName} must be an array`);
  }
  return true;
}

