<template>
  <a v-bind="finalAProps">
    <img v-bind="finalImgProps" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { hex2contrast, hex2rgb } from '@csstools/convert-colors'
import { guid } from '../utils/guid'
import { addHash } from '../utils/add_hash'

interface Props {
  /**
   * Attributes passed to the underlying anchor element
   */
  aProps?: Record<string, any>
  /**
   * The string hex of the background the icon will be rendered on. Ex: '#fff'
   */
  bgHex?: string
  /**
   * The color of the icon if the minContrastRatio is not met Ex: '#000'
   */
  fallbackHex?: string
  /**
   * The simple icon object you would like to render
   */
  icon: {
    hex: string
    title: string
    path: string
  }
  /**
   * Attributes passes to the underlying img element
   */
  imgProps?: Record<string, any>
  /**
   * The min contrast ratio between icon and bgHex before the fallbackHex will be used
   */
  minContrastRatio?: number
  /**
   * The size in px of the icon
   */
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  aProps: () => ({}),
  bgHex: '#fff',
  fallbackHex: '#000',
  imgProps: () => ({}),
  minContrastRatio: 1,
  size: 42
})

const finalAProps = computed(() => ({
  key: guid(),
  title: props.icon.title,
  style: { cursor: 'pointer' },
  ...props.aProps
}))

const finalImgProps = computed(() => {
  const originalHex = addHash(props.icon.hex)
  const bgHexHash = addHash(props.bgHex)
  const fallbackHexHash = addHash(props.fallbackHex)
  
  const isAccessibleColor = hex2contrast(bgHexHash, originalHex) > props.minContrastRatio
  const rgb = isAccessibleColor
    ? hex2rgb(originalHex)
    : hex2rgb(fallbackHexHash)
  
  const [r, g, b] = rgb.map((percent: number) =>
    Math.round((percent / 100) * 255)
  )

  const imgSrc = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="fill: rgb(${r}, ${g}, ${b});" viewBox="0 0 24 24" height="${props.size}px" width="${props.size}px"> <title>${props.icon.title}</title> <path d="${props.icon.path}"></path> </svg>`

  return {
    height: props.size,
    width: props.size,
    alt: props.icon.title,
    src: imgSrc,
    ...props.imgProps
  }
})
</script>
