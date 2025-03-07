---
outline: deep
---

## Props

## Props 정의
- 부모 컴포넌트가 자식 컴포넌트에게 전달하는 값 

## Props 선언 & 사용

::: code-group
```vue [app.vue]
<template>
  <AppProps title='title' />
</template>
<script>
import AppProps from '/components/AppProps.vue'
export default{
 components : {
  AppProps
 }  
}
</script>
```

```vue [AppProps.vue]
// 선언된 프롭스는 바로 사용 가능
<template>
  <div>{{title}}</div>
</template>
<script>
export default{
  props:['title']
}
</script>
```
:::


### 문자열 배열 선언

```vue
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

### 객체문법 선언
```vue
export default {
  props: {
    title: String,
    likes: Number
  },
	setup(props) {
		console.log(props.title)
		console.log(props.likes)
	}
}
```
### 객체문법 자세히 선언
```vue
{
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    default() {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
}
```

## Props name Casing
- 부모 컴포넌트가 자식 컴포넌트로 값을 전달할때, 속성명으로 kebab-case 를 권장
- 자식컴포넌트에서 Props 를 사용할때 속성명은 camelCase 권장

```vue
<template>
  <MyComponent greeting-message="hello"></MyComponent>
</templtae>
```

```vue
<template>
  <div>{{greetingMessage}}</div>
</template>
<script>
export default{
  props:{
    greetingMessage:String
  }  
}
</script>
```

## 객체를 사용하여 다중 속성 전달
```vue
<template>
	<div>
		<AppChild :="posts" />
	</div>
</template>
<script>
import { ref } from 'vue';
import AppChild from './study/AppChild.vue';
export default {
	components: {
		AppChild
	},
	setup() {
		const posts=ref({
			id:1,
			title:'title'
		})
		return {posts};
	},
};
</script>
```

```vue
<template>
  <div>
    <div>{{ id }}</div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  props:{
    id:Number,
    title:String
  },
}
</script>
```
## 단방향 데이터 흐름
자식 컴퓨넌트에서 props 데이터 변경해보기
```vue
<template>
	<div>
		<AppChild :="post" @post="updatePost"/>
	</div>
</template>
<script>
import { ref } from 'vue';
import AppChild from './study/AppChild.vue';

export default {
	components: {
		AppChild
	},
	setup() {
		const post=ref({
			id:1,
			title:'title'
		})
		const updatePost=(val)=>{
			post.value=val
		}
		return {post,updatePost};
	},
};
</script>
```

```vue
<template>
  <div>
    <div>{{ id }}</div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  props:{
    id:Number,
    title:String
  },
  setup(props, {emit}){
    const post={
      id:2,
      title:'title2'
    }
    emit('post', post)
  }
}
</script>
```

### 객체 / 배열 Props 업데이트

JavaScript에서 객체와 배열이 참조 타입(Reference Type)으로 전달되기
아래와 같이 자식 컴포넌트에서 프롭스의 값을 변경할 수 있으니,
사용하지 않도록 주의 해야함

```vue
<template>
	<div>
		<AppChild :obj="obj"/>
	</div>
</template>
<script>
import { ref } from 'vue';
import AppChild from './study/AppChild.vue';
export default {
	components: {
		AppChild
	},
	setup() {		
		const obj={
			id:1,
			title:'title1',
		}
		// obj.id=2
		// obj.title='title2'
		return {obj};
	},
};
</script>
```

```vue
<template>
  <div>
    {{ obj }}
  </div>
</template>
<script>
export default {
  props:{
    obj : {
      type:Object,
      default: ()=>{}
    }  
  },
  setup(props, {emit}){
      props.obj.id=2
      props.obj.title='title2'
  }
}
</script>
```

## Boolean Casting
부모 컴포넌트에서 disabled 를 전달 : disabled=true 뜻

```vue
<template>
	<div>
		<AppChild disabled />
	</div>
</template>
<script>
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	}
}
</script>
```

```vue
<template>
  <div>
    disabled : {{ disabled }}
  </div>
</template>
<script>
export default {
  props:{
    disabled:Boolean
  },
  setup(props, {emit}){
    console.log(props.disabled)
  }
}
</script>
```
## 반응형을 잃지 않는 구조분해 할당
### toRef & toRefs

```vue
<template>
	<div>
		<p>author: {{ author }}</p>
		<p>title: {{ title }}</p>
	</div>
</template>

<script>
import { reactive, toRef, toRefs } from 'vue';

export default {
	setup() {
		const book = reactive({
			author: 'Vue Team',
			year: '2020',
			title: 'Vue 3 Guide',
			description: '당신은 지금 바로 이 책을 읽습니다  ;)',
			price: '무료',
		});

		// const { author, title } = toRefs(book);
		const author = toRef(book, 'author');
		const title = toRef(book, 'title');

		return { author, title, book };
	},
};
</script>
```