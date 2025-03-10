1. 구글 로그인

```js

```

2. 회원 가입

3. 회원 수정

4. 비밀번호 초기화
   ::: tip

```js [src/service/auth.js]
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "src/boot/firebase";
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}
```

```vue [src/components/auth/FindPasswordForm.vue]
<script setup>
const handleSubmit = async () => {
  await sendPasswordReset(email.value);
};
</script>
```

:::

5. 템플릿 설정

- 비밀번호 리셋 템플릿 변경

6. 비밀번호 변경

```js [/services/auth.js]
import { updatePassword } from "firebase/auth";
updatePassword(auth.currentUser, newPassword);
```

```vue [password]
<script setup>
import { updateUserPassword } from "src/services";
updateUserPassword(form.value.newPassword);
</script>
```

7. 이메일 인증

```vue [SignUp]
<script setup>
const handleSubmit = async () => {
  await signUpWithEmail(form.value);
  $q.notify("가입을 환영합니다 :)");
  $q.notify("이메일에서 인증 링크를 확인해주세요.");
  emit("closeDialog");
};
</script>
```

```js [/services/auth.js]
import { auth } from "src/boot/firebase";
export async function signUpWithEmail({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  sendVerificationEmail();
}
export async function sendVerificationEmail() {
  await sendEmailVerification(auth.currentUser);
}
```

8. 프로필 업데이트

```vue [/pages/mypage/profile.vue]
<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input v-model="displayName" outlined dense label="닉네임" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary" />
        </q-card-actions>
      </q-form>
    </BaseCard>
    <BaseCard>
      <q-form @submit.prevent="handleSubmitEmail">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input v-model="email" outlined dense label="이메일" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary" />
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useQuasar } from "quasar";
import { updateUserEmail, updateUserProfile } from "src/services";
import { useAuthStore } from "src/stores/auth";
import BaseCard from "src/components/base/BaseCard.vue";

const authStore = useAuthStore();
const $q = useQuasar();

const displayName = ref("");
const handleSubmitProfile = async () => {
  await updateUserProfile(displayName.value);
  $q.notify("프로필 수정 완료!");
};

const email = ref("");
const handleSubmitEmail = async () => {
  await updateUserEmail(email.value);
  $q.notify("이메일 수정 완료!");
};

watchEffect(() => {
  displayName.value = authStore.user?.displayName;
  email.value = authStore.user?.email;
});
</script>
```

```js [/services/auth.js]
import { updateProfile } from "firebase/auth";
import { auth } from "src/boot/firebase";

export async function updateUserProfile(displayName) {
  await updateProfile(auth.currentUser, {
    displayName,
  });
}
```
