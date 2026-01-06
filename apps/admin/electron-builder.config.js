/**
 * Electron Builder 配置文件 - 管理端应用
 * 配置 Windows 和 macOS 平台的打包选项
 */
const isWindows = process.platform === 'win32';

const config = {
  appId: 'com.chocolate.admin',
  productName: 'Chocolate Admin',
  directories: {
    output: 'release',
  },
  files: ['dist/**/*', 'dist-electron/**/*', 'package.json'],
  win: {
    // 使用 portable 目标，不需要签名工具
    target: 'portable',
    icon: 'build/icon.ico',
    // 完全禁用代码签名
    sign: null,
    signingHashAlgorithms: [],
    verifyUpdateCodeSignature: false,
    signDlls: false,
    certificateFile: null,
    certificatePassword: null,
  },
  portable: {
    artifactName: '${productName}-${version}-portable.${ext}',
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
  // 完全禁用代码签名
  afterSign: null,
  beforeBuild: null,
  sign: null,
  forceCodeSigning: false,
};

// 只在非 Windows 平台添加 macOS 配置
if (!isWindows) {
  config.mac = {
    target: 'dmg',
    icon: 'build/icon.icns',
    category: 'public.app-category.utilities',
    identity: null,
  };
}

export default config;
