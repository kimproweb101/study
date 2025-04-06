반응형 데이터가 변경되는것을 감지해서 다른 작업을 수행
감지할 반응형 데이터+콜백함수

1. 특정 반응형 상태가 변경되었을

2. ref, reactive, computed getter 함수등

```vue
<script setup>
// getter 함수 x,y 의 값이 변경할때 합계 console로 출력하기
import { ref, watch } from "vue";
const x = ref(1);
const y = ref(1);
watch(
  () => x.value + y.value,
  (newValue, oldValue) => {
    console.log("sum:", newValue);
  }
);
</script>
```

```vue
// 배열
<script setup>
import { ref, watch } from "vue";
const x = ref(1);
const y = ref(1);
watch([x, y], ([newX, newY]) => {
  console.log(newX, newY);
});
</script>
```

```vue
// reactive 데이터 감시하기
<script setup>
import { ref, reactive, watch } from "vue";

const obj = reactive({
  count: 0,
});

watch(
  () => obj.count,
  (newVal, oldVal) => {
    console.log("obj changed", newVal, oldVal);
  }
);
</script>
```

::: code-group

- 잘못된 예
- oldValue, newValue 가 같은 객체를 가리키기 때문에 같은 값 출력

```vue
<script setup>
import { ref, reactive, watch } from "vue";
const obj = reactive({
  count: 0,
});
watch(obj, (newVal, oldVal) => {
  console.log("obj changed", newVal, oldVal);
});
</script>
```

:::

```vue
<script setup>
import { ref, reactive, watch } from "vue";
const person = reactive({
  name: "홍길동",
  age: 30,
  hobby: "운동",
  obj: {
    count: 0, // count 값을 변경해보면 watch가 작동하지 않음
  },
});
watch(
  () => person.obj,
  (newVal) => {
    console.log("newVal", newVal);
  }
);
</script>
```

```vue [검색어 입력에 따라 api 호출]
<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const query = ref("");
const result = ref(null);

watch(query, async (newQuery) => {
  if (newQuery.length < 2) {
    return;
  }
  const res = await axios.get(`/api/search?q=${newQuery}`);
  result.value = res.data;
});
</script>
```

::: info watchEffect

1.

- watchEffect 콜백함수 내부에서 변화가 발생할때 실행

```vue [watchEffect]
<script setup>
import { ref, watch } from "vue";

const title = ref("");
const contents = ref("");

watch(() => {
  console.log("watchEffect");
  console.log("title" + title.value);
  console.log("contents" + contents.value);
});
</script>
```

2 v-model.lazy
포커스가 빠지거나 Enter

```vue
<template>
  <input type="text" v-model.lazy="title" />
</template>
```

3. watch watchEffect
   | 항목 | `watch` | `watchEffect` |
   |------------------|------------------------------------------|--------------------------------------------|
   | 사용 목적 | 특정 반응형 상태를 **감시** | 반응형 상태에 **자동으로 반응** |
   | 감시 대상 지정 | 명시적으로 지정 필요 (`ref`, `getter`) | 명시할 필요 없음 (사용된 값 자동 추적) |
   | 실행 시점 | 값이 변경될 때 | 선언 즉시 한 번 실행 + 이후 값 변경 시 |
   | 파라미터 | `(newVal, oldVal)` | `() => { ... }` 형식, 인자 없음 |
   | deep 감시 | `{ deep: true }` 옵션 필요 | 내부적으로 자동 처리 (단, 주의 필요) |
   | 주 용도 | 두 값 비교, 조건 분기, API 호출 등 | 간단한 반응형 동작 처리 |
   | 의존성 추적 방식 | 개발자가 지정 | Vue가 자동 추적 |
   | 예시 | `watch(count, callback)` | `watchEffect(() => { console.log(count) })` |

:::
