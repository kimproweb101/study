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
