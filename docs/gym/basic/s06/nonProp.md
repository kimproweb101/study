---
outline: deep
---

## Non-Prop 속성 (fallthrough 속성)
Non-Prop 속성은 props 또는 event 에 명시적으로 선언되지 않은 속성 또는 이벤트 입니다. 예를 들어 class, style, id와 같은 것들이 있습니다.

## 속성 상속
컴포넌트가 단일 루트 요소로 구성되어 있으면 Non-Prop 속성은 루트 요소의 속성에 자동으로 추가됨

부모
```vue
<MyButton class="large" />
```
자식
```vue
<!-- template of <MyButton> -->
<button>click me</button>
```
최종 렌더링
```vue
<button class="large">click me</button>
```

## class, style 속성 병합
```vue
<MyButton class="btn">click</MyButton>
```

```vue
<MyButton class="btn-primary">click</MyButton>
```
최종 렌더링
```vue
<MyButton class="btn btn-primary">click</MyButton>
```

## v-on 이벤트 리스너 상속
```vue
<MyButton @click="onClick">click</MyButton>
```
- `@click` 리스너는 `<MyButton>`의 컴포넌트 루트요소인 `<button>`요소에 추가됩니다.
- 만약 `<button>`요소에 이미 바인딩된 이벤트가 있다면 이벤트가 추가되어 두 리스너 모두 트리거 됩니다.

```vue
<template>
	<AppChild @click="doConsole"/>	
</template>
<script>
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){	
		const doConsole=()=>{
      console.log('doConsole1')
    }
    return {doConsole}
	}
}
</script>
```

```vue
<template>
  <button type="button">click</button>
</template>
```



## 속성 상속 비활성화
컴포넌트가 자동으로 Non-Prop 속성을 상속하지 않도록 하려면 컴포넌트의 inheritAttrs: false 옵션을 설정할 수 있습니다.


버튼 클릭시 alert 을 띄우고 싶은데 div 태그 클릭시 작동함
```vue
<template>
	<AppChild @click="doConsole"/>	
</template>
<script>
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){	
		const doConsole=()=>{
      console.log('doConsole1')
    }
    return {doConsole}
	}
}
</script>
```

```vue
<template>
  <div style="background:red;">
    <button type="button">click</button>
  </div>
</template>
<script>
export default {
  setup (){ 
    return {}
  }  
}
</script>
```

해결 : 속성 바인딩 - context.attrs.onClick() 와같이 바로 실행도 가능
```vue
<template>
  <div style="background:red;">
    <button type="button" v-bind="$attrs">click</button>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  setup (props,context){ 
    console.log(context.attrs)
    console.log(context.attrs.class)
    console.log(context.attrs.id)
    console.log(context.attrs.onClick)
    context.attrs.onClick()
    return {}
  }  
}
</script>
```

## Fragments
### Vue2.x 문법
### Vue3.x 문법


## 여러 루트노드의 속성 상속
```vue
<CustomLayout id="custom-layout"></CustomLayout>
```

```vue
<template>
  <header></header>
  <main v-bind="$attrs"></main>
  <footer></footer>
</template>
```

## JavaScript 에서 Non-Prop 속성 접근

### 주의사항 예제
props 및 event 는 루트 엘리먼트에 상속됨
div 의 이벤트 리스너 Framework 에 click 이 상속됨
div 에도 click, button 에도 click 리스너가 생성되어
alert이 두번 발생함

```vue
<template>
	<AppChild @click="click"/>	
</template>
<script>
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){	
		const click=()=>{
      alert('click')
    }
    return {click}
	}
}
</script>
```

```vue
<template>
  <div style="background:red;">
    <button type="button" @click="$emit('click')">click</button>
  </div>
</template>
```

### 해결
아래와 같이 inheritAttrs 를 false 로 하고 $attrs 를 명시함
emits 옵션을 명시해줌
inheritAttrs:false,
emits:['click'],

```vue
<template>
	<AppChild @click="click"/>	
</template>
<script>
import AppChild from './study/AppChild.vue';
export default{
	components: {
		AppChild
	},
	setup(){	
		const click=()=>{
      alert('click')
    }
    return {click}
	}
}
</script>
```

```vue
<template>
  <div style="background:red;">
    <button type="button" v-bind="$attrs" @click="$emit('click')">click</button>
  </div>
</template>
<script>
export default {
  inheritAttrs:false,
  emits:['click'],
}
</script>
```