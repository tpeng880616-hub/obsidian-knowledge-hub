<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">
        <span class="neon-text-cyan">Obsidian</span>
        <span class="text-cyber-text"> 知识库</span>
      </h1>
      <p class="text-gray-400 text-lg">
        探索、连接、发现知识的无限可能
      </p>
    </div>
    
    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
      <router-link
        to="/tags"
        class="p-6 rounded-xl bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-secondary hover:shadow-neon-pink transition-all group"
      >
        <svg class="w-8 h-8 mx-auto mb-3 text-cyber-secondary group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <div class="text-center">
          <div class="text-lg font-semibold text-cyber-text">标签</div>
          <div class="text-sm text-gray-500">按分类浏览</div>
        </div>
      </router-link>
      
      <router-link
        to="/note/index"
        class="p-6 rounded-xl bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-primary hover:shadow-neon-cyan transition-all group"
      >
        <svg class="w-8 h-8 mx-auto mb-3 text-cyber-primary group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <div class="text-center">
          <div class="text-lg font-semibold text-cyber-text">指南</div>
          <div class="text-sm text-gray-500">开始使用</div>
        </div>
      </router-link>
      
      <router-link
        to="/note/双向链接"
        class="p-6 rounded-xl bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-accent hover:shadow-[0_0_10px_#ffff00] transition-all group"
      >
        <svg class="w-8 h-8 mx-auto mb-3 text-cyber-accent group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <div class="text-center">
          <div class="text-lg font-semibold text-cyber-text">链接</div>
          <div class="text-sm text-gray-500">探索关联</div>
        </div>
      </router-link>
    </div>
    
    <!-- Recent Notes -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-cyber-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        最近更新
      </h2>
      
      <div class="space-y-3">
        <router-link
          v-for="note in recentNotes"
          :key="note.slug"
          :to="`/note/${note.slug}`"
          class="block p-4 rounded-lg bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-primary/50 hover:bg-cyber-bg transition-all group"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-medium text-cyber-text group-hover:text-cyber-primary transition-colors truncate">
                {{ note.title }}
              </h3>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">
                {{ getExcerpt(note.content) }}
              </p>
            </div>
            <span class="text-xs text-gray-600 whitespace-nowrap">
              {{ formatDate(note.modified) }}
            </span>
          </div>
          
          <div v-if="note.tags?.length" class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="tag in note.tags.slice(0, 3)"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded bg-cyber-bg text-cyber-secondary"
            >
              #{{ tag }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
    
    <!-- Tags Cloud -->
    <div>
      <h2 class="text-xl font-semibold text-cyber-text mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-cyber-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        热门标签
      </h2>
      
      <div class="flex flex-wrap gap-2">
        <router-link
          v-for="tag in topTags"
          :key="tag.tag"
          :to="`/tags/${tag.tag}`"
          class="px-3 py-1.5 rounded-lg bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-secondary hover:shadow-neon-pink transition-all text-sm"
        >
          <span class="text-cyber-secondary">#{{ tag.tag }}</span>
          <span class="text-gray-500 ml-1">({{ tag.count }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getRecentNotes, getAllTags } from '../data/notes'

const recentNotes = computed(() => getRecentNotes(5))
const allTags = getAllTags()
const topTags = computed(() => allTags.slice(0, 8))

function getExcerpt(content) {
  // Remove markdown syntax
  return content
    .replace(/#+\s/g, '')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/[#*`_]/g, '')
    .slice(0, 150)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN')
}
</script>
