## slot

### slot 모두

Scoped Slots : 자식

부모 컴포넌트
공통 v-if 처리
header : 축약 없음, 슬롯으로 자식 컴포넌트 데이터, 부모 컴포넌트에서 사용
default : 축약 없음, 슬롯으로 자식 컴포넌트 데이터, 부모 컴포넌트에서 사용
footer : 축약, Fallback Content 사용

```vue
<AppSlot>
  <template v-slot:header="headerData">header Data : {{ headerData }}</template>
  <template #default="defaultData">default {{ defaultData }}</template>
  <template #footer>footer</template>
</AppSlot>
```

```vue
<template>
  <div>
    <div><slot v-if="$slots.header" name="header" headerData1="headerData1"></slot></div>
    <div><slot v-if="$slots.default" name="default" defaultData1="defaultData1"></slot></div>
    <div><slot v-if="$slots.footer" name="footer">defaultFooter</slot></div>
  </div>
</template>
<script setup>
const member = {
  id: 1,
  name: "김김김",
};
</script>
```

### slot default 생략

default slot 은 예제1, 예제2 와 같이 받을 수 있음

```vue
// 예제1
<AppSlot v-slot="{ obj }">
  <template>{{ obj }}</template>
</AppSlot>
```

```vue
// 예제2
<AppSlot>
  <template v-slot="obj">{{ obj }}</template>
</AppSlot>
```

```vue
<template>
  <slot defaultData="defaultData"></slot>
</template>
``
```
