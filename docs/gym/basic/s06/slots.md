---
outline : deep
---

## Slot 정의
부모 컴포넌트에서 자식 컴포넌트로 슬롯을 사용하여 코드를 전달할 수 있습니다.

## Fallback Content
Fallback : (만일의 사태에 대한)대비책
부모에서 slot 컨텐츠를 전달하지 않으면 기본 컨텐츠를 제공할 수 있음

```vue
  <div>
    <slot>basic text</slot>
  </div>
```

```vue
<StudySlot></StudySlot>
```

## Named Slot
### Named Slot-basic
슬롯 요소에 이름에 부여해서 여러개의 슬롯을 정의

```vue
<StudySlot>
    <template v-slot:slot1>parent slot1</template>
    <template v-slot:slot2>parent slot1</template>
</StudySlot>
```

### Name Slot-단축
```vue
<StudySlot>
    <template #slot1>parent slot1</template>
    <template #slot2>parent slot1</template>
</StudySlot>
```

```vue
  <div>
    <slot name="slot1">slot1</slot>
    <slot name="slot2">slot2</slot>
  </div>
```

### Named Slot-암시적
```vue
    <div #header>header</div>
    <div #default>default</div>
    <div #footer>footer</div>
```

```vue
<template>
  <StudySlot>
    <template #header>header</template>
    default
    <template #footer>footer</template>
  </StudySlot>
</template>
```

## Dynamic Slot Named
```vue
<StudySlot>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</StudySlot>
```

## Render Scope

## Scoped Slots

## Named Scoped Slots