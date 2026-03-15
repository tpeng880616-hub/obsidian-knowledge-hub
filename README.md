# Obsidian Knowledge Hub

🦐 基于 Obsidian 笔记的静态知识库网站

## 功能特性

- 🔍 **全文搜索** - FlexSearch 实时搜索
- 🔗 **双向链接** - 支持 [[wiki-link]] 语法
- 📊 **反向链接** - 查看引用当前笔记的所有笔记
- 🏷️ **标签系统** - #tag 标签分类
- 📁 **文件夹导航** - 侧边栏目录结构
- 🕸️ **知识图谱** - D3.js 可视化 /graph 路由
- 🎨 **赛博朋克主题** - 霓虹灯效果

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或连接 GitHub 仓库自动部署。

### Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod
```

### 手动部署

构建产物在 `dist` 目录，可部署到任意静态托管服务。

## 项目结构

```
├── src/
│   ├── components/   # Vue 组件
│   ├── data/         # 笔记数据
│   ├── pages/        # 页面组件
│   ├── utils/        # 工具函数
│   ├── App.vue       # 根组件
│   └── main.js       # 入口
├── dist/             # 构建产物
└── vercel.json       # Vercel 配置
```

## 添加笔记

在 `src/data/notes.js` 中添加笔记对象：

```javascript
{
  slug: 'note-slug',
  title: '笔记标题',
  content: 'Markdown 内容...',
  tags: ['tag1', 'tag2'],
  created: '2024-01-01',
  modified: '2024-01-15'
}
```
