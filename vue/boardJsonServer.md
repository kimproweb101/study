---
outline: deep
---

## list
```vue
<template>
  <div>
    <div>
      <button type="button" @click="params._order = 'desc'">내림차순</button>
      <button type="button" @click="params._order = 'asc'">오름차순</button>
    </div>
    <ul>
      <li v-for="board in boards" :key="board.id">
        <RouterLink to="#">
          {{ board.id }}
          {{ board.title }}
        </RouterLink>
      </li>
    </ul>
    <ul class="flex">
      <li><button type="button" @click="prev()">이전 페이지</button></li>
      <li v-for="page in filteredPages" :key="page">
        <a class="btnPage" href="#" @click.prevent="params._page = page">{{ page }}</a>
      </li>
      <li><button type="button" @click="next()">다음 페이지</button></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { getBoards } from '@/api/boards'
const boards = ref([])
const params = ref({
  _sort: 'id',
  _order: 'asc',
  _page: 1,
  _limit: 10,
  title_like: '',
})
const totalCount = ref(0)
const totalPageCount = ref(0)
const startPage = ref(1)
const filteredPages = ref([])
const fetchBoards = async () => {
  try {
    const { data, headers } = await getBoards(params.value)
    boards.value = data
    totalCount.value = parseInt(headers['x-total-count'])
    totalPageCount.value = Math.ceil(totalCount.value / params.value._limit)

    const pages = new Array(10).fill(1)
    filteredPages.value = []
    pages.map((el, index) => {
      const pageNumber = startPage.value + index
      pageNumber <= totalPageCount.value ? filteredPages.value.push(pageNumber) : ``
    })
  } catch (error) {
    console.log(error)
  }
}
const prev = () => {
  if (startPage.value === 1) {
    return
    // alert('더이상 보여줄 수 없어요!')
  } else {
    startPage.value = startPage.value - 10
    params.value._page = startPage.value
    fetchBoards()
  }
}
const next = () => {
  if (startPage.value + 10 <= totalPageCount.value) {
    startPage.value = startPage.value + 10
    params.value._page = startPage.value
    fetchBoards()
  } else {
    return
  }
}
fetchBoards()
watchEffect(fetchBoards)
</script>

<style scoped>
.flex {
  display: flex;
}
.space-between {
  justify-content: space-between;
}

.btnPage {
  display: inline-block;
  padding: 5px;
  border: 1px solid #ddd;
}
</style>

```

```js
{
  "boards": [
    {"id": 1,"title": "제목1","content": "내용1","createdAt": "2021-01-01"},
    {"id": 2,"title": "제목2","content": "내용2","createdAt": "2021-01-02"},
    {"id": 3,"title": "제목3","content": "내용3","createdAt": "2021-01-03"},
    {"id": 4,"title": "제목4","content": "내용4","createdAt": "2021-01-04"},
    {"id": 5,"title": "제목5","content": "내용5","createdAt": "2021-01-05"},
    {"id": 6,"title": "제목6","content": "내용6","createdAt": "2021-01-06"},
    {"id": 7,"title": "제목7","content": "내용7","createdAt": "2021-01-07"},
    {"id": 8,"title": "제목8","content": "내용8","createdAt": "2021-01-08"},
    {"id": 9,"title": "제목9","content": "내용9","createdAt": "2021-01-09"},
    {"id": 10,"title": "제목10","content": "내용10","createdAt": "2021-01-09"},    
    {"id": 11,"title": "제목11","content": "내용11","createdAt": "2021-01-09"},
    {"id": 12,"title": "제목12","content": "내용12","createdAt": "2021-01-09"},
    {"id": 13,"title": "제목13","content": "내용13","createdAt": "2021-01-09"},
    {"id": 14,"title": "제목14","content": "내용14","createdAt": "2021-01-09"},
    {"id": 15,"title": "제목15","content": "내용15","createdAt": "2021-01-09"},
    {"id": 16,"title": "제목16","content": "내용16","createdAt": "2021-01-09"},
    {"id": 17,"title": "제목17","content": "내용17","createdAt": "2021-01-09"},
    {"id": 18,"title": "제목18","content": "내용18","createdAt": "2021-01-09"},
    {"id": 19,"title": "제목19","content": "내용19","createdAt": "2021-01-09"},
    {"id": 20,"title": "제목20","content": "내용20","createdAt": "2021-01-09"},    
    {"id": 21,"title": "제목21","content": "내용21","createdAt": "2021-01-09"},
    {"id": 22,"title": "제목22","content": "내용22","createdAt": "2021-01-09"},
    {"id": 23,"title": "제목23","content": "내용23","createdAt": "2021-01-09"},
    {"id": 24,"title": "제목24","content": "내용24","createdAt": "2021-01-09"},
    {"id": 25,"title": "제목25","content": "내용25","createdAt": "2021-01-09"},
    {"id": 26,"title": "제목26","content": "내용26","createdAt": "2021-01-09"},
    {"id": 27,"title": "제목27","content": "내용27","createdAt": "2021-01-09"},
    {"id": 28,"title": "제목28","content": "내용28","createdAt": "2021-01-09"},
    {"id": 29,"title": "제목29","content": "내용29","createdAt": "2021-01-09"},
    {"id": 30,"title": "제목30","content": "내용30","createdAt": "2021-01-09"},    
    {"id": 31,"title": "제목31","content": "내용31","createdAt": "2021-01-09"},
    {"id": 32,"title": "제목32","content": "내용32","createdAt": "2021-01-09"},
    {"id": 33,"title": "제목33","content": "내용33","createdAt": "2021-01-09"},
    {"id": 34,"title": "제목34","content": "내용34","createdAt": "2021-01-09"},
    {"id": 35,"title": "제목35","content": "내용35","createdAt": "2021-01-09"},
    {"id": 36,"title": "제목36","content": "내용36","createdAt": "2021-01-09"},
    {"id": 37,"title": "제목37","content": "내용37","createdAt": "2021-01-09"}   
  ],
}
```

