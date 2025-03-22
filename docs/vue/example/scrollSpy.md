---
outline: deep
---

```vue [App.vue]
<template>
  <div class="header">
    <ul class="gnb">
      <li v-for="menu in menus" :key="menu.id">
        <button
          class="btn"
          :id="menu.name"
          :class="active"
          type="button"
          @click="doScrollTo(menu.to)"
        >
          {{ menu.name }}
        </button>
      </li>
    </ul>
  </div>
  <div style="height: 1000px; background: yellow"></div>
  <div class="section" id="section1">section1</div>
  <div class="section" id="section2">section2</div>
  <div class="section" id="section3">section3</div>
  <div class="footer">footer</div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const menus = [
  { id: "#menu1", name: "menu1", to: "#section1" },
  { id: "#menu2", name: "menu2", to: "#section2" },
  { id: "#menu3", name: "menu3", to: "#section3" },
];
const active = ref();

function doScrollTo(_to) {
  const target = document.querySelector(_to);
  const targetOffsetTop = target.offsetTop;
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;
  window.scrollTo({ top: targetOffsetTop - headerHeight, behavior: "smooth" });
}
onMounted(() => {
  document.addEventListener("scroll", () => {
    const btns = document.querySelectorAll(".btn");
    const header = document.querySelector(".header");
    menus.forEach((menu) => {
      const target = document.querySelector(menu.to);
      const headerHeight = header.offsetHeight;
      const targetScrollStart = target.offsetTop - headerHeight;
      const targetScrollEnd = targetScrollStart + target.offsetHeight;
      if (
        window.scrollY >= targetScrollStart &&
        window.scrollY <= targetScrollEnd
      ) {
        const menuId = document.querySelector(menu.id);
        btns.forEach((btn) => btn.classList.remove("active"));
        menuId.classList.add("active");
      }
    });
    const firstMenu = document.querySelector(menus[0].to);
    if (window.scrollY < firstMenu.offsetTop) {
      btns.forEach((btn) => btn.classList.remove("active"));
    }
  });
});
</script>
<style scoped>
/* start reset */
button {
  background: #fff;
  border: 0;
  cursor: pointer;
  border: 1px solid #ccc;
}
.active {
  color: red;
}
ul,
li {
  list-style: none;
}
/* end reset */

.section {
  height: 500px;
}
.footer {
  height: 500px;
}
.pink {
  background: pink;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
ul {
  display: flex;
}
</style>
```
