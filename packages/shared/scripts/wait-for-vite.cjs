/**
 * 等待 Vite 开发服务器启动的脚本
 * 通过检查 .vite-port 文件来获取实际端口，并验证服务器是否可用
 * 
 * 使用方法：
 * node ../../packages/shared/scripts/wait-for-vite.cjs
 * 或
 * node @shared/scripts/wait-for-vite.cjs
 * 
 * @param {string} portFile - 端口文件路径（可选，默认从环境变量或当前目录查找）
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// 端口文件路径（从命令行参数或环境变量获取，否则使用默认路径）
const portFileArg = process.argv[2];
const portFile = portFileArg 
  ? path.resolve(portFileArg)
  : path.join(process.cwd(), '.vite-port');

// 最大尝试次数（60次 × 500ms = 30秒）
const maxAttempts = 60;
// 检查间隔（毫秒）
const checkInterval = 500;

let attempts = 0;

/**
 * 检查端口文件是否存在，并验证服务器是否可用
 */
function checkPortFile() {
  if (fs.existsSync(portFile)) {
    try {
      const port = fs.readFileSync(portFile, 'utf-8').trim();
      
      if (!port) {
        // 文件存在但内容为空，继续等待
        if (attempts++ < maxAttempts) {
          setTimeout(checkPortFile, checkInterval);
          return;
        } else {
          console.error('❌ Port file exists but is empty');
          process.exit(1);
        }
      }

      // 验证端口是否真的可用（通过 HTTP 请求）
      const req = http.get(`http://localhost:${port}`, (res) => {
        console.log(`✅ Vite server is ready on port ${port}`);
        process.exit(0);
      });

      req.on('error', (err) => {
        // 端口文件存在但服务器还没启动，继续等待
        if (attempts++ < maxAttempts) {
          setTimeout(checkPortFile, checkInterval);
        } else {
          console.error(`❌ Vite server failed to start on port ${port}: ${err.message}`);
          process.exit(1);
        }
      });

      req.setTimeout(1000, () => {
        req.destroy();
        if (attempts++ < maxAttempts) {
          setTimeout(checkPortFile, checkInterval);
        } else {
          console.error(`❌ Vite server timeout on port ${port}`);
          process.exit(1);
        }
      });
    } catch (error) {
      console.error(`❌ Error reading port file: ${error.message}`);
      process.exit(1);
    }
  } else {
    // 端口文件不存在，继续等待
    if (attempts++ < maxAttempts) {
      setTimeout(checkPortFile, checkInterval);
    } else {
      console.error(`❌ Port file not found after 30 seconds: ${portFile}`);
      process.exit(1);
    }
  }
}

// 开始检查
console.log(`⏳ Waiting for Vite server to start... (checking: ${portFile})`);
checkPortFile();

