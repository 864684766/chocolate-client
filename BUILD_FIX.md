# Electron Builder 构建问题修复指南

## 问题描述

在 Windows 上使用 Electron Builder 构建时，会遇到以下错误：
```
ERROR: Cannot create symbolic link : 客户端没有所需的特权
```

**根本原因：** Electron Builder 会下载 `winCodeSign` 工具包用于代码签名，即使禁用了签名。该工具包包含 macOS 的符号链接文件（.dylib），在 Windows 上解压时需要管理员权限。

## 解决方案

### ✅ 方案 1：使用管理员权限运行构建（推荐）

这是最简单直接的解决方案：

1. **以管理员身份打开 PowerShell 或 CMD**
   - 右键点击 PowerShell/CMD
   - 选择"以管理员身份运行"

2. **运行构建命令：**
   ```bash
   cd D:\test\chocolate-client
   pnpm build:client
   ```

### ✅ 方案 2：跳过打包步骤（开发阶段推荐）

对于开发阶段，可以只构建代码，不打包安装包：

```bash
# 只构建代码，不打包
pnpm --filter client build:no-pack
pnpm --filter admin build:no-pack
```

这样可以得到构建好的文件，用于测试 Electron 应用，但不会生成安装包。

### ✅ 方案 3：手动处理缓存

如果不想使用管理员权限，可以手动处理：

1. **清理缓存：**
   ```bash
   rmdir /s /q "C:\Users\%USERNAME%\AppData\Local\electron-builder\Cache\winCodeSign"
   ```

2. **以管理员权限手动解压工具包：**
   - 下载 winCodeSign 工具包到缓存目录
   - 使用 7-Zip 以管理员权限解压
   - 忽略符号链接错误（这些是 macOS 文件，Windows 不需要）

3. **然后运行构建命令**

### ✅ 方案 4：使用 CI/CD 环境

在生产环境中，建议使用 CI/CD 进行构建：
- GitHub Actions
- GitLab CI
- Jenkins
等 CI/CD 环境通常有管理员权限或更好的权限配置

## 当前配置状态

- ✅ 已配置使用 `portable` 目标格式
- ✅ 已完全禁用代码签名
- ✅ Windows 上已移除 macOS 配置
- ✅ 已添加 `build:no-pack` 脚本用于跳过打包

## 开发建议

**日常开发：**
```bash
# 使用开发模式，不需要构建
pnpm dev:client
pnpm dev:admin
```

**测试构建：**
```bash
# 只构建代码，不打包（避免权限问题）
pnpm --filter client build:no-pack
pnpm --filter admin build:no-pack
```

**生产构建：**
```bash
# 需要管理员权限
pnpm build:client
pnpm build:admin
```

## 相关链接

- [Electron Builder 签名文档](https://www.electron.build/code-signing)
- [Windows 符号链接权限问题](https://github.com/electron-userland/electron-builder/issues/xxx)
