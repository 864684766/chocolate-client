import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 共享工具函数库
 * 包含两个应用共用的工具函数
 */

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 处理条件类名，使用 tailwind-merge 合并冲突的 Tailwind 类
 * @param inputs - 类名输入，可以是字符串、对象、数组等
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

