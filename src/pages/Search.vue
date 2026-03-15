<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-cyber-primary mb-4" style="text-shadow: 0 0 10px var(--cyber-primary)">
        搜索结果
      </h1>
      
      <div class="flex items-center gap-4">
        <div class="flex-1 relative">
          <input
            v-model="query"
            type="text"
            placeholder="搜索笔记..."
            class="w-full bg-cyber-bg-secondary border border-cyber-border rounded-lg pl-10 pr-4 py-3 text-cyber-text placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:shadow-neon-cyan transition-all"
            @input="doSearch"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span class="text-gray-500 whitespace-nowrap">
          {{ results.length }} 个结果
        </span>
      </div>
    </header>
    
    <!-- Results -->
    <div v-if="results.length > 0" class="space-y-4">
      <router-link
        v-for="result in results"
        :key="result.slug"
        :to="`/note/${result.slug}`"
        class="block p-4 rounded-lg bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-primary hover:shadow-neon-cyan transition-all group"
      >
        <div class="flex items-start justify-between gap-4 mb-2">
          <h3 class="text-lg font-medium text-cyber-text group-hover:text-cyber-primary transition-colors">
            {{ result.title }}
          </h3>
          <span 
            class="text-xs px-2 py-0.5 rounded whitespace-nowrap"
            :class="result.matchType === 'title' ? 'bg-cyber-primary/20 text-cyber-primary' : 'bg-cyber-secondary/20 text-cyber-secondary'"
          >
            {{ result.matchType === 'title' ? '标题匹配' : '内容匹配' }}
          </span>
        </div>
        
        <p 
          class="text-sm text-gray-400 line-clamp-3"
          v-html="result.snippet"
        ></p>
        
        <div v-if="result.tags?.length" class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tag in result.tags"
            :key="tag"
            class="text-xs px-2 py-0.5 rounded bg-cyber-bg text-cyber-secondary"
          >
            #{{ tag }}
          </span>
        </div>
      </router-link>
    </div>
    
    <!-- No Results -->
    <div v-else-if="query && hasSearched" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-400 mb-2">没有找到结果</h2>
      <p class="text-gray-500">试试其他关键词</p>
    </div>
    
    <!-- Initial State -->
    <div v-else class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-gray-400 mb-2">开始搜索</h2>
      <p class="text-gray-500">输入关键词搜索笔记标题和内容</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { search } from '../utils/search'

const route = useRoute()
const router = useRouter()

const query = ref('')
const results = ref([])
const hasSearched = ref(false)

function doSearch() {
  if (query.value.trim()) {
    results.value = search(query.value)
    hasSearched.value = true
    // Update URL
    router.replace({ path: '/search', query: { q: query.value } })
  } else {
    results.value = []
    hasSearched.value = false
  }
}

watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      query.value = newQuery
      doSearch()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (route.query.q) {
    query.value = route.query.q
    doSearch()
  }
})
</script>
