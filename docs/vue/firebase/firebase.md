## 1. 구글 로그인

## 2. 회원 가입

## 3. 회원 수정

## 4. 비밀번호 초기화

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

## 5. 템플릿 설정

- 비밀번호 리셋 템플릿 변경

## 6. 비밀번호 변경

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

## 7. 이메일 인증

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

## 8. 프로필 업데이트

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

## 9. 게시글 등록

9-1. setDoc

- id 지정 입력, id가 없으면 생성 있으면 덮어씀, 수정시 유의 필요
- 수정시 해당 필드만 업데이트 하길 원하는 경우 {merge:true} 옵션 설정 필요

9-2. addDoc : id 자동 생성

```js
import { db } from "boot/firebase";
import { addDoc, collection } from "firebase/firebase";

export async function createPost(data) {
  const docRef = await addDoc(collection(db, "posts"), data);
  return docRef.id;
}
```

```vue
<template>
  <PostForm
    v-model:title="form.title"
    v-model:category="form.category"
    v-model:content="form.content"
    v-model:tags="form.tags"
    :loading="isLoading"
    @submit="execute(1000, { ...form, uid: authStore.uid })"
  />
</template>
<script>
const getInitialForm = () => ({
  title: "",
  category: "",
  content: "",
  tags: [],
});
</script>
<script setup>
import { createPost } from "src/services";
import { useAsyncState } from "@vueuse/core";
import { useRouter } from "vue-router";
const router = useRouter();

const form = ref(getInitialForm());

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: (postId) => {
    console.log("postId: ", postId);
    router.push(`/posts/${postId}`);
  },
});
</script>
```

## 10. 조회

```vue [components/apps/post/PostItem.vue] {10-14, 67, 98}
<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>닉네임&nbsp;&middot;&nbsp;{{ date.formatDate(createdAt, "YY/MM/DD HH:mm:ss") }}</span>
        <q-chip class="q-ml-md" dense color="primary" text-color="white">
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="sym_o_visibility" :label="readCount" tooltip="조회수" />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="sym_o_sms" :label="commentCount" tooltip="댓글수" />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon name="sym_o_favorite" :label="likeCount" tooltip="좋아요" />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon name="sym_o_bookmark" :label="bookmarkCount" tooltip="북마크" />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { date } from "quasar";
import PostIcon from "./PostIcon.vue";
defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  bookmarkCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  uid: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
```

```vue [pages/index.vue] {22-23,34-36}
<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" />
      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
    <PostWriteDialog :model-value="postDialog" @update:model-value="(val) => (postDialog = val)" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getPosts } from "src/services";
import { useAsyncState } from "@vueuse/core";

import PostList from "src/components/apps/post/PostList.vue";
import PostHeader from "./components/PostHeader.vue";
import PostLeftBar from "./components/PostLeftBar.vue";
import PostRightBar from "./components/PostRightBar.vue";
import PostWriteDialog from "src/components/apps/post/PostWriteDialog.vue";

const router = useRouter();
// const goPostDetails = id => router.push(`/posts/${id}`);

const { state: posts } = useAsyncState(getPosts, [], {
  throwError: true,
});

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
```

```js [services/post.js]
import { getDocs } from "firebase/firestore";
export async function getPosts(params) {
  const querySnapshot = await getDocs(collection(db, "posts"));
  // const posts = [];
  // querySnapshot.forEach(docs => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(docs.id, ' => ', docs.data());
  //   posts.push(docs.data());
  // });
  const posts = querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  console.log(posts);
  return posts;
}
```

## 복합 쿼리 및 쿼리 연산자
### 레프트 메뉴 필터
```js [post.js]
export async function getPosts(params) {
  const conditions = [];
  if (params?.category) {
    conditions.push(where('category', '==', params?.category));
  }

  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  return posts;
}

```

```vue [pages/components/PostLeftBar.vue]
<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          :active="category === null"
          @click="changeCategory(null)"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          :active="category === cate.value"
          @click="changeCategory(cate.value)"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>
<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/services/category';
import { getPosts } from 'src/services';
const props = defineProps({
  category: {
    type: String,
    defult: '',
  },
});
const emit = defineEmits(['update:category']);
const categories = getCategories();
const changeCategory = value => {
  emit('update:category', value);
};
</script>

```

```vue [/pages/index.vue]
<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />
      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
    <PostWriteDialog
      :model-value="postDialog"
      @update:model-value="val => (postDialog = val)"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from 'src/services';
import { useAsyncState } from '@vueuse/core';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';

const router = useRouter();
const params = ref({
  category: null,
});
// const goPostDetails = id => router.push(`/posts/${id}`);

const { state: posts, execute } = useAsyncState(getPosts, [], {
  throwError: true,
});
watch(
  params,
  () => {
    execute(0, params.value);
  },
  {
    deep: true,
  },
);

const doSelectCate = val => {};

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>

```

```vue [components/apps/post/PostForm.vue]
<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-select
        v-model="categoryModel"
        outlined
        :options="categories"
        emit-value
        map-options
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <q-input
        outlined
        placeholder="태그를 입력해주세요~! (입력 후 Enter)"
        prefix="#"
        @keypress.enter.prevent="onRegistTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        outline
        dense
        color="teal"
        removable
        @remove="removeTag(index)"
      >
        {{ tag }}
      </q-chip>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
          :loading="loading"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { getCategories } from 'src/services/category';
import { validateRequired } from 'src/utils/validate-rules';
import TiptapEditor from 'src/components/tiptap/TiptapEditor.vue';

const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit',
]);

const $q = useQuasar();

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val),
});
const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val),
});
const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val),
});

const onRegistTag = e => {
  const tagValue = e.target.value.replace(/ /g, '');
  if (!tagValue) {
    return;
  }
  if (props.tags.length >= 10) {
    $q.notify('태그는 10개 이상 등록할 수 없습니다.');
    return;
  }
  if (props.tags.includes(tagValue) === false) {
    emit('update:tags', [...props.tags, tagValue]);
  }
  e.target.value = '';
};
const removeTag = index => {
  const model = [...props.tags];
  model.splice(index, 1);
  emit('update:tags', model);
};

const categories = getCategories();

const handleSubmit = () => {
  if (!contentModel.value) {
    $q.notify('내용을 작성하세요.');
    return;
  }
  emit('submit');
};
</script>

<style lang="scss" scoped></style>
```




```vue [src/components/apps/post/PostForm.vue]
<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input v-model="titleModel" outlined placeholder="제목" hide-bottom-space :rules="[validateRequired]" />
      <q-select v-model="categoryModel" outlined :options="categories" emit-value map-options hide-bottom-space :rules="[validateRequired]">
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <q-input outlined placeholder="태그를 입력해주세요~! (입력 후 Enter)" prefix="#" @keypress.enter.prevent="addTag" />
      <q-chip v-for="(tag, index) in tags" :key="tag" outline dense color="teal" removable @remove="removeTag(index)">
        {{ tag }}
      </q-chip>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn type="submit" flat label="저장하기" color="primary" :loading="loading" />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref, computed, toRef } from "vue";
import { useQuasar } from "quasar";
import { useTag } from "src/composables/useTag";
import { getCategories } from "src/services/category";
import { validateRequired } from "src/utils/validate-rules";
import TiptapEditor from "src/components/tiptap/TiptapEditor.vue";

const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:title", "update:category", "update:content", "update:tags", "submit"]);

const $q = useQuasar();

const titleModel = computed({
  get: () => props.title,
  set: (val) => emit("update:title", val),
});
const categoryModel = computed({
  get: () => props.category,
  set: (val) => emit("update:category", val),
});
const contentModel = computed({
  get: () => props.content,
  set: (val) => emit("update:content", val),
});

const { addTag, removeTag } = useTag({
  tags: toRef(props, "tags"),
  updateTags: (tags) => emit("update:tags", tags),
  maxLengthMessage: "태그는 10개 이상 등록할 수 없습니다.",
});

const categories = getCategories();

const handleSubmit = () => {
  if (!contentModel.value) {
    $q.notify("내용을 작성하세요.");
    return;
  }
  emit("submit");
};
</script>

<style lang="scss" scoped></style>
```

````vue [src/components/apps/post/PostWriteDialog.vue]
<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide" transition-show="none" transition-hide="none">
    <q-card :style="{ minWidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        :loading="isLoading"
        @submit="execute(1000, { ...form, uid: authStore.uid })"
      />
    </q-card>
  </q-dialog>
</template>

<!-- <script>
export default {
  inheritAttrs: false,
};
</script> -->
<script>
const getInitialForm = () => ({
  title: "",
  category: "",
  content: "",
  tags: [],
});
</script>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import { useAuthStore } from "src/stores/auth";

import { createPost } from "src/services";
import PostForm from "./PostForm.vue";

const emit = defineEmits(["complete"]);

const router = useRouter();
const authStore = useAuthStore();
const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
};

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: (postId) => {
    console.log("postId: ", postId);
    // router.push(`/posts/${postId}`);
    emit("complete");
  },
});
// const handleSubmit = async () => {
// await execute(1000, {
//   ...form.value,
//   uid: authStore.uid,
// });
// };
</script>

<style lang="scss" scoped></style>
```


## 정렬

```vue [src/pages/components/PostHeader.vue]
<template>
  <div class="flex items-center q-mb-lg">
    <div class="text-h5">전체</div>
    <q-space />
    <q-tabs :model-value="sort" @update:model-value="(value) => $emit('update:sort', value)" narrow-indicator dense>
      <q-tab :rapple="false" label="최신순" name="createdAt" />
      <q-tab :rapple="false" label="조회순" name="readCount" />
      <q-tab :rapple="false" label="좋아요순" name="likeCount" />
    </q-tabs>
  </div>
</template>

<script setup>
defineProps({
  sort: {
    type: String,
    default: "createdAt",
  },
});
defineEmits(["update:sort"]);
</script>

<style lang="scss" scoped></style>
```

```vue [src/pages/components/PostLeftBar.vue]
<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple :active="category === null" @click="changeCategory(null)">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item v-for="cate in categories" :key="cate.value" clickable v-ripple :active="category === cate.value" @click="changeCategory(cate.value)">
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from "src/components/StickySideBar.vue";
import { getCategories } from "src/services/category";

defineProps({
  category: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:category"]);

const changeCategory = (value) => {
  emit("update:category", value);
};

const categories = getCategories();
</script>
```

```vue [src/pages/components/PostRightBar.vue]
<template>
  <StickySideBar>
    <q-btn padding="8px 12px 8px 8px" unelevated color="primary" text-color="white" class="full-width" @click="$emit('openWriteDialog')">
      <q-avatar class="q-mr-sm" color="white" text-color="primary" size="22px">
        <q-icon name="edit" size="14px" />
      </q-avatar>
      <span class="text-weight-bold">새 포스트 작성하기</span>
    </q-btn>
    <q-card class="q-mt-md bg-grey-1" bordered flat>
      <q-card-section class="flex items-center q-pb-none">
        <div class="text-weight-bold">태그</div>
        <q-space />
        <q-btn icon="refresh" dense size="sm" flat round color="grey" />
      </q-card-section>
      <q-card-section class="q-pb-sm">
        <q-card class="q-px-sm" bordered flat square>
          <q-input borderless dense input-style="font-size: 12px;" placeholder="태그로 검색해보세요" @keypress.enter.prevent="addTag" />
          <div class="q-gutter-sm q-pb-sm">
            <q-btn
              v-for="(tag, index) in tags"
              :key="tag"
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
              @click="removeTag(index)"
            >
              {{ tag }} <q-icon name="clear" size="12px" color="grey"
            /></q-btn>
          </div>
        </q-card>
      </q-card-section>
      <q-list padding>
        <q-item clickable dense @click="addTag('vuejs')">
          <q-item-section class="text-teal text-caption"> #vuejs </q-item-section>
          <q-item-section side class="text-teal text-caption"> 10 </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import { ref, toRef } from "vue";
import { useTag } from "src/composables/useTag";
import StickySideBar from "src/components/StickySideBar.vue";

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["openWriteDialog", "update:tags"]);

const { addTag, removeTag } = useTag({
  tags: toRef(props, "tags"),
  updateTags: (tags) => emit("update:tags", tags),
  maxLengthMessage: "태그는 10개 이상 등록할 수 없습니다.",
});
</script>

<style lang="scss" scoped></style>
```

```vue [src/pages/index.vue]
<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />
      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" v-model:tags="params.tags" @open-write-dialog="openWriteDialog" />
    </div>
    <!-- :model-value="postDialog"
    @update:model-value="val => (postDialog = val)" -->
    <PostWriteDialog v-model="postDialog" @complete="completeRegistrationPost" />
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import { getPosts } from "src/services";
import { useAsyncState } from "@vueuse/core";

import PostList from "src/components/apps/post/PostList.vue";
import PostHeader from "./components/PostHeader.vue";
import PostLeftBar from "./components/PostLeftBar.vue";
import PostRightBar from "./components/PostRightBar.vue";
import PostWriteDialog from "src/components/apps/post/PostWriteDialog.vue";

const router = useRouter();
const params = ref({
  category: null,
  tags: [],
  sort: "createdAt",
});
// const goPostDetails = id => router.push(`/posts/${id}`);

const { state: posts, execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
});
watch(params, () => execute(0, params.value), {
  deep: true,
  immediate: true,
});

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
const completeRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};
</script>

<style lang="scss" scoped></style>
```

```js [src/services/post.js]
import { db } from "boot/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp, getDocs, query, where, orderBy } from "firebase/firestore";

export async function createPost(data) {
  // id 지정
  // await setDoc(
  //   doc(db, 'posts', 'post-id'),
  //   {
  //     title: 'hello world!',
  //     // ...data,
  //     // readCount: 0,
  //     // likeCount: 0,
  //     // commentCount: 0,
  //     // bookmarkCount: 0,
  //     // createdAt: serverTimestamp(),
  //   },
  //   {
  //     merge: true,
  //   },
  // );
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getPosts(params) {
  console.log("### params : ", params);
  // 1] 컬렉션에 있는 모든 문서 조회
  // const querySnapshot = await getDocs(collection(db, 'posts'));
  // // const posts = [];
  // // querySnapshot.forEach(docs => {
  // //   // doc.data() is never undefined for query doc snapshots
  // //   console.log(docs.id, ' => ', docs.data());
  // //   posts.push(docs.data());
  // // });
  // const posts = querySnapshot.docs.map(docs => {
  //   const data = docs.data();
  //   return {
  //     ...data,
  //     id: docs.id,
  //     createdAt: data.createdAt?.toDate(),
  //   };
  // });
  // console.log(posts);

  // 1] 컬렉션에 있는 문서를 쿼리해서 조회
  const conditions = [];
  if (params?.category) {
    conditions.push(where("category", "==", params?.category));
  }
  if (params?.tags && params?.tags.length > 0) {
    conditions.push(where("tags", "array-contains-any", params?.tags));
  }
  if (params?.sort) {
    conditions.push(orderBy(params.sort, "desc"));
  }

  const q = query(collection(db, "posts"), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  return posts;
}
```

## 상세페이지

## 수정

## 삭제

## 댓글 등록, 조회, 삭제

## 더보기
