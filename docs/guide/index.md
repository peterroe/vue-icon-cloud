---
title: Guide
description: Getting started
---

# Get Started

An interactive 3D icon cloud. Supports both images and SVG.

## Install

Install packages using your favorite package manager

```shell
$ pnpm install vue-icon-cloud
$ npm install vue-icon-cloud
$ yarn add vue-icon-cloud
```

<script setup lang="ts">
import IconSvelte from '~icons/logos/svelte-icon'
import IconAwesome from '~icons/logos/awesome'
import IconZig from '~icons/logos/zig'
import IconGithub from '~icons/logos/github'
import IconGitlab from '~icons/logos/gitlab'
import IconAstro from '~icons/logos/astro-icon'
import IconDocker from '~icons/logos/docker'
import IconGit from '~icons/logos/git'
import IconReact from '~icons/logos/react'
import IconNuxt from '~icons/logos/nuxt'
import IconGo from '~icons/logos/go'
import IconSolidjs from '~icons/logos/solidjs-icon'
import IconVscode from '~icons/logos/visual-studio-code'
import IconGithubCopilot from '~icons/logos/github-copilot'
import IconNuxtIcon from '~icons/logos/nuxt-icon'
import IconHomeBrew from '~icons/logos/homebrew'

import { ref, onMounted, watch, computed, h } from 'vue'
import IconCloud from '../../src/cloud.vue'
import TableDemo from '../.vitepress/theme/components/TableDemo.vue'

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

You can use the `images` prop to pass in an array of image URLs.

<TableDemo half>
<template #fence>

```vue {3}
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

</template>
<template #play>
<IconCloud
  :images="images"
>
</IconCloud>
</template>
</TableDemo>


Or you can use the `icons` prop to pass in an array of SVG icons.

```vue {2}
<template>
  <IconCloud :icons="[Icon1, Icon2, Icon3, Icon4, Icon5]" />
</template>
<script setup lang="ts">
import IconCloud from 'vue-icon-cloud'
import Icon1 from 'path/to/icon1.svg'
import Icon2 from 'path/to/icon2.svg'
import Icon3 from 'path/to/icon3.svg'
import Icon4 from 'path/to/icon4.svg'
import Icon5 from 'path/to/icon5.svg'
</script>
```

Recommended to use <GitHubLink repo="unplugin/unplugin-icons" />, which support using the large number of icons provided by iconify.

<TableDemo half>
<template #fence>

```vue {3}
<template>
  <IconCloud
    :icons="[
      IconSvelte,IconAwesome,
      IconZig,IconGit,
      IconAstro,IconDocker,
      IconReact,IconNuxt,IconGo,
      IconVscode,IconSolidjs,IconGithubCopilot,
    ]"
  />
</template>
<script setup lang="ts">
import IconSvelte from '~icons/logos/svelte-icon'
import IconAwesome from '~icons/logos/awesome'
import IconZig from '~icons/logos/zig'
import IconAstro from '~icons/logos/astro-icon'
import IconDocker from '~icons/logos/docker'
import IconGit from '~icons/logos/git'
import IconReact from '~icons/logos/react'
import IconNuxt from '~icons/logos/nuxt'
import IconGo from '~icons/logos/go'
import IconVscode from '~icons/logos/visual-studio-code'
import IconSolidjs from '~icons/logos/solidjs-icon'
import IconGithubCopilot from '~icons/logos/github-copilot'

import IconCloud from 'vue-icon-cloud'
</script>
```

</template>
<template #play>
  <IconCloud :icons="[
    IconSvelte,
    IconAwesome,
    IconZig,
    IconAstro,
    IconDocker,
    IconGit,
    IconReact,
    IconNuxt,
    IconGo,
    IconVscode,
    IconSolidjs,
    IconGithubCopilot,
  ]"/>
</template>
</TableDemo>

You can also control the size of the svg. The `iconStyle` property will directly apply to the `<svg>` element.

<TableDemo half>
<template #fence>

```vue {9-11}
<template>
  <IconCloud
    :icons="[
      IconSvelte,IconAwesome,IconNuxtIcon,
      IconAstro,IconGit,IconReact,IconGo,
      IconVscode,IconSolidjs,IconGithubCopilot,
      IconHomeBrew,
    ]"
    :iconStyle="{
      'font-size': '40px',
    }"
  />
</template>
<script setup lang="ts">
import IconSvelte from '~icons/logos/svelte-icon'
import IconAwesome from '~icons/logos/awesome'
import IconNuxtIcon from '~icons/logos/nuxt-icon'
import IconAstro from '~icons/logos/astro-icon'
import IconGit from '~icons/logos/git'
import IconReact from '~icons/logos/react'
import IconGo from '~icons/logos/go'
import IconVscode from '~icons/logos/visual-studio-code'
import IconSolidjs from '~icons/logos/solidjs-icon'
import IconGithubCopilot from '~icons/logos/github-copilot'
import IconHomeBrew from '~icons/logos/homebrew'

import IconCloud from 'vue-icon-cloud'
</script>
```

</template>
<template #play>
  <IconCloud
    :icons="[
      IconSvelte,
      IconAwesome,
      IconNuxtIcon,
      IconAstro,
      IconGit,
      IconReact,
      IconGo,
      IconVscode,
      IconSolidjs,
      IconGithubCopilot,
      IconHomeBrew
    ]"
    :iconStyle="{
      'font-size': '40px',
    }"
  />
</template>
</TableDemo>
