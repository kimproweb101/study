---
outline: deep
---

## 컴포넌트 정의

### Single-File Components(SFC)
```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

### 문자열 템플릿 (string template)
```js
import { ref } from 'vue/dist/vue.esm-bundler.js';
export default {
  setup() {
    const counter = ref(0);
    return {
      counter,
    };
  },
  template: `
	  <button @click="counter++">클릭 횟수 {{ counter }}</button>
  `,
};
```

## 컴포넌트 등록
### 전역 등록
```js
import { createApp } from 'vue';
import App from './App.vue';

import GlobalComponent from './components/GlobalComponent.vue';

const app = createApp(App)
app.component('GlobalComponent', GlobalComponent)
app.mount('#app');
```

### 지역 등록
```js
import ChildComponent from './ChildComponent.vue'
export default {
	components: {
		ChildComponent
	},	
}
```

## 컴포넌트 사용




- /components/AppComponent.vue
```vue
<template>
 <div>AppComponent</div>
</template>
```

- /App.vue
```vue
<template>
  <AppComponent />
</templace>
<script>
import AppComponent from '/components/AppComponent.vue'
export default{
  components:{
    AppComponent
  },
  setup(){
    return {}
  }
}
</script>
```


### PascalCase

- JavaScript에서 컴포넌트를 더 쉽게 가져오고 등록할 수 있습니다. IDE의 자동 완성 기능도 지원합니다.

- PascalCase 는 기본 HTML의 템플릿 엘리먼트가 아닌 Vue 컴포넌트임을 더 명확하게 합니다. 또한 Vue 컴포넌트를 사용자 정의 엘리먼트(웹 컴포넌트)와 구별합니다.