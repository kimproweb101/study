### 자바스크립트 스크롤 스파이

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scroll with Active Button in Header</title>
    <style>
      /* 헤더 스타일 */
      header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: #333;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        z-index: 1000;
      }

      /* 로고 스타일 */
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      /* 버튼 컨테이너 스타일 */
      .buttons {
        display: flex;
        gap: 10px;
      }

      /* 버튼 스타일 */
      button {
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        background: #f0f0f0;
        border: none;
        border-radius: 5px;
      }
      button.active {
        background: #007bff;
        color: white;
      }

      /* 박스 스타일 */
      .box {
        height: 500px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
        margin-top: 60px; /* 헤더 높이만큼 여백 추가 */
      }
    </style>
  </head>
  <body>
    <!-- 헤더 -->
    <header>
      <!-- 로고 -->
      <div class="logo">My Logo</div>

      <!-- 버튼 -->
      <div class="buttons">
        <button type="button" onclick="scrollToBox('box1')">box1</button>
        <button type="button" onclick="scrollToBox('box2')">box2</button>
        <button type="button" onclick="scrollToBox('box3')">box3</button>
      </div>
    </header>

    <!-- 박스 -->
    <div class="box" id="box1">box1</div>
    <div class="box" id="box2">box2</div>
    <div class="box" id="box3">box3</div>

    <script type="text/javascript">
      // 헤더 높이
      const headerHeight = 60;

      // 스크롤 함수
      function scrollToBox(boxId) {
        const box = document.getElementById(boxId);
        if (box) {
          const offset = box.offsetTop - headerHeight; // 헤더 높이만큼 오프셋 적용
          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }

      // 현재 활성화된 버튼 업데이트
      function updateActiveButton() {
        const boxes = document.querySelectorAll(".box");
        const buttons = document.querySelectorAll(".buttons button");

        boxes.forEach((box, index) => {
          const boxTop = box.offsetTop - headerHeight;
          const boxBottom = boxTop + box.offsetHeight;

          // 현재 스크롤 위치가 박스 범위 내에 있는지 확인
          if (window.scrollY >= boxTop && window.scrollY < boxBottom) {
            buttons.forEach((button) => button.classList.remove("active")); // 모든 버튼의 active 클래스 제거
            buttons[index].classList.add("active"); // 해당 버튼에 active 클래스 추가
          }
        });
      }

      // 스크롤 이벤트 리스너 추가
      window.addEventListener("scroll", updateActiveButton);

      // 초기 로드 시 활성화된 버튼 설정
      window.addEventListener("load", updateActiveButton);
    </script>
  </body>
</html>
```
