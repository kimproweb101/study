import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },      
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Gym', link: '/gym/basic/s01' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Examples', link:'/markdown-examples'},   
        ]
      },
      {
        text: 'Basic',
        items: [
          { text: '강의소개', link:'/gym/basic/s01.md'},
          { text: '준비하기', link:'/gym/basic/s02.md'},
          { text: '시작하기', link:'/gym/basic/s03.md'},
          { text: 'Vue3 Composition API', link:'/gym/basic/s04.md'},
          { text: 'Bootstrap5', link:'/gym/basic/s05.md'},
          { text: '컴포넌트 기초+심화', link:'/gym/basic/s06.md'},
          { text: '마치며', link:'/gym/basic/s07.md'},          
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: '강의소개', link:'/gym/advanced/s01.md'},
          { text: '실전 프로젝트 구성', link:'/gym/advanced/s02.md'},
          { text: 'Vue Router v4.x', link:'/gym/advanced/s03.md'},
          { text: 'HTTP API 통신', link:'/gym/advanced/s04.md'},
          { text: '공통 컴포넌트', link:'/gym/advanced/s05.md'},
          { text: 'Vue3 내장 컴포넌트', link:'/gym/advanced/s06.md'},
          { text: '재사용성', link:'/gym/advanced/s07.md'},
          { text: '재사용성:Composavles', link:'/gym/advanced/s08.md'},
          { text: 'toRef & toRefs', link:'/gym/advanced/s09.md'},
          { text: 'Pinia', link:'/gym/advanced/s10.md'},
          { text: 'Vue Router심화', link:'/gym/advanced/s11.md'},
          { text: '마치며', link:'/gym/advanced/s12.md'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
