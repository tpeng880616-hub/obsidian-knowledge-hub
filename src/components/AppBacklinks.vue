<template>
  <aside class="w-72 h-[calc(100vh-4rem)] fixed right-0 top-16 bg-cyber-bg-secondary/50 border-l border-cyber-border overflow-y-auto">
    <div class="p-4">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        反向链接
      </h3>
      
      <div v-if="backlinks.length > 0" class="space-y-2">
        <router-link
          v-for="link in backlinks"
          :key="link.slug"
          :to="`/note/${link.slug}`"
          class="block p-2 rounded-lg bg-cyber-bg hover:bg-cyber-bg-secondary border border-cyber-border hover:border-cyber-primary/50 transition-all group"
        >
          <div class="text-sm text-cyber-text group-hover:text-cyber-primary transition-colors">
            {{ link.title }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            引用此页面
          </div>
        </router-link>
      </div>
      
      <div v-else class="text-sm text-gray-500 text-center py-8">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <p>暂无反向链接</p>
      </div>
      
      <!-- Tags Preview -->
      <div v-if="currentTags.length > 0" class="mt-6">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          标签
        </h3>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="tag in currentTags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="tag-link"
          >
            #{{ tag }}
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBacklinks, getNoteBySlug } from '../data/notes'

const route = useRoute()
const backlinks = ref([])
const currentTags = ref([])

function updateBacklinks() {
  const slug = route.params.slug
  if (slug) {
    backlinks.value = getBacklinks(slug)
    const note = getNoteBySlug(slug)
    currentTags.value = note?.tags || []
  } else {
    backlinks.value = []
    currentTags.value = []
  }
}

watch(
  () => route.params.slug,
  updateBacklinks,
  { immediate: true }
)
</script>
