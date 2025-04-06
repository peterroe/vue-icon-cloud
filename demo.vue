<template>
  <Cloud v-if="icons.length > 0" class="cloud">
    <SimpleIcon
      class="icon"
      v-for="icon in icons"
      :key="icon.title"
      :icon="icon"
      :size="82"
      :aProps="{ onClick: preventDefault }"
    />
  </Cloud>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Cloud from './src/renderers/cloud.vue'
import SimpleIcon from './src/renderers/simple_icon.vue'
import { fetchSimpleIcons } from './src/utils/fetch_simple_icons'

const slugs = ref([
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
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
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
])

setTimeout(() => {
  slugs.value.push("yarn")
  slugs.value.shift()
  console.log("sug", slugs.value)
},3000)

const icons = ref<Array<any>>([])

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
