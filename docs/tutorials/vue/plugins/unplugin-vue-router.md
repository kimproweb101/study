---
outline : deep
---

## unplugin-vue-router

### 설치
```sh
npm i -D unplugin-vue-router
```

### 설정
#### vite.config.js
```js {5,12-14} [vite.config.js]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VueRouter({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

#### /route/index.js
```js {2,5} [/route/index.js]
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router

```

### 테스트
#### App.vue
```vue [App.vue]
<template>
  <header>header</header>
  <main>
    <RouterView />
  </main>
</template>
```

#### /pages/index.vue
```vue [/pages/index.vue]
<template>
  <div>index</div>
</template>
```

#### /users/index.vue
```vue [/pages/users/index.vue]
<template>
  <div>user/index</div>
</template>
```

#### /users/[id].vue
```vue [/pages/users/[id].vue]
<template>
  <div>{{ route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
```

#### Not Found Page
`/pages/[...path].vue`
```vue 
<template>
  <div>not found page</div>
</template>
```
