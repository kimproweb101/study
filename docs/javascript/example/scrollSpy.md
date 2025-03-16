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

2. gtp 1차 코드

```vue
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          @click="toggleDrawer"
          v-if="$q.screen.xs"
        />
        <q-toolbar-title> Quasar Scroll Spy </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          :class="{ active: activeSection === 'section1' }"
          label="Menu1"
          @click="scrollTo('section1')"
          v-if="!$q.screen.xs"
        />
        <q-btn
          flat
          :class="{ active: activeSection === 'section2' }"
          label="Menu2"
          @click="scrollTo('section2')"
          v-if="!$q.screen.xs"
        />
        <q-btn
          flat
          :class="{ active: activeSection === 'section3' }"
          label="Menu3"
          @click="scrollTo('section3')"
          v-if="!$q.screen.xs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" overlay behavior="mobile">
      <q-list>
        <q-item
          clickable
          :class="{ active: activeSection === 'section1' }"
          @click="scrollTo('section1')"
        >
          <q-item-section>Menu1</q-item-section>
        </q-item>
        <q-item
          clickable
          :class="{ active: activeSection === 'section2' }"
          @click="scrollTo('section2')"
        >
          <q-item-section>Menu2</q-item-section>
        </q-item>
        <q-item
          clickable
          :class="{ active: activeSection === 'section3' }"
          @click="scrollTo('section3')"
        >
          <q-item-section>Menu3</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container @scroll="onScroll">
      <q-page class="q-pa-md">
        <div ref="section1" class="section bg-pink">Section 1</div>
        <div ref="section2" class="section bg-red">Section 2</div>
        <div ref="section3" class="section bg-green">Section 3</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const drawer = ref(false);
const section1 = ref(null);
const section2 = ref(null);
const section3 = ref(null);
const activeSection = ref("");

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const scrollTo = (section) => {
  const target = {
    section1: section1.value,
    section2: section2.value,
    section3: section3.value,
  }[section];
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    activeSection.value = section;
    drawer.value = false; // 모바일에서 메뉴 클릭 후 닫기
  }
};

const onScroll = () => {
  const sections = [
    { id: "section1", el: section1.value },
    { id: "section2", el: section2.value },
    { id: "section3", el: section3.value },
  ];

  for (const section of sections) {
    if (section.el) {
      const rect = section.el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.section {
  height: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.active {
  font-weight: bold;
  color: #ffeb3b;
}
</style>
```

2. gtp 2차 코드 모바일 작동 안함 처리함

```vue [완성된 코드]
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Quasar Scroll Spy</q-toolbar-title>
        <q-space />
        <template v-if="!$q.screen.xs">
          <q-btn
            flat
            :class="{ active: activeSection === 'section1' }"
            label="Menu1"
            @click="scrollTo('section1')"
          />
          <q-btn
            flat
            :class="{ active: activeSection === 'section2' }"
            label="Menu2"
            @click="scrollTo('section2')"
          />
          <q-btn
            flat
            :class="{ active: activeSection === 'section3' }"
            label="Menu3"
            @click="scrollTo('section3')"
          />
        </template>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          @click="toggleDrawer"
          v-if="$q.screen.xs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="right" overlay behavior="mobile">
      <q-list>
        <q-item
          clickable
          :class="{ active: activeSection === 'section1' }"
          @click="handleDrawerClick('section1')"
        >
          <q-item-section>Menu1</q-item-section>
        </q-item>
        <q-item
          clickable
          :class="{ active: activeSection === 'section2' }"
          @click="handleDrawerClick('section2')"
        >
          <q-item-section>Menu2</q-item-section>
        </q-item>
        <q-item
          clickable
          :class="{ active: activeSection === 'section3' }"
          @click="handleDrawerClick('section3')"
        >
          <q-item-section>Menu3</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <div style="height: 1000px">mainbanner</div>
        <div ref="section1" class="section bg-pink">Section 1</div>
        <div ref="section2" class="section bg-red">Section 2</div>
        <div ref="section3" class="section bg-green">Section 3</div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const drawer = ref(false);
const activeSection = ref("");
const section1 = ref(null);
const section2 = ref(null);
const section3 = ref(null);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const scrollTo = (sectionId) => {
  const target = { section1, section2, section3 }[sectionId]?.value;
  if (target) {
    window.scrollTo({ top: target.offsetTop - 50, behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

const handleDrawerClick = (sectionId) => {
  drawer.value = false;
  nextTick(() => {
    scrollTo(sectionId);
  });
};

const onScroll = () => {
  let foundSection = "";
  const sections = { section1, section2, section3 };
  for (const [id, refEl] of Object.entries(sections)) {
    if (refEl.value) {
      const rect = refEl.value.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        foundSection = id;
        break;
      }
    }
  }
  activeSection.value = foundSection;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.section {
  height: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.active {
  font-weight: bold;
  color: #ffeb3b;
}
</style>
```

2-1. nextTick 개념
nextTick()는 Vue에서 DOM 업데이트가 완료된 후에 특정 코드를 실행하고 싶을 때 사용하는 함수입니다.

2-2. 왜 nextTick()이 필요한가?
Quasar의 q-drawer에서 메뉴를 클릭하면 drawer.value = false;로 드로어를 닫습니다.
하지만 Vue의 반응형 시스템은 비동기적으로 동작하기 때문에,
drawer가 닫히는 애니메이션이 끝나기 전에 scrollTo(sectionId)가 실행되면 올바른 스크롤 동작이 보장되지 않을 수 있습니다.

2-3. 해결 방법
nextTick()을 사용하면, drawer.value = false;가 반영되어 드로어가 닫힌 후에 scrollTo()가 실행됩니다.

```js
const handleDrawerClick = (sectionId) => {
  drawer.value = false; // 드로어 닫기
  nextTick(() => {
    // DOM 업데이트 후 실행
    scrollTo(sectionId);
  });
};
```

2-4. 설명 nextTick() 이 필요한 경우

- v-if, v-show, q-drawer 같은 UI 요소가 변경된 후에 무언가를 실행할 때
- DOM 조작(스크롤, 크기 계산 등)이 Vue의 업데이트 후에 이루어져야 할 때

```js
const handleDrawerClick = (sectionId) => {
  drawer.value = false; // 드로어 닫기
  nextTick(() => {
    // DOM 업데이트 후 실행
    scrollTo(sectionId);
  });
};
```
