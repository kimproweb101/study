### toRef toRefs

::: info 보기

```js
import { reactive } from "vue";
const position = reactive({ x: 100, y: 1000 });
```

- 반응성 잃게 뽑기
- ref 로 position.x, position.y 를 할당받고, vue 개발자도구에서 reacitve position x y 의 값을 변경해서 ref로 선언한 x,y 가 동기화가 되는지 확인
- 반응형 데이터는 맞지만 동기화가 되어 있지 않음
- toRef 사용해서 반응성 잃지 않게 뽑기
  :::

::: details

```vue
<template>
  <div>
    <div>x : {{ x }}</div>
    <div>y : {{ y }}</div>
  </div>
</template>
<script setup>
import { reactive, ref, toRef } from "vue";
const position = reactive({ x: 100, y: 1000 });
//1
// const x=position.x
// const y=position.y

//2
// const x = ref(position.x);
// const y = ref(position.y);
// console.log("typeof x" + typeof x);
// console.log("typeof y" + typeof y);

//3
const x = toRef(position, "x");
const y = toRef(position, "y");
</script>
```

:::

### 컴포저블 reactive to

```js
// @/composables/usePosition.js
import { reactive } from "vue";
export const usePosition = () => {
  const position = reactive({
    x: 100,
    y: 1000,
  });
  return position;
};
```

```vue
// @/views/usePositionView.vue

<template>
  <div>{{ x }} {{ y }}</div>
</template>
<script setup>
import { usePosition } from "vue";
const { x, y } = usePosition();
</script>
```

::: details 답안

```js
import { reactive } from "vue";
export const usePosition = () => {
  const position = reactive({
    x: 100,
    y: 1000,
  });
  return toRefs(position);
};
```

```vue
<script setup>
import { usePosition } from "vue";
const { x, y } = usePosition();
</script>
```

:::
