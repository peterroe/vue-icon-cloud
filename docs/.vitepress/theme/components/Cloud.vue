<template>
  <Cloud :images="images" class="cloud relative flex items-center justify-center overflow-hidden">
  </Cloud>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, h } from 'vue'

import Cloud from '../../../../src/cloud.vue'

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


// setTimeout(() => {
//   slugs.value.push("yarn")
//   slugs.value.shift()
//   console.log("sug", slugs.value)
// },3000)

// const icons = ref<any[]>([])

// const preventDefault = (e: Event) => {
//   e.preventDefault()
// }

// watch(slugs, async newValue => {
//   console.log("slug cahg esd")
//   const result = await fetchSimpleIcons({ slugs: newValue })
//   console.log(result.simpleIcons)
//   icons.value = Object.values(result.simpleIcons)
// }, { immediate: true, deep: true })

</script>

<style lang="css">
.core-icon {
  font-size: 30px,
}
.cloud {
  width: 300px;
  height: 300px;
}
</style>
