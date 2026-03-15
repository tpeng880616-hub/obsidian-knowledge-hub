<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-cyber-bg-secondary/95 backdrop-blur-sm border-b border-cyber-border">
    <div class="flex items-center justify-between h-16 px-4 lg:px-6">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-lg bg-cyber-bg flex items-center justify-center neon-border group-hover:animate-glow transition-all">
          <span class="text-2xl font-bold neon-text-cyan">O</span>
        </div>
        <span class="hidden sm:block text-lg font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors">
          Knowledge Hub
        </span>
      </router-link>
      
      <!-- Search -->
      <div class="flex-1 max-w-xl mx-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索笔记... (Ctrl+K)"
            class="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-2 text-cyber-text placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:shadow-neon-cyan transition-all"
            @keydown.enter="handleSearch"
            @keydown.ctrl.k.prevent="focusSearch"
            ref="searchInput"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block px-2 py-0.5 text-xs text-gray-500 bg-cyber-bg-secondary rounded border border-cyber-border">
            Ctrl+K
          </kbd>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2">
        <router-link
          to="/graph"
          class="p-2 rounded-lg hover:bg-cyber-bg transition-colors text-gray-400 hover:text-cyber-primary"
          title="知识图谱"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </router-link>
        <router-link
          to="/tags"
          class="p-2 rounded-lg hover:bg-cyber-bg transition-colors text-gray-400 hover:text-cyber-secondary"
          title="标签"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['search'])

const searchQuery = ref('')
const searchInput = ref(null)
const router = useRouter()

function handleSearch() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

function focusSearch() {
  searchInput.value?.focus()
}

// Keyboard shortcut
function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    focusSearch()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
