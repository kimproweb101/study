---
outline : deep
---


### 1.스낵바&트렌지션

::: tip snackbar
```vue [파일]
/components/AppSnackbar.vue
/views/SnackbarView.vue
```

```vue [/views/SnackbarView.vue]
<template>
  <div>
    <AppSnackbar :showAlert="showAlert" :alertMessage="alertMessage" :type="alertType" />
    <button type="button" @click="create()">성공</button>
    <button type="button" @click="fail()">실패</button>
  </div>
</template>

<script setup>
import AppSnackbar from '@/components/AppSnackbar.vue';
import { ref } from 'vue';

const showAlert = ref(false)

const alertType = ref('error')

const alertMessage = ref('')
const vAlert = (msg, type = 'error') => {
  alertType.value = type
  showAlert.value = true
  alertMessage.value = msg
  setTimeout(() => {
    showAlert.value = false
  }, 2000)
}

const create = () => {
  vAlert('등록이 완료 되었습니다.', 'success')
}

const fail = () => {
  vAlert('등록이 실패 했습니다.', 'error')
}

</script>

<style lang="scss" scoped></style>
```

```vue [views/SnackbarView.vue]

<template>
  <Transition name="slide">
    <div v-if="showAlert" class="modal1" :class="typeStyle">{{ props.alertMessage }}</div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  showAlert: {
    type: Boolean,
    default: false,
  },
  alertMessage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['success', 'error'].includes(value)
  }
})
const typeStyle = computed(() => {
  return props.type === 'error' ? 'alert-danger' : 'alert-success'
})

</script>
<style scoped>
.modal1 {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 200px;
  height: 100px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.alert-success {
  border: 1px solid green
}

.alert-danger {
  border: 1px solid red
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px)
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

/* 다보여진상태 */
</style>
```
:::

### 2.트렌지션 그룹
::: tip 예제
```js [파일]
SnackbarTransitionGroupView.vue
AppSnackbarTransitionGroup.vue
```

```vue [SnackbarTransitionGroupView.vue]
<template>
  <AppSnackbarTransitionGroup :items="alerts" />
  <button type="button" @click="createBoard">등록 완료</button>
</template>

<script setup>
import AppSnackbarTransitionGroup from '@/components/AppSnackbarTransitionGroup.vue';
import { ref } from 'vue';

const alerts = ref([])
const vAlert = (message) => {
  alerts.value.push({ message })
  setTimeout(() => {
    alerts.value.shift()
  }, 2000)
}

const createBoard = () => {
  vAlert('등록 완료')
}

</script>
```

```vue [AppSnackbarTransitionGroup.vue]
<template>
  <div class="snackbar">
    <transition-group>
      <div class="item" v-for="(item, index) in items" :key="index"><span>{{ item.message }}</span></div>
    </transition-group>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array
})
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 10px;
  right: 10px;
}

.snackbar .item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 200px;
  min-height: 100px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

:::
