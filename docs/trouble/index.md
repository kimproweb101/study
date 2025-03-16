---
outline: deep
---

## 트러블

## json-server 버전

기존방식

```js
GET /posts?_sort=id&_order=ASC
GET /posts?_sort=id&_order=DESC
```

바뀐방식

```js
GET /posts?_sort=id
// 오름 차순

GET /posts?_sort=-id
//내림 차순
```

## vue-error

발생

```js
[Vue3] Warning in browser console: Extraneous non-props attributes (...) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.
```

원인
template 다음 테그없이 text를 작성하는 경우 경고 발생

```vue
<template>...loading</template>
```

해결
태그로 감쌈

```
<template><div>...loading</div></template>
```

## useAxios

### computed

totalCount 가 이미 computed 로 처리가 되서 아래와 같은 코드가 될거라고 생각했는데,
안됨

오류코드

```js
const totalCount = computed(() => response.value.headers["x-total-count"]);
const totalPages = Math.ceil(totalCount.value / params.value._limit);
```

정상 코드

```js
const totalCount = computed(() => response.value.headers["x-total-count"]);
const totalPages = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);
```

### execute

```js [틀린코드]
watchEffect(execute());
```

```js [올바른코드]
watchEffect(execute);
```

## 홀수짝수 판별시 1%2

잘못된 생각
1/2 //몫이 0.5 나머지 0
옳은 생각
1%2 몫 0 나머지1

## vitepress github pages 배포 error

- 트라이1 아래와 같이 수정

```js
Archive artifact
  tar: docs/.vitepress/dist: Cannot open: No such file or directory
  tar: Error is not recoverable: exiting now
  Error: Process completed with exit code 2.
```

::: code-group

```yaml 수정전
jobs:
  # 빌드 작업
  build:
    with:
      path: docs/.vitepress/dist
```

```yaml 수정후
with:
  path: .vitepress/dist
```

:::

## vitepress github pages 이미지 깨짐

```js
// .vitepress/config.mjs
export default defineConfig({
  base: "/vitepress/",
});
```

## eslint

1.vue-multi-word-component-names

- error 시 아래 코드를 추가하면 해결됨
- 추가할 항목은 아래 사이트 방문
- [https://eslint.vuejs.org/rules/]

```js
export default [
  {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [],
      },
    ],
  },
];
```

### defineProps 문법 틀림

```vue [틀린문법1]
- 무지성 으로 코딩.. defineProps( { id:Number }, { title:String } )
```

```vue [틀린문법2]
- 1번이 안되서 무지성 으로 2번째 시도 defineProps( { id:{ type: String } }, {
title: { type:String } } )
```

```vue [옳은 문법]
<script>
defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>
```

### git repository 비공개 전환

- settings - danger zone - visibility - Make Private
