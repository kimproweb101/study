---
outline: deep
---

## 모달
<!--@include: ./quasar/modal.md -->

## 캐러셀
<!--@include: ./quasar/carousel.md -->

## 아이콘
<!--@include: ./quasar/icon.md -->

## q-dialog
- persistent : 백그라운드 클릭해도 닫히지 않게
- @hide="onHide" : 닫힐때 폼값 초기화 함수 호출 

## q-btn
 - v-close-popup : 팝업 닫기
 - x 버튼 아이콘
 ```vue
 <template>
  <q-btn v-close-popup icon='close' />
 </template>
 ```

## q-toolbar

## q-form

## q-input
- input 으로 textarea 만듬
- input 에 prefix 붙이기

```vue
<template>
  <q-input outlined />
  <q-input type="textarea"/>
  <q-input prefix="#" />
</template>
```

## q-select
::: tip 
- select slot 속성
:::

```vue
<template>
  <q-select>
    <template v-if="!form.category" #selected>
      <span>카테고리를 선택하세요</span>
    </template>
  </q-select>
</template>
```
## q-card
```vue
<template>
  <q-card :style="{width:'500px'}"></q-card>
</template>
```

## q-chip
::: tip
- removable @remove="removeTag" x 버튼 및 함수

```vue
<template>
  <q-chip color="teal" outline dense removable @remove="removeTag">vue</q-chip>
</template>
<script setup>
const removeTag=()=>{
  console.log('removeTag')
}
</script>
```
:::


::: tip
- quasar 간격주기
## gutter
```vue
<template>
  <div class='q-gutter-y-sm'>
    <div>1</div>
    <div>1</div>
  </div>
</template>
```
:::