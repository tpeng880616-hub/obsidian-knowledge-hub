<template>
  <div class="min-h-screen bg-cyber-bg scanlines">
    <!-- Global Loading Indicator -->
    <transition name="slide-down">
      <div v-if="isLoading" class="fixed top-16 left-0 right-0 z-40 h-0.5 bg-cyber-bg-secondary">
        <div class="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary animate-pulse"></div>
      </div>
    </transition>
    
    <!-- Header -->
    <AppHeader @search="handleSearch" />
    
    <!-- Main Layout -->
    <div class="flex pt-16">
      <!-- Sidebar -->
      <AppSidebar class="hidden lg:block" />
      
      <!-- Content -->
      <main class="flex-1 min-w-0 px-4 py-6 lg:px-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- Backlinks Panel -->
      <AppBacklinks class="hidden xl:block" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppBacklinks from './components/AppBacklinks.vue'

const router = useRouter()
const isLoading = ref(false)

// Track navigation
router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  // Small delay for smooth transition
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

function handleSearch(query) {
  if (query.trim()) {
    router.push({ path: '/search', query: { q: query } })
  }
}
</script>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
