# Voca-Front
## 네이밍 컨벤션
### vue 네이밍 컨벤션
1. 컴포넌트 이름은 합성어를 사용한다. -> HTML 요소의 이름이 한 단어이기 때문에 합성어를 사용하는 것이 향후 충돌을 방지한다.
~~~javascript
Vue.component('voca-header', {})
export default {
    name: 'VocaHeader',
}
~~~

2. prop 속성은 가능한 자세히 적는다.
~~~javascript
// at least
props: {
    status: String
}

// better
props: {
    status: {
        type: String,
            required: true,

            validator: value => {
            return [
                'syncing',
                'synced',
                'version-conflict',
                'error'
            ].includes(value)
        }
    }
}
~~~

3. v-for를사용할 때는 key 속성을 꼭 명시한다.
~~~javascript
<ul>
  <li
    v-for="todo in todos":key="todo.id" >
    {{ todo.text }}
  </li>
</ul>

~~~

4. v-for와 v-if는 같이 사용하지 않는다. => users를 activeUsers와 같이 계산된 속성을 집어넣는다.
~~~javascript
// bad example
<ul>
  <li
    v-for="user in users" v-if="user.isActive":key="user.id" >
        {{ user.name }}
  </li>
</ul>

// good example
<ul>
    <li v-for="user in activeUsers":key="user.id" >
        {{ user.name }}
    </li>
</ul>

~~~

5. component-scoped styling을 사용한다. => App을 제외한 싱글 파일 컴포넌트는 scoped 속성을 가져야 한다.
~~~javascript
<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
~~~

### URL 네이밍 컨벤션
1. 명사를 사용한다. 
~~~javascript
www.naver.com/get-users ==> 나쁜 예시
www.naver.com/users     ==> 좋은 예시
~~~
2. 소문자를 사용한다.
3. 복수형을 사용한다.
4. 구분자는 하이픈('-')을 사용한다.
~~~javascript
www.naver.com/good-users
~~~