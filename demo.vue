<template>
  <Cloud :images="images" class="relative flex size-full items-center justify-center overflow-hidden">
  </Cloud>
  <Cloud :icons="[
    IconAccountBox,
    IconAbTesting,
    IconAccessPoint,
    IconZodiacCancer,
    IconZodiacCancer2,
    IconZodiacCancer3,
    IconZodiacCancer2,
    IconZodiacCancer3,
    IconZodiacCancer,
  ]" :icon-style="{
    'font-size': '30px'
  }" />
  <IconAccountBox />
  <IconAbTesting />
  <IconAccessPoint />
  <IconZodiacCancer />
</template>

<script setup lang="ts">
import IconAccountBox from '~icons/logos/active-campaign-icon'
import IconAbTesting from '~icons/logos/angular-icon'
import IconAccessPoint from '~icons/logos/awesome'
import IconZodiacCancer from '~icons/logos/astro'
import IconZodiacCancer2 from '~icons/logos/box'
import IconZodiacCancer3 from '~icons/logos/zig'
import { ref, onMounted, watch, computed, h } from 'vue'

console.log("IconAbTesting", IconAbTesting)
import Cloud from './src/cloud.vue'
// import Cloud from './src/renderers/cloud.vue'
import { fetchSimpleIcons } from './src/utils/fetch_simple_icons'
var img = new Image();

const slugs = ref([
  "typescript",
  "javascript",
  "dart",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "androidstudio",
  "sonarqube",
  "figma",
])

const images = computed(() => {
  return slugs.value.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );
})


setTimeout(() => {
  slugs.value.push("yarn")
  slugs.value.shift()
  console.log("sug", slugs.value)
},3000)

const icons = ref<any[]>([])

const preventDefault = (e: Event) => {
  e.preventDefault()
}

watch(slugs, async newValue => {
  console.log("slug cahg esd")
  const result = await fetchSimpleIcons({ slugs: newValue })
  console.log(result.simpleIcons)
  icons.value = Object.values(result.simpleIcons)
}, { immediate: true, deep: true })

</script>

<style lang="css">
.core-icon {
  font-size: 30px,
}
</style>
