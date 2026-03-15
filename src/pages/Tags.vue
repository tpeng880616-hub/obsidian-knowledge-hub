<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-cyber-primary mb-2" style="text-shadow: 0 0 10px var(--cyber-primary)">
        标签索引
      </h1>
      <p class="text-gray-400">
        共 {{ tags.length }} 个标签
      </p>
    </header>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <router-link
        v-for="tag in sortedTags"
        :key="tag.tag"
        :to="`/tags/${tag.tag}`"
        class="p-4 rounded-xl bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-secondary hover:shadow-neon-pink transition-all group"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-2xl">#</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-cyber-bg text-gray-400">
            {{ tag.count }}
          </span>
        </div>
        <div class="text-lg font-medium text-cyber-text group-hover:text-cyber-secondary transition-colors">
          {{ tag.tag }}
        </div>
      </router-link>
    </div>
    
    <div v-if="tags.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      <p class="text-gray-500">暂无标签</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getAllTags } from '../data/notes'

const tags = getAllTags()

const sortedTags = computed(() => {
  return [...tags].sort((a, b) => b.count - a.count)
})
</script>
