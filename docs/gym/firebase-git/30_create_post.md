---
outline: deep
---

## boot

### firebase.js

## components

### apps

#### post

##### PostForm.vue

::: tip

1. 에디터 영역은 별도로 유효성 검사를 해줌

2. 폼값 유효성 검사

3.

:::

##### PostWriteDialog.vue

## page

### posts/

#### `[id]`

##### edit.vue

## services

### index.js

```js [index.js]

```

### post.js

::: code-group

```js
import { db } from "boot/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function createPost(data) {
  const docRef = addDoc(collection(db, "posts"), data);
  return docRef.id;
}
```

:::

## stores

### auth.js
