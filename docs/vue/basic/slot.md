::: info slot 예제 {### slot}
1. slot 기본, slot 축약
2. slot 자식 컴포넌트 데이터 부모컴포넌트에서 사용
3. slot if 문 : 부모 컴포넌트에서 slot 을 사용한 경우에만 렌더링
4. default 생략 안함
5. default 생략
:::


#### 1. slot 기본, slot 축약
::: tip 예제

```vue [부모]
<template>
  <AppSlot>
    <template v-slot:header></template>
    <template #contents></template>  
  </AppSlot>
</template>
```
```vue [자식]
<template>
  <div>
    <slot name='header'></slot>
    <slot name='contents'></slot>
  </div>
</template>
```
:::

#### 2. 자식 컴포넌트 데이터 부모컴포넌트에서 사용
::: tip 예제
```vue [부모]
<template>
  <AppSlot>
    <template v-slot:header="headerData">{{headerData}}</template>
    <template #contents="contentsData">{{contentsData}}</template>  
  </AppSlot>
</template>
```
```vue [자식]
<template>
  <div>
    <slot name='header' headerData="headerData"></slot>
    <slot name='contents' contentsData="contentsData"></slot>
  </div>
</template>
```
:::

#### 3. slot if 문 : 부모 컴포넌트에서 slot 을 사용한 경우에만 렌더링
::: tip 예제
```vue [부모]
<template>
  <AppSlot>
    <template #header>header</template>
  </AppSlot>
</template>
```
```vue [자식]
<template>
  <div>
    <slot v-if="$slots.header" name='header'>header</slot>
    <slot v-if="$slots.contents" name='contents'>contents</slot>
  </div>
</template>
```
:::

#### 4. slot default 생략 안함
::: tip 예제
```vue [부모]
<template>
  <AppSlot>
    <template #default>parent default</template>
  </AppSlot>
</template>
```
```vue [자식]
<template>
  <div>
    <slot name='default'>children default</slot>
  </div>
</template>
```
:::

#### 5. slot default 생략
::: tip 예제
```vue [부모]
<template>
  <AppSlot>
    <template>parent default</template>
  </AppSlot>
</template>
```
```vue [자식]
<template>
  <div>
    <slot>children default</slot>
  </div>
</template>
```
:::