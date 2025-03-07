---
outline : deep
---

# template ref

## 예제1 dom에 직접 접근 값 출력, 값 변경, $refs로도 접근가능
```vue
<template>
  <div>
    <input type="text" ref="input" />
    <div>{{ input }}</div>
    <div>{{ input.value }}</div>
    <div>{{ $refs.input.value }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const input = ref(null)
    console.log('setup ' + input.value)
    onMounted(() => {
      console.log('onMounted:', input.value)
      input.value.value = 'onMounted에서 내용 삽입'
    })
    return { input }
  },
}
</script>


```
## 예제2 v-for 내부 참조-문자열 키
```vue
<template>
  <div>
    <ul>
      <li v-for="fruit in fruits" :key="fruit" ref="itemRefs">{{ fruit }}</li>
    </ul>
    <div>{{ itemRefs.value }}</div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const input = ref(null)
    console.log('setup', input.value)
    onMounted(() => {})
    const fruits = ref(['사과', '딸기', '포도'])
    const itemRefs = ref([])

    onMounted(() => {
      itemRefs.value.forEach((item) => {
        console.log(item.textContent)
      })
    })
    return { input, fruits, itemRefs }
  },
}
</script>
```

## 예제3 vue-for 내부 참조-함수
```vue
<template>
  <div>
    <ul>
      <li v-for="fruit in fruits" :key="fruit" :ref="(el) => itemRefs.push(el.textContent)">
        {{ fruit }}
      </li>
    </ul>
    <div>{{ itemRefs.value }}</div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const input = ref(null)
    console.log('setup', input.value)
    onMounted(() => {})
    const fruits = ref(['사과', '딸기', '포도'])
    const itemRefs = ref([])

    onMounted(() => {
      itemRefs.value.forEach((item) => {
        console.log(item)
      })
    })
    return { input, fruits, itemRefs }
  },
}
</script>
```


## 예제4 부모 자식간의 참조
부모
```vue
<template>
  <AppTemplateRefsChild ref="child" />
</template>
<script>
import { onMounted, ref } from 'vue'
import AppTemplateRefsChild from './AppTemplateRefsChild.vue'

export default {
  components: {
    AppTemplateRefsChild,
  },
  setup() {
    const child = ref()
    onMounted(() => {
      console.log(child.value.message)
    })
    return { child }
  },
}
</script>

```
자식
```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const message = ref('hello~!')
    const sayHello = () => {
      alert(message.value)
    }
    return { message, sayHello }
  },
}
</script>
```

## 예제5 자식 컴포넌트에서 부모 컴포넌트 접근
```vue
<template>
  <div>
    {{ $parent }}
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>

```

```vue
<template>
  <AppTemplateRefsParent ref="child" />
</template>
<script>
import { ref } from 'vue'
import AppTemplateRefsParent from './AppTemplateRefsParent.vue'

export default {
  components: {
    AppTemplateRefsParent,
  },
  setup() {
    const title = ref('title')
    return { title }
  },
}
</script>

```

