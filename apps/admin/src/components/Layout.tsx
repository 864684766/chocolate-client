import { type JSX, useState } from 'react';

/**
 * 管理端应用布局组件
 * 提供应用的基础布局结构
 * @returns {JSX.Element} 布局组件
 */
function Layout(): JSX.Element {
  const [version, setVersion] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  /**
   * 测试 IPC 通信 - 获取应用版本
   */
  const handleGetVersion = async (): Promise<void> => {
    if (window.electronAPI?.app) {
      const v = await window.electronAPI.app.getVersion();
      setVersion(v);
      console.log('渲染进程收到版本:', v);
    }
  };

  /**
   * 测试 IPC 通信 - 获取平台信息
   */
  const handleGetPlatform = async (): Promise<void> => {
    if (window.electronAPI?.app) {
      const p = await window.electronAPI.app.getPlatform();
      setPlatform(p);
      console.log('渲染进程收到平台:', p);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      <header className="border-b border-border p-4 bg-card">
        <h1 className="text-xl font-semibold text-foreground">Chocolate Admin</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <p className="text-foreground mb-4">管理端应用界面</p>
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-card-foreground mb-2">测试 Tailwind CSS</h2>
            <p className="text-muted-foreground">
              如果这个卡片有样式，说明 Tailwind CSS 正常工作。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-card-foreground mb-2">测试 IPC 通信</h2>
            <div className="space-y-2">
              <button
                onClick={handleGetVersion}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                获取应用版本
              </button>
              {version && <p className="text-muted-foreground">版本: {version}</p>}
              <button
                onClick={handleGetPlatform}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                获取平台信息
              </button>
              {platform && <p className="text-muted-foreground">平台: {platform}</p>}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              提示：主进程的 console.log 输出在启动应用的终端窗口中查看
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
