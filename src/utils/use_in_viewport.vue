<template>
  <div ref="elementRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  onVisibilityChange: (isInViewPort: boolean) => void
}

const props = defineProps<Props>()

const elementRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  const wrappedCb: IntersectionObserverCallback = (entries) => {
    props.onVisibilityChange(entries.some((e) => e.isIntersecting))
  }

  const observer = new IntersectionObserver(wrappedCb, options)

  if (elementRef.value) {
    observer.observe(elementRef.value)
  }

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
