---
outline: deep
---

## 모달 composables
```js
// 작성 파일
/composables/modal.js
/App.vue
/components/AppModal.vue
/view/ModalView.vue
```
1./components/AppModal.vue
```vue
<template>
  <div>
    <button type="button" @click="create">clcik</button>
  </div>
</template>
<script setup>
import { useModal } from '@/composables/modal';
const { vModal } = useModal()
const create = () => {
  vModal()
}
</script>
```
2./composables/modal.js
```js
import {ref} from 'vue'
const modals = ref([]);
export function useModal(){  
  const vModal = (message) => {    
    modals.value.push({msg:'msg1'})
    setTimeout(()=>{
      modals.value.shift()
    },2000)
  };
  return {
    modals,
    vModal
  }
}
```
3./view/ModalView.vue
```vue
<template>
  <div class="myModal">
    <div v-for="(item, index) in items" :key="index">{{ item.msg }}</div>
  </div>
</template>

<script setup>
defineProps({
  items: Array
})
</script>

<style scoped>
.myModal {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
}
</style>

```
4./App.vue
```vue
<script setup>
import AppMyModal from './components/app/AppMyModal.vue';
import { useModal } from '@/composables/modal';
const { modals } = useModal()
</script>

<template>	
	<AppMyModal :items="modals" />
</template>
```

