import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/types'
import multiTable from 'markdown-it-multimd-table'
import magicLink from 'markdown-it-magic-link'
import { transformerMetaWordHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { defaultHoverInfoProcessor, transformerTwoslash } from '@shikijs/vitepress-twoslash'
import type { Highlighter } from 'shiki'
import { bundledThemes } from 'shiki'
import mermaidPlugin from './plugin/mermaid'
import langPlugin from './plugin/lang'
import pmPlugin from './plugin/pm'
import fileTreePlugin from './plugin/fileTree'
import stepLinePlugin from './plugin/stepLine'
import MagicMovePlugin from './plugin/magicMove'

const title = 'Vue Icon Cloud'
const description = 'The docs of vue icon cloud'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    items: [
      {
        text: 'Guide',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guides',
    items: Guides,
  },
]

let shikiTmp: Highlighter

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  // just need when you want to deploy to github
  base: '/vue-icon-cloud/',
  head: [
    ['link', { rel: 'icon', href: '/vue-icon-cloud/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/vue-icon-cloud/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'Vue Icon Cloud' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' }],
    ['script', { async: 'true', charset: 'utf-8', src: 'https://platform.twitter.com/widgets.js' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPSwitchAppearance.vue', import.meta.url),
          ),
        },
      ],
    },
  },

  markdown: {
    image: {
      lazyLoading: true,
    },
    async shikiSetup(shiki) {
      shikiTmp = shiki
      await shiki.loadTheme(...Object.keys(bundledThemes) as any)
    },
    codeTransformers: [
      transformerMetaWordHighlight(),
      transformerNotationWordHighlight(),
      {
        // Render custom themes with codeblocks
        name: 'shiki:inline-theme',
        preprocess(code, options) {
          const reg = /\btheme:([\w,-]+)\b/
          const match = options.meta?.__raw?.match(reg)
          if (!match?.[1])
            return
          const theme = match[1]
          const themes = theme.split(',').map(i => i.trim())
          if (!themes.length)
            return
          if (themes.length === 1) {
            // @ts-expect-error anyway
            delete options.themes
            // @ts-expect-error anyway
            options.theme = themes[0]
          }
          else if (themes.length === 2) {
            // @ts-expect-error anyway
            delete options.theme
            // @ts-expect-error anyway
            options.themes = {
              light: themes[0],
              dark: themes[1],
            }
          }
          else {
            throw new Error(`Only 1 or 2 themes are supported, got ${themes.length}`)
          }
          return code
        },
      },
      {
        name: 'shiki:inline-decorations',
        preprocess(code, options) {
          const reg = /^\/\/ @decorations:(.*?)\n/
          code = code.replace(reg, (match, decorations) => {
            options.decorations ||= []
            options.decorations.push(...JSON.parse(decorations))
            return ''
          })
          return code
        },
      },
      transformerTwoslash({
        // errorRendering: 'hover',
        processHoverInfo(info) {
          return defaultHoverInfoProcessor(info)
            // Remove shiki_core namespace
            .replace(/_shikijs_core[\w_]*\./g, '')
        },
      }),
      {
        name: 'shiki:remove-escape',
        postprocess(code) {
          return code.replace(/\[\\\!code/g, '[!code')
        },
      },
    ],
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config(md) {
      md.use(mermaidPlugin)
      md.use(langPlugin)
      md.use(pmPlugin)
      md.use(fileTreePlugin)
      md.use(stepLinePlugin)
      md.use(MagicMovePlugin, shikiTmp)
      md.use(magicLink)
      md.use(multiTable, {
        multiline: true,
        rowspan: true,
        headerless: true,
        multibody: true,
        aotolabel: true,
      })
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
    },
    editLink: {
      pattern: 'https://github.com/peterroe/vue-icon-cloud/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/peterroe/vue-icon-cloud' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Peter Roe',
    },
  },
})
