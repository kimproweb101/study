---
outline : deep
---

## 앱 생성
### 앱 인스턴스
```js
//main.js
import { createApp } from 'vue'
const app = createApp({
  /* 최상위 컴포넌트 옵션 */
})
```
### 최상위 컴포넌트
```js
//main.js
import { createApp } from 'vue'
// 싱글 파일 컴포넌트에서 최상위 컴포넌트 앱을 가져옵니다.
import App from './App.vue'
const app = createApp(App)
```

### 앱 마운트하기
```js{5}
//main.js
import { createApp } from 'vue'
// 싱글 파일 컴포넌트에서 최상위 컴포넌트 앱을 가져옵니다.
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
```

### 앱 환경설정
### 멀티 앱 인스턴스

## 템플릿 문법
### 텍스트 보간법
```js
<div>{{title}}</div>
<script setup>
const title='title'
</script>
```

### HTML 출력
```js
<template>
  <div v-html="html"></div>
<template>
<div></div>
<script setup>
const html="<div><strong>html</strong></div>"
</script>
```

### 속성 바인딩
클레스 속성, 버튼 속성 바인딩

```js
<template>
  <div :class="{ red: true }">
    study
    <button :disabled="disabled">button</button>
  </div>
</template>

<script setup>
const disabled = false
</script>
<style lang="scss" scoped>
.red {
  color: red;
}
</style>

```

### JavaScript 표현식 사용
### 디렉티브

## 반응형 기초
### 반응형 상태 설정
#### ref()
#### `<script setup>`
#### 왜 Refs 입니까?
#### 깊은 반응형
#### DOM 업데이트 타이밍
### reactive()
#### 반응형 재정의 vs. 원본
#### reactive()의 제한 사항
### 추가적인 Ref 언래핑 세부 사항
#### Reactive 객체 프로퍼티
#### 배열 및 컬렉션의 주의 사항
#### 템플릿에서 래핑 해제 시 주의 사항

## 계산된 속성
### 기본 예제
### 계산된 캐싱 vs 메서드
### 수정 가능한 계산된 속성
### 모범 사례

## 클래스와 스타일 바인딩
### HTML 클래스 바인딩
### 인라인 스타일 바인딩

## 조건부 렌더링
### v-if
### v-else
### v-else-if
### `<template>`에서 v-if
### v-show
### v-if vs v-show
### v-if with v-for

## 리스트 렌더링
### v-for
### 객체에 v-for 사용하기
### 숫자 범위에 v-for 사용하기
### `<template>`에서 v-for 사용하기
### v-if에 v-for 사용하기
### key를 통한 상태유지
### 컴포넌트에 v-for 사용하기
### 배열 변경 감지
### 필터링/정렬 결과 표시
### Sponsors


## 이벤트 핸들링
### 이벤트 리스닝하기
### 인라인 핸들러
### 메서드 핸들러
### 인라인 핸들러에서 메서드 호출하기
### 인라인 핸들러에서 이벤트 객체 접근하기
### 이벤트 수식어
### 입력키 수식어
### 마우스 버튼 수식어

## Form 입력 바인딩
### 기본 사용법
#### 텍스트
#### 여러 줄 텍스트
#### 체크박스
#### 라디오
#### 셀렉트
### 값 바인딩 하기
#### Checkbox
#### 라디오
#### 셀렉트 옵션
### 수식어
#### .lazy
#### .number
#### .trim
### 컴포넌트에 v-model 사용하기

## 생명주기 훅
### 생명 주기 훅 등록하기
### 생명 주기 표

## 감시자
### 기본 예제
### 깊은 감시자
### Eager 감시자
### Once 감시자
### watchEffect()
### 콜백 플러시 타이밍
### this.$watch()
### 감시자 중지


## 템플릿 참조
### ref로 접근하기
### v-for 내부에서 ref 사용하기
### 함수로 참조하기
### 컴포넌트에 ref 사용하기

## 컴포넌트 기초
### 컴포넌트 정의하기
### 컴포넌트 사용하기
### Props 전달하기
### 이벤트 청취하기
### 슬롯이 있는 컨텐츠 배포
### 동적 컴포넌트
### in-DOM 템플릿 파싱 주의 사항

