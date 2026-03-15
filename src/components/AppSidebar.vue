<template>
  <aside class="w-64 h-[calc(100vh-4rem)] fixed left-0 top-16 bg-cyber-bg-secondary/50 border-r border-cyber-border overflow-y-auto">
    <div class="p-4">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        目录导航
      </h3>
      
      <nav class="space-y-1">
        <div v-for="folder in folders" :key="folder.name">
          <!-- Folder Header -->
          <button
            @click="toggleFolder(folder)"
            class="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-cyber-text hover:bg-cyber-bg transition-colors group"
          >
            <svg
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-90': folder.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <svg class="w-4 h-4 text-cyber-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span class="flex-1 text-left">{{ folder.name }}</span>
            <span class="text-xs text-gray-600 group-hover:text-cyber-primary">
              {{ folder.children.length }}
            </span>
          </button>
          
          <!-- Folder Children -->
          <transition name="slide">
            <div v-show="folder.expanded" class="ml-4 mt-1 space-y-0.5">
              <router-link
                v-for="child in folder.children"
                :key="child.slug"
                :to="`/note/${child.slug}`"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:text-cyber-primary hover:bg-cyber-bg transition-all"
                active-class="!text-cyber-primary !bg-cyber-bg neon-border"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="truncate">{{ child.name }}</span>
              </router-link>
            </div>
          </transition>
        </div>
      </nav>
    </div>
    
    <!-- Stats -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-border">
      <div class="flex justify-between text-xs text-gray-500">
        <span>共 {{ totalNotes }} 篇笔记</span>
        <span>共 {{ totalTags }} 个标签</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getFolderStructure, getAllTags } from '../data/notes'

const folders = ref(getFolderStructure())
const allTags = getAllTags()

const totalNotes = computed(() => {
  return folders.value.reduce((sum, f) => sum + f.children.length, 0)
})

const totalTags = computed(() => allTags.length)

function toggleFolder(folder) {
  folder.expanded = !folder.expanded
}
</script>
