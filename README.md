# Vue Icon Cloud

A Vue component for displaying an icon cloud, supporting icons and SVGs.

## Install

```bash
$ pnpm install vue-icon-cloud
```

## Usage

Basic usage:

```vue
<template>
  <IconCloud
    :images="images"
  ></IconCloud>
</template>
<script setup lang="ts">
import IconCloud from 'vue-icon-cloud'

const slugs = ref([
  "typescript", "javascript", "dart", "react", "flutter", "android", "html5", "css3", 
  "nodedotjs", "express", "nextdotjs", "prisma", "postgresql", "firebase", "nginx", 
  "vercel", "testinglibrary", "jest", "cypress", "docker", "git", "jira", "github", 
  "gitlab", "androidstudio", "sonarqube", "figma"
])

const images = computed(() => {
  return slugs.value.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );
})
</script>
```

More Usage: visit [document](https://peterroe.github.io/vue-icon-cloud/guide/)
