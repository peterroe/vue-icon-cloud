<template>
  <UseInViewport :onVisibilityChange="onVisibilityChange">
    <div :id="state.canvasContainerId" v-bind="containerProps">
      <canvas
        :id="state.canvasId"
        :style="{ width: '100%', maxWidth: '70vh' }"
        :width="1000"
        :height="1000"
        v-bind="canvasProps"
        ref="canvasRef"
      >
        <slot></slot>
      </canvas>
    </div>
  </UseInViewport>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, useSlots, watch, nextTick, computed } from 'vue'
import UseInViewport from '../utils/use_in_viewport.vue'
import { tagCanvasString } from '../lib/tag_canvas_string'
import { guid } from '../utils/guid'

let isScriptLoaded = false

const slots = useSlots()

const slotsChildren = computed(() => {
  if(!slots.default) {
    return []
  }
    
  return slots.default()[0].children
})

watch(() => slotsChildren.value, async () => {
  await nextTick()
  eval(`TagCanvas.Start('${state.canvasId}', null, ${ops})`)
})

interface Props {
  options?: Record<string, any>
  containerProps?: Record<string, any>
  canvasProps?: Record<string, any>
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  containerProps: () => ({}),
  canvasProps: () => ({}),
  id: () => guid()
})

const mounted = ref(false)
const state = reactive({
  canvasContainerId: 'canvas-container-' + props.id,
  canvasId: 'canvas-' + props.id,
  hasStarted: false
})

const tr = (fn: () => void) => {
  try {
    fn()
  } catch (e) {
    try {
      fn()
    } catch (e) {}
  }
}

const canvasRef = ref<HTMLElement | null>(null)

if (!isScriptLoaded) {
  eval(tagCanvasString)
  isScriptLoaded = true
}

onMounted(() => {
  mounted.value = true
})

onUnmounted(() => {
  tr(() => {
    eval(`TagCanvas.Delete('${state.canvasId}')`)
  })
})


const supportsTouch = typeof window !== 'undefined'
  ? 'ontouchstart' in window || navigator.maxTouchPoints
  : false

const ops = JSON.stringify({
  dragControl: supportsTouch,
  maxSpeed: supportsTouch ? 0.01 : 0.05,
  textFont: null,
  textColour: null,
  ...props.options
})

const onVisibilityChange = (isVisible: boolean) => {
  console.log('onVisibilityChange', isVisible)
  tr(() => {
    if (isVisible && mounted.value) {
      if (!isScriptLoaded) {
        eval(tagCanvasString)
        isScriptLoaded = true
      }

      if (state.hasStarted) {
        eval(`TagCanvas.Resume('${state.canvasId}')`)
      } else {
        try {
          eval(`TagCanvas.Start('${state.canvasId}', null, ${ops})`)
        } catch (e) {
          const el = document.getElementById(state.canvasContainerId)
          if (el) {
            el.style.display = 'none'
          }
          throw e
        }
      }
    } else {
      if (state.hasStarted) {
        eval(`TagCanvas.Pause('${state.canvasId}')`)
      }
    }
  })
}
</script>
