---
outline : deep
---

1. 설정
- material icon

```js [quasar.config]
const { configure } = require('quasar/wrappers');

module.exports = configure(function (/* ctx */) {
  return {
    extras: [      
      'material-icons',
    ],
  };
});
```

2. 공식문서
- [https://quasar.dev/vue-components/icon]

3. 사용예
```vue
<template>
  <q-icon name="sys_o_visibility" color="gery" size="xs" />  
</template>
```