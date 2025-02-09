---
outline : deep
---

## 설치
```js
npm i -D json-server
```

## 실행
```js
json-server --watch db.json --port 5000
```




## 예제1 json-server crud


### data
db.json

```vue
// axios
import axios from 'axios';

export function getPosts() {
	return axios.get('http://localhost:5000/posts');
}

export function getPostById(id) {
	return axios.get(`http://localhost:5000/posts/${id}`);
}

export function createPost(data) {
	return axios.post('http://localhost:5000/posts',data);
}

export function updatePost(id,data) {
	return axios.put(`http://localhost:5000/posts/${id}`,data);
}

export function deletePost(id) {
	return axios.delete(`http://localhost:5000/posts/${id}`);
}
```

### create
조회 패턴
```vue
const fetchPosts = async () => {
	// [1] promise
	// const response = getPosts()
	// console.log(response)

	// [2] then catch
	// getPosts().then((response) => {
	// 	console.log(response)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	//[3] async
	const { data } = await getPosts()
	posts.value = data

	// [4]
	// ({data:posts.value} = await getPosts())
}
fetchPosts()
```