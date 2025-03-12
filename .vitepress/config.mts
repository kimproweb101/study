import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config

export default defineConfig({
  base: "/study/",
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin, {
        titleBar: { includeSnippet: true },
      });
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  title: "KIM STUDY",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "trouble", link: "/docs/trouble/index.md" },
      { text: "tutorials", link: "/docs/tutorials/index.md" },
      { text: "javascript", link: "/docs/javascript/javascript.md" },
      { text: "vue", link: "/docs/vue/basic.md" },
      { text: "Gym", link: "/docs//gym/basic/index.md" },
      { text: "Program", link: "/docs//program/비주얼스튜디오코드.md" },
    ],
    sidebar: {
      "/docs/tutorials/": [
        {
          text: "tutorials",
          items: [
            {
              text: "vue",
              items: [
                { text: "home", link: "/docs/tutorials/index.md" },
                { text: "ui", link: "/docs/tutorials/vue/ui.md" },
                {
                  text: "plugins",
                  link: "/docs/tutorials/vue/plugins.md",
                  items: [
                    { text: "unplugin-vue-router", link: "/docs/tutorials/vue/plugins/unplugin-vue-router.md" },
                    { text: "vite-plugin-vue-layouts", link: "/docs/tutorials/vue/plugins/vite-plugin-vue-layouts.md" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      "/docs/vue/": [
        {
          text: "vue",
          items: [
            { text: "basic", link: "/docs/vue/basic.md" },
            {
              text: "example",
              items: [
                { text: "AuthModal", link: "/docs/vue/example/AuthModal.md" },
                { text: "AuthModalDynamic", link: "/docs/vue/example/AuthModalDynamicComponent.md" },
                { text: "boardJsonServer", link: "/docs/vue/example/boardJsonServer.md" },
                { text: "useModal", link: "/docs/vue/example/useModal.md" },
                { text: "snackbar", link: "/docs/vue/example/snackbar.md" },
                { text: "v-model", link: "/docs/vue/example/v-model.md" },
              ],
            },
            { text: "bootstrap", link: "/docs/vue/bootstrap.md" },
            { text: "quasar", link: "/docs/vue/quasar.md" },
            { text: "firebase", link: "/docs/vue/firebase/firebase.md" },
          ],
        },
      ],
      "/docs/gym/": [
        {
          text: "Firebase",
          items: [{ text: "시작하기", link: "/docs/gym/firebase-git/30_create_post.md" }],
        },
        {
          text: "Firebase",
          items: [
            { text: "시작하기", link: "/docs/gym/firebase/s01.md" },
            { text: "Auto Page&Layout", link: "/docs/gym/firebase/s02.md" },
            { text: "Quasar 활용 UI 만들기", link: "/docs/gym/firebase/s03.md" },
            { text: "Firebase 시작하기", link: "/docs/gym/firebase/s04.md" },
            { text: "Firebase Authentication", link: "/docs/gym/firebase/s05.md" },
            { text: "VueUse & 공통 기능", link: "/docs/gym/firebase/s06.md" },
            { text: "Firebase Cloud Firestore", link: "/docs/gym/firebase/s07.md" },
            { text: "Web API & 고도화", link: "/docs/gym/firebase/s08.md" },
            { text: "Firebase Cloud Storage", link: "/docs/gym/firebase/s09.md" },
            { text: "Firebase Cloud Functions", link: "/docs/gym/firebase/s10.md" },
            { text: "Algolia Search", link: "/docs/gym/firebase/s11.md" },
            { text: "Firebase 보안규칙 & 배포(Hosting)", link: "/docs/gym/firebase/s12.md" },
            { text: "마치며", link: "/docs/gym/firebase/s13.md" },
          ],
        },
        {
          text: "Basic",
          items: [
            { text: "강의소개" },
            { text: "준비하기", link: "/docs/gym/basic/s02/s02.md" },
            {
              text: "Vue3 Composition API",
              collapsed: true,
              items: [
                { text: "CompositionAPI", link: "/docs/gym/basic/s03/compositionApi.md" },
                { text: "Setup", link: "/docs/gym/basic/s03/setupHook.md" },
                { text: "템플릿 문법", link: "/docs/gym/basic/s03/templateSyntax.md" },
                { text: "반응형 기초", link: "/docs/gym/basic/s03/reactivity.md" },
                { text: "Computed", link: "/docs/gym/basic/s03/computed.md" },
                { text: "클래스&스타일 바인딩", link: "/docs/gym/basic/s03/classStyleBind.md" },
                { text: "조건부 렌더링", link: "/docs/gym/basic/s03/if.md" },
                { text: "목록 렌더링", link: "/docs/gym/basic/s03/for.md" },
                { text: "디렉티브(directives)", link: "/docs/gym/basic/s03/directives.md" },
                { text: "이벤트 처리", link: "/docs/gym/basic/s03/event.md" },
                { text: "양방향 바인딩", link: "/docs/gym/basic/s03/vModel.md" },
                { text: "Watch, WatchEffect", link: "/docs/gym/basic/s03/watchWatchEffect.md" },
                { text: "Dynamic Components", link: "/docs/gym/basic/s03/dynamicComponents.md" },
              ],
            },
            { text: "Bootstrap5", link: "/docs/gym/basic/s05/s05.md" },
            {
              text: "컴포넌트 기초+심화",
              collapsed: true,
              items: [
                { text: "컴포넌트 기초", link: "/docs/gym/basic/s06/componentBasic.md" },
                { text: "Single File Component", link: "/docs/gym/basic/s06/singgleFileComponent.md" },
                { text: "Props", link: "/docs/gym/basic/s06/props.md" },
                { text: "Events", link: "/docs/gym/basic/s06/events.md" },
                { text: "Non-Prop", link: "/docs/gym/basic/s06/nonProp.md" },
                { text: "Slots", link: "/docs/gym/basic/s06/slots.md" },
                { text: "Provide/Inject", link: "/docs/gym/basic/s06/provideInject.md" },
                { text: "LifecycleHooks", link: "/docs/gym/basic/s06/lifecycleHooks.md" },
                { text: "Template Refs", link: "/docs/gym/basic/s06/templateRefs.md" },
                { text: "script setup", link: "/docs/gym/basic/s06/scriptSetup.md" },
                { text: "동적 컴포넌트", link: "/docs/gym/basic/s06/dynamicComponent.md" },
                { text: "마치며", link: "/docs/gym/basic/s07/s07.md" },
              ],
            },
          ],
        },
        {
          text: "Advanced",
          items: [
            { text: "강의소개", link: "/docs/gym/advanced/s01.md" },
            { text: "실전 프로젝트 구성", link: "/docs/gym/advanced/s02.md" },
            { text: "Vue Router v4.x", link: "/docs/gym/advanced/s03.md" },
            { text: "HTTP API 통신", link: "/docs/gym/advanced/s04.md" },
            { text: "공통 컴포넌트", link: "/docs/gym/advanced/s05.md" },
            { text: "Vue3 내장 컴포넌트", link: "/docs/gym/advanced/s06.md" },
            { text: "재사용성", link: "/docs/gym/advanced/s07.md" },
            { text: "재사용성:Composavles", link: "/docs/gym/advanced/s08.md" },
            { text: "toRef & toRefs", link: "/docs/gym/advanced/s09.md" },
            { text: "Pinia", link: "/docs/gym/advanced/s10.md" },
            { text: "Vue Router심화", link: "/docs/gym/advanced/s11.md" },
            { text: "마치며", link: "/docs/gym/advanced/s12.md" },
          ],
        },
      ],
    },
  },
});
