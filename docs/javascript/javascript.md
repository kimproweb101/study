---
outline: deep
---

## 자바스크립트 데이터 생성
```js
const posts=Array.from(Array(20), (_,index)=>({
  id:index,
  title:'Vue3'+index,
}))

```