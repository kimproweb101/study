### store 정의

- store naming 규칙 : use파일명Store
- counter : app 전체에서 store의 고유한 id값, vueDevTools 와 연결하는데 사용
- store 기본 구조
- state 상태, getters computed, actions : method

::: details store 기본 구조

```js
export const useCounterStore = defineStore("counter", {
  state: () => ({}),
  getters: {},
  actions: {},
});
```

:::

### counter

::: details counter 작성

- getters 에 함수별 매개 변수에 state 를 전달해줘야함
- actions 에서 state 에 접근 하려면 this 키워드를 작성해줘야함
- 익명 함수를 사용하지 않은 이유는 this 키워드를 사용할 수 없기 때문
- getter 안에서 getters 함수에 접근

```js
import { defineStore } from "pinia";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
```

:::

### store 의 구조분해 할당시 반응성 유지

- store 는 reactactive 로 맵핑된 객체임, console로 출력시 proxy 객체가 출력됨
- reactive 객체는 구조분해 할당시 반응성 연결이 끊어짐
- const { counter } = store 어서 counter 는 number type 의 숫자임, 단순히 counter 라는 변수에 값을 할당한것
- const { counter: counter2 } = store 할당하는경우 반응성이 유지 되는가?

```js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlugOne() {
      return this.doubleCount + 1;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
```

```vue
<template>
  <div>store :{{ store.counter }}</div>
  <div>doubleCount :{{ store.doubleCount }}</div>
  <div>doubleCountPlugOne : {{ store.doubleCountPlugOne }}</div>
  <div>counter2 : {{ counter2 }}</div>

  <button type="button" @click="store.increment()">증가</button>
</template>
<script setup>
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();

const { counter: counter2 } = storeToRefs(store);
</script>
<style scoped></style>
```

::: details 정답 보기

```js
<template>
  <div>store :{{ store.counter }}</div>
  <div>doubleCount :{{ store.doubleCount }}</div>
  <div>doubleCountPlugOne : {{ store.doubleCountPlugOne }}</div>
  <div>counter2 : {{ counter2 }}</div>

  <button type="button" @click="store.increment()">증가</button>
</template>
<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { counter: counter2 } = storeToRefs(store);
</script>
<style scoped></style>

```

:::

::: details 구조분해 할당으로 store 데이터 및 함수 가져오기

- actions 는 그냥 가져오면 됨.
- script 안에서 바로사용 가능 counter.value increment()
- vuex 에서는 state를 직접 수정을 못했지만 pinia 에서는 직접 수정 가능

```vue
<template>
  <div>store :{{ counter }}</div>
  <div>doubleCount :{{ doubleCount }}</div>
  <div>doubleCountPlugOne : {{ doubleCountPlugOne }}</div>

  <button type="button" @click="increment()">증가</button>
</template>
<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { counter, doubleCount, doubleCountPlugOne } = storeToRefs(store);
const { increment } = store;
// counter.value=100
// increment()
</script>
```

:::
