---
outline: deep
---

## 자바스크립트 데이터 생성

```js
const posts = Array.from(Array(20), (_, index) => ({
  id: index,
  title: "Vue3" + index,
}));
```

## 모든 함수와 변수 하나의 파일에서 한꺼번에 export 하기

::: tip 파일

```js
/services/index.js
/services/auth.js
/services/category.js
```

```js [index.js]
export * from "./auth";
export * from "./category";
```

```js [auth.js]
export const auth = () => {};
```

```js [category.js]
export const category = () => {};
```

```vue
<script setup>
import { auth } from "src/services/auth";
import { category } from "src/services/category";
import { auth, category } from "src/services";
</script>
```

:::
