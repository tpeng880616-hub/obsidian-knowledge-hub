<template>
  <div class="flex items-center justify-center" :class="sizeClass">
    <div 
      class="animate-spin rounded-full border-2 border-cyber-bg-secondary"
      :class="[sizeClass, borderClass]"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const sizeClass = computed(() => ({
  sm: 'h-6 w-6',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
}[props.size]))

const borderClass = computed(() => ({
  sm: 'border-t-cyber-primary border-b-cyber-primary',
  md: 'border-t-2 border-b-2 border-cyber-primary',
  lg: 'border-t-4 border-b-4 border-cyber-primary'
}[props.size]))
</script>
