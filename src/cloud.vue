<template>
  <canvas
    ref="canvasRef"
    :width="400"
    :height="400"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    class="rounded-lg"
    aria-label="Interactive 3D Icon Cloud"
    role="img"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, h } from 'vue'
import type { Ref } from 'vue'
import { renderToString } from 'vue/server-renderer'

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface Props {
  icons?: any[] // Vue components array
  images?: string[]
}

const props = defineProps<Props>()

// Refs and reactive state
const canvasRef = ref<HTMLCanvasElement | null>(null)
const iconPositions = ref<Icon[]>([])
const rotation = reactive({ x: 0, y: 0 })
const isDragging = ref(false)
const lastMousePos = reactive({ x: 0, y: 0 })
const mousePos = reactive({ x: 0, y: 0 })
const targetRotation = ref<{
  x: number
  y: number
  startX: number
  startY: number
  distance: number
  startTime: number
  duration: number
} | null>(null)

const animationFrameRef = ref<number>()
const rotationRef = reactive(rotation)
const iconCanvasesRef: Ref<HTMLCanvasElement[]> = ref([])
const imagesLoadedRef: Ref<boolean[]> = ref([])

// Utility function
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Initialize icon canvases
async function initializeIconCanvases() {
  if (!props.icons && !props.images) return

  const items = props.icons || props.images || []
  imagesLoadedRef.value = new Array(items.length).fill(false)
  console.log('items', props.images)
  iconCanvasesRef.value = await Promise.all(items.map(async (item, index) => {
    const offscreen = document.createElement('canvas')
    offscreen.width = 40
    offscreen.height = 40
    const offCtx = offscreen.getContext('2d')
    if (offCtx) {
      if (props.images) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = items[index] as string
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
          offCtx.beginPath()
          offCtx.arc(20, 20, 20, 0, Math.PI * 2)
          offCtx.closePath()
          offCtx.clip()
          offCtx.drawImage(img, 0, 0, 40, 40)
          imagesLoadedRef.value[index] = true
        }
      } else {
        // offCtx.scale(0.4, 0.4)
        // offCtx.scale(2, 2)
        // Note: You might need to adjust this part for Vue components
        let svgString = await renderToString(h(item, {
          style: 'font-size: 30px',
          xmlns: "http://www.w3.org/2000/svg"
        }))
        // 往  svg 中加入
        console.log('svgString', svgString)
        const img = new Image()
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString)
        img.onload = () => {
          console.log('imgimgimgimgimgsrc', img.src)
          // img.onload = () => {
          console.log('222222', img.width, img.height)
          // offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
          offscreen.height = img.height
          offscreen.style.height = img.height + 'px'
          offscreen.width = img.width
          offscreen.style.width = img.width + 'px'

          // const offCtx = offscreen.getContext('2d')
          offCtx.drawImage(img, 0, 0)
          imagesLoadedRef.value[index] = true
          // offCtx.fillRect(0, 0, offscreen.width, offscreen.height);

        }
      }
    }
    return offscreen
  }))

  console.log('iconCanvasesRef.value', iconCanvasesRef.value)
}



// Generate initial positions
function generateInitialPositions() {
  const items = props.icons || props.images || []
  const newIcons: Icon[] = []
  const numIcons = items.length || 20

  const offset = 2 / numIcons
  const increment = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < numIcons; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment

    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r

    newIcons.push({
      x: x * 100,
      y: y * 100,
      z: z * 100,
      scale: 1,
      opacity: 1,
      id: i,
    })
  }
  iconPositions.value = newIcons
}

// Event handlers
const handleMouseDown = (e: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect || !canvasRef.value) return

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  iconPositions.value.forEach((icon) => {
    const cosX = Math.cos(rotationRef.x)
    const sinX = Math.sin(rotationRef.x)
    const cosY = Math.cos(rotationRef.y)
    const sinY = Math.sin(rotationRef.y)

    const rotatedX = icon.x * cosY - icon.z * sinY
    const rotatedZ = icon.x * sinY + icon.z * cosY
    const rotatedY = icon.y * cosX + rotatedZ * sinX

    const screenX = canvasRef.value!.width / 2 + rotatedX
    const screenY = canvasRef.value!.height / 2 + rotatedY

    const scale = (rotatedZ + 200) / 300
    const radius = 20 * scale
    const dx = x - screenX
    const dy = y - screenY

    if (dx * dx + dy * dy < radius * radius) {
      const targetX = -Math.atan2(
        icon.y,
        Math.sqrt(icon.x * icon.x + icon.z * icon.z)
      )
      const targetY = Math.atan2(icon.x, icon.z)

      const currentX = rotationRef.x
      const currentY = rotationRef.y
      const distance = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      )

      const duration = Math.min(2000, Math.max(800, distance * 1000))

      targetRotation.value = {
        x: targetX,
        y: targetY,
        startX: currentX,
        startY: currentY,
        distance,
        startTime: performance.now(),
        duration,
      }
      return
    }
  })

  isDragging.value = true
  lastMousePos.x = e.clientX
  lastMousePos.y = e.clientY
}

const handleMouseMove = (e: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (rect) {
    mousePos.x = e.clientX - rect.left
    mousePos.y = e.clientY - rect.top
  }

  if (isDragging.value) {
    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y

    rotationRef.x += deltaY * 0.002
    rotationRef.y += deltaX * 0.002

    lastMousePos.x = e.clientX
    lastMousePos.y = e.clientY
  }
}

const handleMouseUp = () => {
  isDragging.value = false
}

// Animation function
const animate = () => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
  const dx = mousePos.x - centerX
  const dy = mousePos.y - centerY
  const distance = Math.sqrt(dx * dx + dy * dy)
  const speed = 0.003 + (distance / maxDistance) * 0.01

  if (targetRotation.value) {
    const elapsed = performance.now() - targetRotation.value.startTime
    const progress = Math.min(1, elapsed / targetRotation.value.duration)
    const easedProgress = easeOutCubic(progress)

    rotationRef.x =
      targetRotation.value.startX +
      (targetRotation.value.x - targetRotation.value.startX) * easedProgress
    rotationRef.y =
      targetRotation.value.startY +
      (targetRotation.value.y - targetRotation.value.startY) * easedProgress

    if (progress >= 1) {
      targetRotation.value = null
    }
  } else if (!isDragging.value) {
    rotationRef.x += (dy / canvas.height) * speed
    rotationRef.y += (dx / canvas.width) * speed
  }

  iconPositions.value.forEach((icon, index) => {
    const cosX = Math.cos(rotationRef.x)
    const sinX = Math.sin(rotationRef.x)
    const cosY = Math.cos(rotationRef.y)
    const sinY = Math.sin(rotationRef.y)

    const rotatedX = icon.x * cosY - icon.z * sinY
    const rotatedZ = icon.x * sinY + icon.z * cosY
    const rotatedY = icon.y * cosX + rotatedZ * sinX

    const scale = (rotatedZ + 200) / 300
    const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

    ctx.save()
    ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
    ctx.scale(scale, scale)
    ctx.globalAlpha = opacity

    if (props.icons || props.images) {
      if (iconCanvasesRef.value[index] && imagesLoadedRef.value[index]) {
        const targetWidth = iconCanvasesRef.value[index].width
        const targetHeight = iconCanvasesRef.value[index].height
        ctx.drawImage(iconCanvasesRef.value[index], -targetWidth / 2, -targetHeight / 2, targetWidth , targetHeight)
      }
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, 20, 0, Math.PI * 2)
      ctx.fillStyle = '#4444ff'
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '16px Arial'
      ctx.fillText(`${icon.id + 1}`, 0, 0)
    }

    ctx.restore()
  })

  animationFrameRef.value = requestAnimationFrame(animate)
}

// Lifecycle hooks
onMounted(async () => {
  await initializeIconCanvases()
  generateInitialPositions()
  animate()
})

onUnmounted(() => {
  if (animationFrameRef.value) {
    cancelAnimationFrame(animationFrameRef.value)
  }
})
</script>
