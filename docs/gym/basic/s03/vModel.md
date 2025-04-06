## `v-model`

---

프론트엔드에서 입력 양식을 처리할 때 **입력 요소의 상태**와 **자바스크립트의 상태**를 **동기화**해야 하는 경우가 많습니다. `value`를 바인딩하고 `@input`이벤트로 `text`를 변경하는 것은 번거로울 수 있습니다.

```html
<input :value="text" @input="event => text = event.target.value" />
```

그래서 Vue에서는 이러한 작업은 단순화 하도록 양방향을 바인딩할 수 있는 `v-model`디렉티브를 제공합니다.

```html
<input v-model="text" />
```

## `textarea`

---

- `:value`, `@input`
  ```html
  <textarea
    :value="textareaValue"
    @input="(event) => (textareaValue = event.target.value)"
  ></textarea>
  ```
- `v-model`
  ```html
  <textarea v-model="textareaValue"></textarea>
  ```

## `checkbox`, `radio`, `select`

---

`v-model`은 내부적으로 HTML 요소가 어떤 요소냐에 따라 서로 다른 속성(`:value`)과 이벤트(`@input`)를 사용합니다.

- `input type=”text”`와 `textarea`는 `value` 속성과 `input` 이벤트를 사용합니다.
- `checkbox`와 `radio`버튼은 `checked` 속성과 `change` 이벤트를 사용합니다.
- `select` 태그는 `value` 속성과 `change` 이벤트를 사용합니다.

### checkbox

- `:checked`, `@change`
  ```html
  <input
    type="checkbox"
    :checked="checkboxValue"
    @change="(event) => (checkboxValue = event.target.checked)"
  />
  ```
- `v-model`
  ```html
  <input type="checkbox" v-model="checkboxValue" />
  ```

### radio

- `v-model`
  ```html
  <label>
    <input type="radio" name="type" value="O" v-model="radioValue" />
    O형
  </label>
  <label>
    <input type="radio" name="type" value="A" v-model="radioValue" />
    A형
  </label>
  ```

### select

- `v-model`
  ```html
  <select v-model="selectValue">
    <option value="html">HTML 수업</option>
    <option value="css">CSS 수업</option>
    <option value="javascript">JavaScript 수업</option>
  </select>
  ```

## `checkbox`

---

하나의 `checkbox`는 단일 `boolean` 값을 가집니다.

```html
<label>
  <input type="checkbox" v-model="checkboxValue" />
  {{ checkboxValue }}
</label>
```

여러개의 `checkbox`는 배열을 바인딩할 수 있습니다.

```html
<div>
  <label>
    <input type="checkbox" v-model="checkboxValues" value="html" />
    HTML
  </label>
  <label>
    <input type="checkbox" v-model="checkboxValues" value="css" />
    CSS
  </label>
  <label>
    <input type="checkbox" v-model="checkboxValues" value="javascript" />
    JavaScript
  </label>
  <p>{{ checkboxValues }}</p>
</div>
```

### 값 바인딩

단일 `checkbox` 일 때 `boolean`이 아닌 다른 값을 바인딩 하고 싶다면 `true-value`, `false-value` 속성을 사용할 수 있다.

```html
<label>
  <input
    type="checkbox"
    v-model="checkboxYN"
    true-value="Yes"
    false-value="No"
  />
  {{ checkboxYN }}
</label>
```

## `v-model` 수식어(modifiers)

---

### `.lazy`

기본적으로, `v-model`은 각 `input` 이벤트 후 입력과 데이터를 동기화 합니다. (단, [**앞에서 설명**](https://v3.ko.vuejs.org/guide/forms.html#vmodel-ime-tip)한 IME 구성은 제외됩니다.). `lazy` 수식어를 추가하여 `change` 이벤트 이후에 동기화 할 수 있습니다.

```html
<input v-model.lazy="text" />
```

### `.number`

사용자 입력이 자동으로 number 타입으로 형변환 되기를 원하면,  `.number` 수식어를 추가하면 됩니다.

```html
<input v-model.number="text" />
```

### **`.trim`**

사용자가 입력한 내용에서 자동으로 앞뒤 공백을 제거하는 트림처리가 되길 바란다면, `v-model`이 관리하는 input에 `trim` 수식어를 추가하면 됩니다.

```html
<input v-model.trim="text" />
```
