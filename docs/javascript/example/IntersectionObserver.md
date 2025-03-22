### IntersectionObserver

우리가 지정한 특정요소가 화면에 보일때 안보일때를 감지해서,
특정 동작을 할수있도록 도와주는 Web API

무한스크롤
이미지 레이지 로딩
광고 수익 계산

1. 예제

- 화면이 보이고 안보이고에 따라 class 추가 삭제

```js
const observer = new IntersectionObserver((entries) => {
  // [1] 보이고 안보이고에 따라  클래스 추가하기
  if (entries[0].isIntersecting) {
    console.log("Hello Observer!!");
    entries[0].target.classList.add("visible");
  } else {
    entries[0].target.classList.remove("visible");
  }
});
const $content = document.querySelector("#content3");
observer.observe($content);
```

2. 예제2

- 컨텐츠가 50%이상 보일때 노출

```js
const options = {
  threshold: 0.5,
};
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    console.log("Hello Observer!!");
    entries[0].target.classList.add("visible");
  } else {
    entries[0].target.classList.remove("visible");
  }
}, options);
const $content = document.querySelector("#content3");
observer.observe($content);
```

3. 예제3

- 모든 관찰자에 적용

```js
const options = {
  threshold: 0.5,
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersection) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  }, options);

  // if (entries[0].isIntersecting) {
  //   console.log("Hello Observer!!");
  //   entries[0].target.classList.add("visible");
  // } else {
  //   entries[0].target.classList.remove("visible");
  // }
}, options);
const list = document.querySelector(".content");
observer.observe(list);
list.forEach((o) => observer.observe(o));
// observer.observe($content)
```
