---
outline: deep
---

## 소개
Vue 싱글 파일 컴포넌트(Single-File Components: SFC, 일명 *.vue 파일)는 컴포넌트의 템플릿, 로직 및 스타일을 하나의 파일로 묶어낸 특수한 파일 형식입니다. 다음은 SFC 파일의 예입니다:

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

## 언어 블록

### `<template>`
- 하나의 .vue 파일에서 최대 하나의 `<template>` 블록을 포함할 수 있음

### `<script>`
- 하나의 .vue 파일에서 최대 하나의 `<script>` 블록을 포함할 수 있음

### `<script setup>`
- 하나의 .vue 파일에서 최대 하나의 `<script setup>` 블록을 포함할 수 있음

### `<style>`
- 하나의 .vue 파일에서 여러 `<style>` 블록을 포함할 수 있음
- scoped, module 옵션이 있음

## Custom Blocks

## 전처리기

## Src 가져오기
```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

## CSS 기능
### scoped css
```vue
<template>
  <p class="greeting">greeting</p>
</template>
<style scoped>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

### css 모듈
```vue
<template>
  <p :class="$style.red">red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

```vue
import { useCssModule } from 'vue'

// setup() 스코프 내부...
// 기본, 스타일 모듈에 대한 클래스를 반환합니다.
useCssModule()

// 명명된, 스타일 module='classes'에 대한 클래스를 반환합니다.
useCssModule('classes')
```

### v-bind() in css
```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>
<style>
.text {
  color: v-bind(color);
}
</style>
```
## 참고
- [Single File Component : Spec](https://vuejs.org/api/sfc-spec.html)
- [Single File Component : `<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
- [Single File Component : CSS Features](https://vuejs.org/api/sfc-css-features.html)

