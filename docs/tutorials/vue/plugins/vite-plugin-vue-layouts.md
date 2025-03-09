---
outline : deep
---


## vite-plugin-vue-layouts
### 설치
::: tip
- 설치가 안되서 --force 옵션 적용
- unplugin-vue-router를 먼저 설치해야 적용 됨

```sh [설치]
npm install -D vite-plugin-vue-layouts 
npm install -D vite-plugin-vue-layouts --force
```
:::


### 설정
::: tip

ClientSideLayout 레이아웃 파일 수정 바로 반영

```js [vite.config.js]
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueRouter({}),
    ClientSideLayout({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
      defaultLayout: 'default',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

Layout 으로 작성시 서버 재시작 후 반영 vite.config.js 파일을 저장해야 반영
```js [vite.config.js]
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import Layout from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueRouter({}),
    Layout({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
      defaultLayout: 'default',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```
:::


::: tip `연동` 
`vite-plugin-vue-layouts` `unplugin-vue-router`

```js [/routes/index.js]
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})
export default router

```
:::


### 레이아웃 파일 작성
::: tip 레이아웃
```vue [/layouts/default.vue]
<template>
  <div>
    <div>default layout</div>
    <router-view />
  </div>
</template>

```

```vue [/layouts/ClientLayout.vue]
<template>
  <div>
    <div>client layout</div>
    <router-view />
  </div>
</template>
```
:::

### ClientLayout 적용
::: tip 페이지에서 다른 레이아웃 적용
```vue [/pages/index.vue]
<template>
  <div>
    {{ route.meta }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
name: home-page
meta:
  layout: ClientLayout
  requiresAuth: true
  width: 500px
</route>

```
:::