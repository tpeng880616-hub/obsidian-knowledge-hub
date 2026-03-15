<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">#</span>
        <h1 class="text-3xl font-bold text-cyber-secondary" style="text-shadow: 0 0 10px var(--cyber-secondary)">
          {{ tag }}
        </h1>
      </div>
      <p class="text-gray-400">
        共 {{ notes.length }} 篇笔记
      </p>
    </header>
    
    <div class="space-y-3">
      <router-link
        v-for="note in notes"
        :key="note.slug"
        :to="`/note/${note.slug}`"
        class="block p-4 rounded-lg bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-secondary hover:shadow-neon-pink transition-all group"
      >
        <h3 class="text-lg font-medium text-cyber-text group-hover:text-cyber-secondary transition-colors">
          {{ note.title }}
        </h3>
        
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="t in note.tags"
            :key="t"
            class="text-xs px-2 py-0.5 rounded"
            :class="t === tag ? 'bg-cyber-secondary/20 text-cyber-secondary' : 'bg-cyber-bg text-gray-500'"
          >
            #{{ t }}
          </span>
        </div>
      </router-link>
    </div>
    
    <div v-if="notes.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-400 mb-2">没有找到笔记</h2>
      <p class="text-gray-500 mb-6">没有标签为 #{{ tag }} 的笔记</p>
      <router-link
        to="/tags"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-secondary text-cyber-bg font-semibold hover:shadow-neon-pink transition-all"
      >
        查看所有标签
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getNotesByTag } from '../data/notes'

const route = useRoute()
const tag = computed(() => route.params.tag)
const notes = computed(() => getNotesByTag(tag.value))
</script>
