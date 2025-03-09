
### props로 데이터 넘기기
- 나눠서 넘기기
- 한꺼번에 넘기기 

```vue
<template>
<!-- <PostItem v-for="post in posts" :key="post.id" :id="post.id" :title="post.title" /> -->
  <PostItem v-for="post in posts" :key="post.id" v-bind="post" />  
</template>
<script setup>
const posts=[
  {id:1,title:'title1'},
  {id:2,title:'title2'}
  {id:3,title:'title3'}
  ]
</script>
```

```vue [배열 문법]
<script setup>
defineProps([id,title])
</script>
```

```vue [객체 문법1]
<script setup>
defineProps({
  id:String,
  title:String
})
</script>
```

```vue [객체 문법2]
<script setup>
defineProps({
  id:{
    type:String
  },
  title:{
    type:String
  }
})
</script>
```

패턴1
안좋은 패턴
PostItem 에서 반복문을 돌려서
재사용성에 좋지 않음

Index, 
PostList,
PostItem 

```vue
<template>
  <PostList :items="items"/>
</template>
```

```vue
<template>
  <PostItem v-bind="items" />
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    default: ()=> []
  }
})
</script>
```

```vue
<template>
  <div v-for="item in items" :key="item.id">
    <span>{{item.id}}</span><span>{{item.title}}</span>
  </div>
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    default: ()=> []
  }
})
</script>
```

패턴2
PostList 에서 반복하기 떄문에, PostItem 을 다른곳에서 재사용 할 수 있음

```vue
<template>
  <PostList :items="items"/>
</template>
```

```vue
<template>
  <PostItem v-for="item in items" :key="item.id" v-bind="item" />
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    default: ()=> []
  }
})
</script>
```

```vue
<template>
  <div>
    <span>{{item.id}}</span><span>{{item.title}}</span>
  </div>
</template>
<script setup>
defineProps({
  id: Number,
  title: String
})
</script>
```