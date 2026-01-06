/**
 * pnpm 钩子文件
 * 用于在安装时执行自定义操作
 */
function readPackage(pkg, context) {
  // 允许 electron 运行安装后脚本
  if (pkg.name === 'electron') {
    pkg.scripts = pkg.scripts || {};
    // 确保安装后脚本可以运行
    if (!pkg.scripts.postinstall) {
      // electron 的 postinstall 脚本在 package.json 中已经定义
    }
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
