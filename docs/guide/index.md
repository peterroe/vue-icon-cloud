---
title: Guide
description: Getting started
---

# Get Started

<script setup lang="ts">
import IconCloud from '../../src/cloud.vue'
import IconAccountBox from '~icons/logos/active-campaign-icon'
import IconAbTesting from '~icons/logos/angular-icon'
import IconAccessPoint from '~icons/logos/awesome'
import IconZodiacCancer from '~icons/logos/astro'
import IconZodiacCancer2 from '~icons/logos/box'
import IconZodiacCancer3 from '~icons/logos/zig'
import { ref, onMounted, watch, computed, h } from 'vue'

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
</script>

## Usage

使用图片地址

<TableDemo half>
<template #fence>

```vue
<template>
  <IconCloud :images="images"></IconCloud>
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

</template>
<template #play>
<IconCloud
  :images="images"
>
</IconCloud>
</template>
</TableDemo>


使用 SVG

<TableDemo half>
<template #fence>

```vue
<template>
  <IconCloud
    :icons="[
      IconAccountBox,
      IconAbTesting,
      IconAccessPoint,
      IconZodiacCancer,
      IconZodiacCancer2,
      IconZodiacCancer3,
      IconZodiacCancer2,
      IconZodiacCancer3,
      IconZodiacCancer,
  ]"/>
</template>
<script setup lang="ts">
import IconAccountBox from '~icons/logos/active-campaign-icon'
import IconAbTesting from '~icons/logos/angular-icon'
import IconAccessPoint from '~icons/logos/awesome'
import IconZodiacCancer from '~icons/logos/astro'
import IconZodiacCancer2 from '~icons/logos/box'
import IconZodiacCancer3 from '~icons/logos/zig'

import IconCloud from 'vue-icon-cloud'
</script>
```

</template>
<template #play>
  <IconCloud :icons="[
    IconAccountBox,
    IconAbTesting,
    IconAccessPoint,
    IconZodiacCancer,
    IconZodiacCancer2,
    IconZodiacCancer3,
    IconZodiacCancer2,
    IconZodiacCancer3,
    IconZodiacCancer,
  ]"/>
</template>
</TableDemo>
