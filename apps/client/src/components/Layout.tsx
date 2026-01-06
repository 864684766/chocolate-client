import { type JSX } from 'react';

/**
 * 客户端应用布局组件
 * 提供应用的基础布局结构
 * @returns {JSX.Element} 布局组件
 */
function Layout(): JSX.Element {
  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      <header className="border-b border-border p-4 bg-card">
        <h1 className="text-xl font-semibold text-foreground">Chocolate Client</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <p className="text-foreground mb-4">客户端应用界面</p>
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-card-foreground mb-2">测试 Tailwind CSS</h2>
            <p className="text-muted-foreground">
              如果这个卡片有样式，说明 Tailwind CSS 正常工作。
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              测试按钮
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
