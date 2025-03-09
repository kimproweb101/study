---
outline : deep
---

## AuthModal

:::tip AuthModal
- layouts/ClientLayout.vue
- components/auth/AuthDialog.vue
- components/auth/AuthSignIn.vue
- components/auth/AuthFindPassword.vue
- components/auth/AuthSignUp.vue
- /assets/main.css
:::

#### layouts/ClientLayout.vue
```vue 
<template>
  <div class="wrapper">
    <div class="header">
      header
    </div>
    <router-view />
    <AuthDialog v-model="dialog" @modalClose="dialog = false" />
  </div>
</template>
<script setup>
import AuthDialog from '@/components/auth/AuthDialog.vue';
import { ref } from 'vue';
const dialog = ref(true)
</script>
<style sciped></style>

```
#### c/auth/AuthDialog.vue
- if문
```vue 
<template>
  <Teleport to="body">
    <div v-if="modelValue" v-bind="$attrs" class="blind" @click.self="$emit('modalClose')">
      <div class="vModal">
        <div class="modal-close text-end">
          <button type="button" class="modal-btn-close" @click="$emit('modalClose')">X</button>
        </div>
        <AuthSignIn v-if="authMode === 'AuthSignIn'" @changeAuth="doChangeAuth" />
        <AuthSignUp v-else-if="authMode === 'AuthSignUp'" @changeAuth="doChangeAuth" />
        <AuthFindPassword v-else @changeAuth="doChangeAuth" />
        <div>{{ authMode }}</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import AuthSignIn from './AuthSignIn.vue';
import AuthSignUp from './AuthSignUp.vue';
import AuthFindPassword from './AuthFindPassword.vue';
defineProps(['modelValue', 'update:modelValue'])
defineEmits(['modalClose'])
const authMode = ref('AuthSignIn')
const doChangeAuth = (val) => {
  authMode.value = val
}
</script>
<style scoped></style>
```
#### c/auth/AuthSignIn.vue
```vue 
<template>
  <div class="modal-header">
    <div class="modal-title text-center">로그인</div>
  </div>
  <div class="modal-contents">contents</div>
  <div class="modal-footer d-flex space-between">
    <button type="button" @click="$emit('changeAuth', 'AuthFindPassword')">비밀번호 찾기</button>
    <button type="button" @click="$emit('changeAuth', 'AuthSignUp')">이메일 가입하기</button>
  </div>
</template>

<script setup>
defineEmits(['changeAuth'])
</script>

<style lang="scss" scoped></style>

```
#### c/auth/AuthFindPassword.vue
```vue 
<template>
  <div class="modal-header">
    <div class="modal-title text-center">비밀번호 찾기</div>
  </div>
  <div class="modal-contents">contents</div>
  <div class="modal-footer d-flex space-between">
    <button type="button" @click="$emit('changeAuth', 'AuthSignIn')">로그인</button>
  </div>
</template>

<script setup>
defineEmits(['changeAuth'])
</script>

<style lang="scss" scoped></style>

```
#### c/auth/AuthSignUp.vue
```vue 
<template>
  <div class="modal-header">
    <div class="modal-title text-center">회원가입</div>
  </div>
  <div class="modal-contents">contents</div>
  <div class="modal-footer d-flex space-between">
    <button type="button" @click="$emit('changeAuth', 'AuthSignIn')">로그인</button>
  </div>
</template>

<script setup>
defineEmits(['changeAuth'])
</script>

<style lang="scss" scoped></style>

```
#### /assets/main.css
```vue 
.wrapper{}
div {
  box-sizing: border-box;
}
.text-start{text-align:left;}
.text-center{text-align:center;}
.text-end{text-align:right;}

.d-flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

.blind {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5)
}

.vModal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  margin-left: -250px;
  margin-top: -250px;
  background: #fff;
  border: 1px solid #ddd;
}
.modal-close{position:absolute;top:0;left:0;width:100%;padding:5px;}

.modal-header {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  padding: 5px;  
  font-size: 17px;  
}

.modal-header .modal-title {
  padding-top: 8px;
  font-size: 20px;
}

.modal-contents {
  padding-top: 100px;
}

.modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #ddd;
  color: #fff;
  padding: 7px;
}

.modal-btn-close {
  width: 45px;
  height: 45px;
  border: 0;
  background: #000;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
```

