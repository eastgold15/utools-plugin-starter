# uTools Plugin TypeScript Starter

🚀 一个现代化的 uTools 插件开发启动模板，集成了最佳实践和开发工具链

## ✨ 特性

### 🎯 核心功能
- **TypeScript** - 完整的类型安全支持
- **Vue 3** - 现代化的响应式框架
- **Vite** - 极速的开发构建工具
- **uTools API** - 完整的 uTools 插件 API 类型定义

### 🎨 样式解决方案
- **UnoCSS** - 原子化 CSS 引擎，与 src 目录完美集成
- **预设主题** - 自定义 CSS 变量主题系统
- **Modern CSS Reset** - 现代化的样式重置

### 🛠️ 开发体验
- **组件自动导入** - 无需手动导入 Vue 组件
- **API 自动导入** - Vue 和 Vue Router API 自动导入
- **文件路由** - 基于文件系统的路由自动生成
- **模块自动加载** - 智能模块导入

### 📋 代码质量
- **Biome** - 现代化的代码格式化和 Linting 工具
- **Lefthook** - Git 提交规范和自动化检查
- **TypeScript 严格模式** - 完整的类型检查

### 🔧 VS Code 集成
- 优化的 VS Code 配置
- 智能代码提示和自动完成
- 集成的调试支持

## 🚀 快速开始

### 环境要求
- Node.js >= 16
- pnpm >= 8

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 代码检查和格式化
```bash
pnpm check
```

## 📁 项目结构

```
├── src/                    # 源代码目录
│   ├── components/         # Vue 组件
│   ├── pages/             # 页面组件（自动路由）
│   ├── shared/            # 共享工具
│   └── main.ts            # 应用入口
├── shared/                # 共享模块
├── types/                 # 类型定义
│   ├── generated/         # 自动生成的类型
│   └── global.d.ts        # 全局类型
├── preload.ts             # uTools 预加载脚本
├── plugin.json            # uTools 插件配置
├── biome.json             # Biome 配置
├── lefthook.yml           # Git hooks 配置
└── unocss.config.ts       # UnoCSS 配置
```

## 🎨 样式系统

### UnoCSS 集成
项目集成了 UnoCSS 原子化 CSS 引擎，支持：
- **Attributify 模式** - 属性化的 CSS 类名
- **图标预设** - 内置图标支持
- **自定义主题** - CSS 变量主题系统
- **快捷方式** - 预定义的组件样式

### 主题定制
在 `unocss.config.ts` 中定义主题变量：
```typescript
const selfTheme = {
  colors: {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    background: "var(--background)",
  },
};
```

## 🔧 开发工具

### Biome 代码质量
- **格式化** - 统一的代码风格
- **Linting** - 代码质量检查
- **快速修复** - 自动修复常见问题

### Lefthook Git 集成
- **预提交检查** - 自动格式化和检查
- **并行执行** - 提高检查效率
- **暂存文件处理** - 只检查变更文件

## 📦 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | ^3.5.17 | 渐进式 JavaScript 框架 |
| [Vite](https://vitejs.dev/) | ^6.3.5 | 下一代前端构建工具 |
| [TypeScript](https://www.typescriptlang.org/) | ^5.8.3 | JavaScript 的超集 |
| [UnoCSS](https://unocss.dev/) | ^66.3.1 | 即时原子化 CSS 引擎 |
| [Biome](https://biomejs.dev/) | - | 现代化的代码工具链 |
| [Lefthook](https://github.com/evilmartians/lefthook) | ^1.11.14 | Git hooks 管理器 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](./LICENSE)
