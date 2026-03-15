// Sample notes data simulating Obsidian vault
// In production, this would be generated from actual markdown files

export const notes = [
  {
    slug: 'index',
    title: '欢迎来到知识库',
    content: `# 欢迎来到 Obsidian 知识库 🦐

这是一个基于 **Obsidian** 笔记的静态网站，支持双向链接和全文搜索。

## 核心功能

- [[双向链接]] - 支持 [[wiki-link]] 语法
- [[全文搜索]] - 实时搜索笔记内容
- [[标签系统]] - 支持 #tag 标签分类
- [[文件夹导航]] - 侧边栏目录结构

## 开始探索

1. 使用顶部搜索框搜索笔记
2. 点击侧边栏浏览目录
3. 点击任意 [[链接]] 跳转

> "知识是最强大的武器" — 赛博朋克格言

---

标签: #welcome #guide`,
    tags: ['welcome', 'guide'],
    created: '2024-01-01',
    modified: '2024-01-15'
  },
  {
    slug: '双向链接',
    title: '双向链接',
    content: `# 双向链接

双向链接是 Obsidian 的核心功能之一，允许笔记之间相互关联。

## 工作原理

当你使用 [[wiki-link]] 语法链接到另一个笔记时：
- 正向链接：从当前笔记指向目标笔记
- [[反向链接]]：显示所有链接到当前笔记的笔记

## 示例

以下笔记与当前笔记相关：
- [[全文搜索]]
- [[标签系统]]

## 实现方式

在 Markdown 中使用以下语法：

\`\`\`markdown
[[目标笔记]]
[[目标笔记|显示文本]]
\`\`\`

标签: #feature #link`,
    tags: ['feature', 'link'],
    created: '2024-01-02',
    modified: '2024-01-10'
  },
  {
    slug: '反向链接',
    title: '反向链接',
    content: `# 反向链接

反向链接显示所有引用当前笔记的其他笔记。

## 查看反向链接

在页面右侧边栏可以查看当前笔记的反向链接列表。

## 用途

- 追踪笔记间的关联
- 发现隐藏的知识网络
- 理解主题之间的关系

相关链接：[[双向链接]]

标签: #feature #link`,
    tags: ['feature', 'link'],
    created: '2024-01-03',
    modified: '2024-01-12'
  },
  {
    slug: '全文搜索',
    title: '全文搜索',
    content: `# 全文搜索

使用 FlexSearch 实现高性能的客户端搜索。

## 功能特点

- 实时搜索
- 模糊匹配
- 标题和内容搜索
- 高亮显示匹配结果

## 搜索语法

- 直接输入关键词搜索
- 支持中文分词

## 示例

搜索 "链接" 会返回包含链接的笔记，如：
- [[双向链接]]
- [[反向链接]]

标签: #feature #search`,
    tags: ['feature', 'search'],
    created: '2024-01-04',
    modified: '2024-01-14'
  },
  {
    slug: '标签系统',
    title: '标签系统',
    content: `# 标签系统

支持 #tag 语法进行笔记分类。

## 使用方法

在笔记中使用 \`#tag-name\` 语法添加标签：

\`\`\`markdown
这是带有 #标签 的内容
\`\`\`

## 标签页面

- [[tags]] - 查看所有标签
- 点击标签可查看该标签下的所有笔记

## 示例标签

- #feature - 功能特性
- #link - 链接相关
- #search - 搜索相关
- #guide - 指南

标签: #feature #tag`,
    tags: ['feature', 'tag'],
    created: '2024-01-05',
    modified: '2024-01-13'
  },
  {
    slug: '文件夹导航',
    title: '文件夹导航',
    content: `# 文件夹导航

侧边栏显示知识库的文件夹结构。

## 功能

- 展开/折叠文件夹
- 显示笔记数量
- 快速跳转到任意笔记

## 结构

当前知识库包含：
- 指南笔记 (2篇)
- 功能说明 (4篇)

标签: #feature #navigation`,
    tags: ['feature', 'navigation'],
    created: '2024-01-06',
    modified: '2024-01-11'
  },
  {
    slug: 'vue3-教程',
    title: 'Vue 3 教程',
    content: `# Vue 3 教程

Vue 3 是渐进式 JavaScript 框架。

## 核心概念

### 响应式

Vue 3 使用 [[响应式系统]] 管理状态。

### 组合式 API

新的组合式 API 提供更好的代码组织。

\`\`\`javascript
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  return { count, doubled }
}
\`\`\`

## 相关学习

- [[TypeScript 入门]]
- [[Vite 构建工具]]

标签: #vue #javascript #frontend`,
    tags: ['vue', 'javascript', 'frontend'],
    created: '2024-01-07',
    modified: '2024-01-16'
  },
  {
    slug: 'typescript-入门',
    title: 'TypeScript 入门',
    content: `# TypeScript 入门

TypeScript 是 JavaScript 的超集，提供类型系统。

## 基础类型

\`\`\`typescript
let name: string = 'Mick'
let age: number = 25
let isDev: boolean = true
\`\`\`

## 接口

\`\`\`typescript
interface User {
  name: string
  age: number
  email?: string
}
\`\`\`

## 与 Vue 结合

Vue 3 + TypeScript 提供更好的开发体验。

相关学习：[[Vue 3 教程]]

标签: #typescript #javascript`,
    tags: ['typescript', 'javascript'],
    created: '2024-01-08',
    modified: '2024-01-15'
  },
  {
    slug: 'vite-构建工具',
    title: 'Vite 构建工具',
    content: `# Vite 构建工具

Vite 是新一代前端构建工具。

## 特点

- ⚡️ 极速冷启动
- 🔥 热模块替换 (HMR)
- 📦 自动分包

## 使用

\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## 配置

Vite 配置文件：\`vite.config.js\`

\`\`\`javascript
export default {
  plugins: [vue()],
  server: {
    port: 3000
  }
}
\`\`\`

相关：[[Vue 3 教程]]

标签: #vite #build #tool`,
    tags: ['vite', 'build', 'tool'],
    created: '2024-01-09',
    modified: '2024-01-14'
  },
  {
    slug: '响应式系统',
    title: '响应式系统',
    content: `# 响应式系统

Vue 3 的响应式系统是其核心特性。

## 原理

使用 Proxy 代理对象，跟踪依赖变化。

## 核心 API

- \`ref()\` - 基础类型响应式
- \`reactive()\` - 对象响应式
- \`computed()\` - 计算属性
- \`watch()\` - 监听器

## 示例

\`\`\`javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
\`\`\`

学习：[[Vue 3 教程]]

标签: #vue #reactivity`,
    tags: ['vue', 'reactivity'],
    created: '2024-01-10',
    modified: '2024-01-13'
  }
]

// Get all unique tags with counts
export function getAllTags() {
  const tagMap = {}
  notes.forEach(note => {
    note.tags?.forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap).map(([tag, count]) => ({ tag, count }))
}

// Get notes by tag
export function getNotesByTag(tag) {
  return notes.filter(note => note.tags?.includes(tag))
}

// Get backlinks for a note
export function getBacklinks(slug) {
  const backlinks = []
  const targetTitle = notes.find(n => n.slug === slug)?.title || slug
  
  notes.forEach(note => {
    // Check for wiki links
    const linkPattern = new RegExp(`\\[\\[${slug}\\]\\]|\\[\\[${targetTitle}\\]\\]`, 'gi')
    if (linkPattern.test(note.content) && note.slug !== slug) {
      backlinks.push({
        slug: note.slug,
        title: note.title
      })
    }
  })
  return backlinks
}

// Get note by slug
export function getNoteBySlug(slug) {
  return notes.find(n => n.slug === slug)
}

// Get folder structure
export function getFolderStructure() {
  return [
    {
      name: '指南',
      expanded: true,
      children: [
        { name: '欢迎来到知识库', slug: 'index' },
        { name: '双向链接', slug: '双向链接' }
      ]
    },
    {
      name: '功能',
      expanded: true,
      children: [
        { name: '反向链接', slug: '反向链接' },
        { name: '全文搜索', slug: '全文搜索' },
        { name: '标签系统', slug: '标签系统' },
        { name: '文件夹导航', slug: '文件夹导航' }
      ]
    },
    {
      name: '技术',
      expanded: false,
      children: [
        { name: 'Vue 3 教程', slug: 'vue3-教程' },
        { name: 'TypeScript 入门', slug: 'typescript-入门' },
        { name: 'Vite 构建工具', slug: 'vite-构建工具' },
        { name: '响应式系统', slug: '响应式系统' }
      ]
    }
  ]
}

// Get recent notes
export function getRecentNotes(limit = 5) {
  return [...notes]
    .sort((a, b) => new Date(b.modified) - new Date(a.modified))
    .slice(0, limit)
}
