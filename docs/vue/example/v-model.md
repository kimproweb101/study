---
outline : deep
---

::: tip

:::

```vue
<template>
  <PostForm v-model:title="form.title" v-model:content="form.content" />
</template>
<script>
const getInitialForm = () => ({
  title: '',
  content: '',
});
</script>
<script setup>
import { ref } from 'vue';
import PostForm from './PostForm.vue';
const form = ref(getInitialForm());
const onHide = () => {
  form.value = getInitialForm();
};
</script>
```

```vue
<template>
  <form>
    <div>
      <input v-model="titleModel" placeholder="제목" />  
      <input v-model="contentModel" />
    </div>
    <div>
      <slot name="actions">
        <button flat label="취소하기">취소</button>
        <button type="submit">등록</button>
      </slot>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCategories } from 'src/services/category';

const props = defineProps({
  title: {
    type: String,
  }, 
  content: {
    type: String,
  },
});

const emit = defineEmits([
  'update:title',
  'update:content',
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val),
});
const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val),
});
</script>
```