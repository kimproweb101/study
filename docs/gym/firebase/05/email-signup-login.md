### Email 회원가입&로그인: "재밌는 사용자 썸네일 생성"

1. SignUpForm

```vue [SignUpForm.vue]
<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input v-model="form.nickname" placeholder="닉네임" outlined dense />
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input v-model="form.password" type="password" placeholder="비밀번호(문자, 숫자조합 8자 이상)" outlined dense />
      <q-btn type="submit" label="가입하기" class="full-width" unelevated color="primary" />

      <q-separator />
      <q-btn label="로그인 하기" class="full-width" unelevated flat @click="$emit('changeView', 'SignInForm')" />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { signUpWithEmail } from "src/services";

const emit = defineEmits(["changeView", "closeDialog"]);

const $q = useQuasar();

const form = ref({
  nickname: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await signUpWithEmail(form.value);
  $q.notify("가입을 환영합니다 :)");
  emit("closeDialog");
};
</script>
```

2. /services/index.js

```[/services/index.js]
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'src/boot/firebase';
const DEFAULT_PHOTO_URL =
  'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=';

// 로그인 (구글)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function logout() {
  await signOut(auth);
}

export async function signUpWithEmail({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  console.log('user: ', user);
}

export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}

export async function signInWithEmail({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

```
