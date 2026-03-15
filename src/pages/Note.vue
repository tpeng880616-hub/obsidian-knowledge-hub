<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="note">
      <!-- Note Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-cyber-primary mb-4" style="text-shadow: 0 0 10px var(--cyber-primary)">
          {{ note.title }}
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            更新于 {{ formatDate(note.modified) }}
          </span>
          
          <div v-if="note.tags?.length" class="flex flex-wrap gap-2">
            <router-link
              v-for="tag in note.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="tag-link"
            >
              #{{ tag }}
            </router-link>
          </div>
        </div>
      </header>
      
      <!-- Note Content -->
      <article 
        class="markdown-content"
        v-html="renderedContent"
      ></article>
      
      <!-- Backlinks Section -->
      <section v-if="backlinks.length > 0" class="mt-12 pt-8 border-t border-cyber-border">
        <h3 class="text-lg font-semibold text-cyber-text mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-cyber-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          引用此页面的笔记
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <router-link
            v-for="link in backlinks"
            :key="link.slug"
            :to="`/note/${link.slug}`"
            class="p-3 rounded-lg bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-primary hover:shadow-neon-cyan transition-all"
          >
            <span class="text-cyber-text">{{ link.title }}</span>
          </router-link>
        </div>
      </section>
    </div>
    
    <!-- Not Found -->
    <div v-else class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-400 mb-2">笔记未找到</h2>
      <p class="text-gray-500 mb-6">您访问的笔记不存在或已被删除</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-primary text-cyber-bg font-semibold hover:shadow-neon-cyan transition-all"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNoteBySlug, getBacklinks } from '../data/notes'
import { parseMarkdown } from '../utils/markdown'

const route = useRoute()
const note = ref(null)
const backlinks = ref([])

function loadNote() {
  const slug = route.params.slug
  note.value = getNoteBySlug(slug)
  backlinks.value = note.value ? getBacklinks(slug) : []
}

watch(
  () => route.params.slug,
  loadNote,
  { immediate: true }
)

const renderedContent = computed(() => {
  if (!note.value) return ''
  return parseMarkdown(note.value.content).html
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
