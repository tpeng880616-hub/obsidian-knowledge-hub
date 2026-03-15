---
title: OpenClaw 部署到 Discord 完全指南
date: 2026-03-15
source: OpenClaw 官方文档
tags: [AI, OpenClaw, Discord, 部署, 工具]
category: AI工具
---

# OpenClaw 部署到 Discord 完全指南

## 什么是 OpenClaw？

OpenClaw 是一个**自托管的 AI 助手网关**，可以将你的 AI 助手连接到各种聊天应用（WhatsApp、Telegram、Discord、iMessage 等）。

**核心特点：**
- 🖥️ **自托管** - 运行在自己的服务器上，数据完全可控
- 🌐 **多通道** - 一个网关同时支持多种聊天平台
- 🤖 **Agent 原生** - 为编程 Agent 设计，支持工具调用、会话管理、多 Agent 路由
- 📱 **移动端支持** - iOS/Android 节点配对，支持语音和相机

---

## 为什么选择 Discord？

Discord 是一个功能强大的社区平台，支持：
- 频道管理
- 私聊 (DM)
- 群聊
- 语音频道
- 机器人 API

通过 OpenClaw，你可以把 AI 助手接入 Discord，实现：
- 📱 在 Discord 中与 AI 对话
- 🧩 创建多个频道，每个频道对应不同的 Agent 会话
- 🔔 自动化任务和提醒

---

## 部署步骤

### 1. 环境准备

确保你的服务器满足以下条件：
- Node.js ≥ 22（推荐）
- npm / pnpm / bun 任选其一

安装 OpenClaw：
```bash
npm install -g openclaw@latest
```

### 2. 创建 Discord 应用和 Bot

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 **New Application**，命名为 "OpenClaw"
3. 点击 **Bot**，设置 Bot 用户名

### 3. 启用特权 Intents

在 Bot 页面滚动到 **Privileged Gateway Intents**，启用：
- ✅ **Message Content Intent**（必需）
- ✅ **Server Members Intent**（推荐，用于角色白名单）
- ⬜ **Presence Intent**（可选）

### 4. 获取 Bot Token

1. 点击 **Reset Token**（首次生成）
2. **复制并保存** Token（不要在聊天中分享！）

### 5. 生成邀请链接并添加 Bot 到服务器

1. 点击 **OAuth2** → 滚动到 **OAuth2 URL Generator**
2. 启用权限：
   - `bot`
   - `applications.commands`
3. 在 **Bot Permissions** 中启用：
   - View Channels
   - Send Messages
   - Read Message History
   - Embed Links
   - Attach Files
   - Add Reactions（可选）
4. 复制生成的 URL，粘贴到浏览器，选择你的服务器并授权

### 6. 获取 Server ID 和 User ID

1. 在 Discord 中启用开发者模式：用户设置 → 高级 → 开启开发者模式
2. 右键服务器图标 → 复制服务器 ID
3. 右键自己的头像 → 复制用户 ID

### 7. 允许服务器成员发送 DM

右键服务器图标 → 隐私设置 → 开启 **Direct Messages**

### 8. 配置 OpenClaw

在运行 OpenClaw 的机器上执行：

```bash
# 设置 Bot Token
openclaw config set channels.discord.token '"YOUR_BOT_TOKEN"' --json
openclaw config set channels.discord.enabled true --json

# 启动网关
openclaw gateway
```

或者使用配置文件：

```json5
{
  channels: {
    discord: {
      enabled: true,
      token: "YOUR_BOT_TOKEN",
    },
  },
}
```

### 9. 完成配对

1. 在 Discord 中 DM 你的 Bot，它会回复一个配对码
2. 将配对码发送给 OpenClaw（通过其他渠道或 CLI）：

```bash
openclaw pairing list discord
openclaw pairing approve discord <CODE>
```

配对码有效期 1 小时。

---

## 进阶配置：设置 Guild Workspace

配置服务器为工作区，每个频道拥有独立的 Agent 会话：

1. 将服务器添加到白名单：

```json5
{
  channels: {
    discord: {
      groupPolicy: "allowlist",
      guilds: {
        YOUR_SERVER_ID: {
          requireMention: true,
        },
      },
    },
  },
}
```

2. 这样 AI 会在服务器的任何频道中响应（需要 @ 提及）

---

## 安全设置

OpenClaw 默认行为：
- **DM 配对模式** - 未知发送者需要配对码
- **白名单机制** - 可配置允许列表

运行检查：
```bash
openclaw doctor
```

---

## 支持的功能

| 功能 | 支持情况 |
|------|----------|
| 文字消息 | ✅ |
| 图片/文件 | ✅ |
| 表情反应 | ✅ |
| 频道消息 | ✅ |
| 私聊 DM | ✅ |
| Slash 命令 | ✅ |

---

## 支持的聊天平台

OpenClaw 支持 20+ 聊天平台：

| 平台 | 类型 | 状态 |
|------|------|------|
| Discord | Bot API | ✅ 已支持 |
| Telegram | Bot API | ✅ 已支持 |
| WhatsApp | Baileys | ✅ 已支持 |
| Slack | Bolt SDK | ✅ 已支持 |
| iMessage | BlueBubbles | ✅ 已支持 |
| Signal | signal-cli | ✅ 已支持 |
| ... | ... | ... |

---

## 快速命令参考

```bash
# 启动网关
openclaw gateway --port 18789 --verbose

# 发送消息
openclaw message send --to +1234567890 --message "Hello"

# 与 Agent 对话
openclaw agent --message "Ship checklist" --thinking high

# 配对管理
openclaw pairing approve discord <CODE>
```

---

## 相关资源

- 📖 [OpenClaw 官网](https://openclaw.ai)
- 📚 [官方文档](https://docs.openclaw.ai)
- 💬 [Discord 社区](https://discord.gg/clawd)
- 🐙 [GitHub](https://github.com/openclaw/openclaw)

---

*本文档基于 OpenClaw 官方文档整理*
