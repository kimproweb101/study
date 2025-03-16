```vue [scrollSpy.vue]
<template>
  <q-layout view="hHh Lpr fFf">
    <!-- 🔹 상단 고정 네비게이션 -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Scroll Spy</q-toolbar-title>
        <q-btn
          flat
          label="섹션 1"
          @click="scrollTo('section1')"
          :class="{ active: activeSection === 'section1' }"
        />
        <q-btn
          flat
          label="섹션 2"
          @click="scrollTo('section2')"
          :class="{ active: activeSection === 'section2' }"
        />
        <q-btn
          flat
          label="섹션 3"
          @click="scrollTo('section3')"
          :class="{ active: activeSection === 'section3' }"
        />
      </q-toolbar>
    </q-header>

    <!-- 🔹 메인 컨텐츠 (스크롤 가능) -->
    <q-page-container>
      <q-page>
        <div
          v-for="section in sections"
          :key="section.id"
          :id="section.id"
          class="spy-section"
        >
          <h2>{{ section.label }}</h2>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";

const sections = ref([
  { id: "section1", label: "섹션 1" },
  { id: "section2", label: "섹션 2" },
  { id: "section3", label: "섹션 3" },
]);

const activeSection = ref("");

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { threshold: 0.5 } // 50% 이상 보일 때 감지
  );

  sections.value.forEach((section) => {
    observer.observe(document.getElementById(section.id));
  });
});
</script>

<style>
/* 🔹 섹션 스타일 */
.spy-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  font-size: 24px;
}

/* 🔹 현재 활성화된 버튼 스타일 */
.q-btn.active {
  background: #fff;
  color: #1976d2;
  font-weight: bold;
  border-radius: 5px;
}
</style>
```
