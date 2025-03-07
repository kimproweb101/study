import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config

export default defineConfig({  
  base :'/study/',
  title: "KIM STUDY",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "vue", link: "/vue/jsonServer.md" },
      { text: "Gym", link: "/gym/basic/index.md" },
    ],
    sidebar: {
      "/vue/": [
        {
          text: "vue",
          items: [
            { text: "퀴즈", link: "/vue/퀴즈.md" },
            { text: "정답", link: "/vue/정답.md" },
            { text: "기본", link: "/vue/official-basic.md" },
            { text: "심화", link: "/vue/official-advanced.md" },
            { text: "예제", link: "/vue/examples.md" },
            { text: "json-server", link: "/vue/jsonServer.md" },
            { text: "게시판", link: "/vue/boardJsonServer.md" },
            { text: "Snackbar", link: "/vue/snackbar.md" },
          ],
        },
      ],
      "/gym/": [
        {
          text: "Firebase",
          items: [
            { text: "시작하기",link: "/gym/firebase/s01.md" },
            { text: "Auto Page&Layout",link: "/gym/firebase/s02.md" },
            { text: "Quasar 활용 UI 만들기",link: "/gym/firebase/s03.md" },
            { text: "Firebase 시작하기",link: "/gym/firebase/s04.md" },
            { text: "Firebase Authentication",link: "/gym/firebase/s05.md" },
            { text: "VueUse & 공통 기능",link: "/gym/firebase/s06.md" },
            { text: "Firebase Cloud Firestore",link: "/gym/firebase/s07.md" },
            { text: "Web API & 고도화",link: "/gym/firebase/s08.md" },
            { text: "Firebase Cloud Storage",link: "/gym/firebase/s09.md" },
            { text: "Firebase Cloud Functions",link: "/gym/firebase/s10.md" },
            { text: "Algolia Search",link: "/gym/firebase/s11.md" },
            { text: "Firebase 보안규칙 & 배포(Hosting)",link: "/gym/firebase/s12.md" },
            { text: "마치며",link: "/gym/firebase/s13.md" },
          ],
        },
        {
          text: "Basic",
          items: [
            { text: "강의소개" },
            { text: "준비하기", link: "/gym/basic/s02/s02.md" },
            {
              text: "Vue3 Composition API",
              collapsed: true,
              items: [
                { text: "CompositionAPI", link: "/gym/basic/s03/compositionApi.md" },
                { text: "Setup", link: "/gym/basic/s03/setupHook.md" },
                { text: "템플릿 문법", link: "/gym/basic/s03/templateSyntax.md" },
                { text: "반응형 기초", link: "/gym/basic/s03/reactivity.md" },
                { text: "Computed", link: "/gym/basic/s03/computed.md" },
                { text: "클래스&스타일 바인딩", link: "/gym/basic/s03/classStyleBind.md" },
                { text: "조건부 렌더링", link: "/gym/basic/s03/if.md" },
                { text: "목록 렌더링", link: "/gym/basic/s03/for.md" },
                { text: "디렉티브(directives)", link: "/gym/basic/s03/directives.md" },
                { text: "이벤트 처리", link: "/gym/basic/s03/event.md" },
                { text: "양방향 바인딩", link: "/gym/basic/s03/vModel.md" },
                { text: "Watch, WatchEffect", link: "/gym/basic/s03/watchWatchEffect.md" },
                { text: "Dynamic Components", link: "/gym/basic/s03/dynamicComponents.md" },
              ],
            },
            { text: "Bootstrap5", link: "/gym/basic/s05/s05.md" },
            {
              text: "컴포넌트 기초+심화",
              collapsed: true,
              items: [
                { text: "컴포넌트 기초", link: "/gym/basic/s06/componentBasic.md" },
                { text: "Single File Component", link: "/gym/basic/s06/singgleFileComponent.md" },
                { text: "Props", link: "/gym/basic/s06/props.md" },
                { text: "Events", link: "/gym/basic/s06/events.md" },
                { text: "Non-Prop", link: "/gym/basic/s06/nonProp.md" },
                { text: "Slots", link: "/gym/basic/s06/slots.md" },
                { text: "Provide/Inject", link: "/gym/basic/s06/provideInject.md" },
                { text: "LifecycleHooks", link: "/gym/basic/s06/lifecycleHooks.md" },
                { text: "Template Refs", link: "/gym/basic/s06/templateRefs.md" },
                { text: "script setup", link: "/gym/basic/s06/scriptSetup.md" },
                { text: "동적 컴포넌트", link: "/gym/basic/s06/dynamicComponent.md" },
                { text: "마치며", link: "/gym/basic/s07/s07.md" },
              ],
            },            
          ],
        },        
        {
          text: "Advanced",
          items: [
            { text: "강의소개", link: "/gym/advanced/s01.md" },
            { text: "실전 프로젝트 구성", link: "/gym/advanced/s02.md" },
            { text: "Vue Router v4.x", link: "/gym/advanced/s03.md" },
            { text: "HTTP API 통신", link: "/gym/advanced/s04.md" },
            { text: "공통 컴포넌트", link: "/gym/advanced/s05.md" },
            { text: "Vue3 내장 컴포넌트", link: "/gym/advanced/s06.md" },
            { text: "재사용성", link: "/gym/advanced/s07.md" },
            { text: "재사용성:Composavles", link: "/gym/advanced/s08.md" },
            { text: "toRef & toRefs", link: "/gym/advanced/s09.md" },
            { text: "Pinia", link: "/gym/advanced/s10.md" },
            { text: "Vue Router심화", link: "/gym/advanced/s11.md" },
            { text: "마치며", link: "/gym/advanced/s12.md" },
          ],
        },        
      ],
    },    
  },
});
