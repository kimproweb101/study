---
outline : deep
---

## 등록
### 전역 등록
```js
import MyComponent from './App.vue'
app.component('MyComponent', MyComponent)
```
### 로컬 등록-setup
```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```
### 로컬 등록-setup이 아닌경우
```vue
import ComponentA from './ComponentA.js'
export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

### 컴포넌트 이름 표기법
PascalCase 권장
html 컴포넌트와 구분
ide 지원

```vue
<PascalCase />
```

## Props
### Props 선언 문자열
#### `<script setup>`
```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>
```

#### `!<script setup>`
```vue
<script>
export default {
  props: ['foo'],
  setup(props) {
    // setup()은 첫 번째 인자로 props를 받습니다.
    console.log(props.foo)
  }
}
</script>

```
### props 선언 객체

#### `<script setup>`
```js
defineProps({
  title: String,
  likes: Number
})
```

#### `!<script setup>`
```js
// <script setup>가 아닐 때
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

#### `setup lang="ts"`
```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

### Props 전달에 관한 심화
#### Props 이름 케이싱

```vue
<MyComponent greeting-message="안녕!" />
```
```vue
<script setup>
defineProps({
  greetingMessage: String
})
</script>
```
#### 정적 vs. 동적 Props
```vue
<BlogPost title="Vue와 함께한 나의 여행" />
```
```vue
<!-- 변수 값을 동적으로 할당 -->
<BlogPost :title="post.title" />

<!-- 복잡한 표현식의 값을 동적으로 할당 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

#### 다양한 타입의 값 전달
##### 숫자
```vue
// 숫자로 전달
<BlogPost :likes="42" />
```

##### 불리언
- 값이 없는 prop
```vue
<BlogPost is-published />
```

```vue
<BlogPost is-published="false" />
```


##### 배열
```vue
<!-- 배열이 정적이더라도 Vue에 이것이 문자열이 아닌         -->
<!-- JavaScript 표현식임을 알려주려면 v-bind가 필요합니다. -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 변수 값을 동적으로 할당 -->
<BlogPost :comment-ids="post.commentIds" />
```
##### 객체
```vue
<template>
  <!-- 객체가 정적이더라도 Vue에 이것이 문자열이 아닌         -->
  <!-- JavaScript 표현식임을 알려주려면 v-bind가 필요합니다. -->
  <BlogPost
    :author="{
      name: '신형만',
      company: '떡잎 상사'
    }"
  />

  <!-- 변수 값을 동적으로 할당 -->
  <BlogPost :author="post.author" />
</template>
```

#### 객체로 여러 속성 바인딩하기
```js
const post = {
  id: 1,
  title: 'Vue와 함께하는 나의 여정'
}
```

##### 여러 속성 바인딩
```js
<BlogPost v-bind="post" />
```

##### 여러 속성 풀어서 바인딩
```js
<BlogPost :id="post.id" :title="post.title" />
```

### 단방향 데이터 흐름

#### props 변경 잘못된 예
```js
const props = defineProps(['foo'])
// ❌ 경고, props는 읽기 전용입니다!
props.foo = 'bar'
```
#### props 초기값 사용
```js
const props = defineProps(['initialCounter'])
// props.initialCounter는 counter의 초기 값으로 사용됩니다.
// 추후 props가 갱신되어도 counter 값이 업데이트 되지 않습니다.
const counter = ref(props.initialCounter)
```

#### props computed
```js
const props = defineProps(['size'])
// prop이 변경될 때, 계산된 속성은 자동으로 업데이트 됩니다.
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```



### Prop 유효성 검사
```vue

```
### 불리언 캐스팅
```vue

```

## 이벤트
### 이벤트 발생 및 수신
```vue

```
### 이벤트 인수
```vue

```
### 발생하는 이벤트 선언하기
```vue

```
### 이벤트 유효성 검사
```vue

```

## 컴포넌트 v-model
### 기본 사용법
```vue

```
### v-model 인수
```vue

```
### Multiple v-model bindings
```vue

```
### v-model 수정자 처리하기
```vue

```

## 폴스루 속성
```vue

```
### 속성 상속
```vue

```
### class와 style의 병합
```vue

```
### v-on 리스너 상속
```vue

```
### 중첩된 컴포넌트 상속
```vue

```
### 속성 상속 비활성화
```vue

```
### 다중 루트 노드에서 속성 상속
```vue

```
### JavaScript에서 폴스루 속성 접근하기
```vue

```

## 슬롯
### 슬롯 컨텐츠와 아울렛
```vue

```
### 렌더링 범위
```vue

```
### 대체 컨텐츠
```vue

```
### 이름이 있는 슬롯
```vue

```
### 조건부 슬롯
```vue

```
### 동적인 슬롯 이름
```vue

```
### 범위가 지정된 슬롯
```vue

```

## Provide / inject
```vue

```
### Prop 드릴링
```vue

```
### Provide
```vue

```
### 앱 수준의 provide
```vue

```
### Inject
```vue

```
### 반응형으로 만들기
```vue

```
### 심볼 키 사용하기
```vue

```

## 비동기 컴포넌트
### 기본 사용법
```vue

```
### 로딩 및 에러 상태
```vue

```
### 지연(suspense) 사용하기
```vue

```