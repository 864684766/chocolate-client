import { configureStore } from '@reduxjs/toolkit';

/**
 * 管理端应用 Redux Store 配置
 * 配置 Redux Toolkit store，后续添加 slice 时在这里注册
 */

/**
 * Redux Store 实例
 * 使用 configureStore 创建，自动包含 Redux DevTools 支持
 */
export const store = configureStore({
  reducer: {
    // 占位 reducer，避免 Redux 报错
    // 后续添加的 slice 在这里注册
    _placeholder: (state = {}) => state,
  },
});

/**
 * Store 的根状态类型
 * 用于 TypeScript 类型推断
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Store 的 dispatch 类型
 * 用于 TypeScript 类型推断
 */
export type AppDispatch = typeof store.dispatch;
