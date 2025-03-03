---
outline : deep
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

## useAxios 비동기 처리
totalCount 가 이미 computed 로 처리가 되서 아래와 같은 코드가 될거라고 생각했는데,
안됨

오류코드
```js
const totalCount= computed(()=> response.value.headers['x-total-count'])
const totalPages= Math.ceil(totalCount.value / params.value._limit)
```

정상 코드
```js
const totalCount= computed(()=> response.value.headers['x-total-count'])
const totalPages= computed(()=> Math.ceil(totalCount.value / params.value._limit))
```


