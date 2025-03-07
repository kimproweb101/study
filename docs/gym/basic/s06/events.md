---
outline: deep
---

## Event 개념
- 자식 컴포넌트에서 부모컴포넌트로 트리거, 데이터를 전달

## 발생 및 수신
```vue
<template>
	<button @click="$emit('someEvent')">버튼</button>
</template>
```

```vue
<MyComponent @some-event="callFunction" />
```

```vue
<MyComponent @some-event.once="callFunction" />
```

## 파라미터
```vue
<template>
	<button @click="$emit('someEvent', 'Hello', 'World', '!')">버튼</button>
</template>
```

```vue
<template>
	<MyComponent @some-event="callFunction" />
</template>

<script setup>
export default {
	setup() {
		const callFunction = (word1, word2, word3) => {
      console.log(word1, word2, word3);
    };
		return {
			callFunction
		}
	}
}
</script>
```

## 선언하기
### 배열 context
```vue
<script>
export default {
  emits: ['someEvent'],
  setup(props, context) {
    context.emit('someEvent', 'Hello World!')
  }
}
</script>
```
### 배열 context 구조분해
```vue
<script>
export default {
  emits: ['someEvent'],
  setup(props, {emit}) {
    context.emit('someEvent', 'Hello World!')
  }
}
</script>
```

### 객체
```vue
<script>
export default {
  emits: {
		// 유효성 검사가 없는 이벤트 선언
		someEvent: null,
		// 유효성 검사가 있는 이벤트 선언
		someSubmit: (result) => {
			if (email && password) {
	      return true
	    } else {
	      console.warn('result 값이 비어있습니다!')
	      return false
	    }
		}
	},
  setup(props, context) {
    context.emit('someEvent', 'Hello World!')
  }
}
</script>
```

## v-model

### v-model 동작 원리
```vue
<input type='text' v-model='title' />
```

```vue
<input type='text' :value='title' @input="title=$event.target.value" />
```

### v-model 컴포넌트
```vue
<LabelInput
	:modelValue="username"
	@update:modelValue="newValue => username = newValue"
/>
```

```vue
<template>
  <label>
    {{ label }}
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
<script>
export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
};
</script>
```


### computed
```vue
<template>
  <label>
    {{ label }}
    <input type="text" v-model="value" />
  </label>
</template>
<script>
import { computed } from 'vue';

export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        context.emit('update:modelValue', value);
      },
    });
    return {
      value,
    };
  },
};
</script>
```

### v-model 단일
```vue
<template>
	<div>
		<AppChild v-model="title" />		
	</div>
</template>
<script>
import { ref } from 'vue';
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){
		const title=ref('')		
		return {title}
	}
}
</script>
```

```vue
<template>
  <div>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>     
  </div>
</template>
<script>
export default {
  props:['modelValue'],
  emits:['update:modelValue']
}
</script>
```

### v-model 다중
```vue
<template>
	<div>
		<AppChild v-model:title="title" v-model:contents="contents"/>			
	</div>
</template>
<script>
import { ref } from 'vue';
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){
		const title=ref('')		
		const contents=ref('')		
		return {title,contents}
	}
}
</script>
```

```vue
<template>
  <div>
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)"/>  
    <input type="text" :value="contents" @input="$emit('update:contents', $event.target.value)"/>  
  </div>
</template>
<script>
export default {
  props:['title','contents'],
  emits:['update:title','update:contents']
}
</script>
```

### v-model 수식어
```vue

```