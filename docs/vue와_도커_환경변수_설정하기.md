# Vue에서 환경변수 설정하기 (feat. docker)

### 이전의 주소 관리
현재 프로젝트를 AWS에 배포하여 운영중인데, 개발망과 운영망의 주소 관리가 불편하다는 문제가 있었다. 지금까지 운영해왔던 방법은 다음과 같이 로컬과 운영망의 글로벌 변수를 
선언해놓고 주석하는 방식으로 주소 관리를 하였다. (로컬에서는 운영 주소를 주석하는 방식으로)
~~~javascript
// 로컬
globalProperties.server = LOCALHOST/API
globalProperties.domain = LOCALHOST

// 운영
globalProperties.server = PROD_ADDRESS/API
globalProperties.server = PROD_ADDRESS
~~~
 - vue에서는 `globalProperties."이름"` 으로 전역 변수를 관리할 수 있다. 
 - 접근은 this."이름"으로 할 수 있다. (e.g. `console.log(this.server)` ) 


### Vue의 환경변수 관리 방법
SpringBoot에서 환경변수를 설정하듯이 Vue에도 환경 변수별로 이 지역변수를 동적으로 바꾸는 방법이 존재한다. 다음과 같이 `process.env` 명령어를 이용하면 된다.
~~~javascript
globalProperties.server = process.env.VUE_APP_ADDRESS_API;
globalProperties.domain = process.env.VUE_APP_ADDRESS
~~~

process.env에 사용할 변수는 .json 패키지와 동일한 위치에 `.env."환경이름"`의 파일을 만듦으로써 가능하다. <br>
~~~javascript
// [.env.production 파일]
VUE_APP_ADDRESS = http://voca-world.com
VUE_APP_ADDRESS_API = http://voca-world.com/api

// [.env.development 파일] 
VUE_APP_ADDRESS = http://localhost
VUE_APP_ADDRESS_API = http://localhost/api
~~~

#### [Vue에서 제공하는 기본 모드] 
1. development : `vue-cli-service serve` 할 때 default로 사용된다.
2. test : `vue-cli-service test:unit`
3. production : `vue_cli_service build` 할 때 default로 사용된다.

### docker의 도입
서버에 배포를 할 때는 정적으로 빌드해서 나온 index.html파일 등을 이용한다. 하지만 지금 넣으려고 하는 변수들은 런타임에 동적으로 컨테이너에 할당되는 변수들이다. 
따라서 위와 같이 .env.production 파일을 만들었음에도 불구하고 셋팅한 변수값이 제대로 적용되지 않는다. 이를 docker 컨테이너에서 동적으로 vue 프로젝트에 적용하게 하려면 
다음과 같이 하면 된다.

dockerfile에 사용할 환경변수를 `ARG "환경변수이름"`로 선언한다.
~~~dockerfile
FROM node:latest as build-stage
WORKDIR /app
# ...
ARG VUE_APP_ADDRESS       # 추가하기
ARG VUE_APP_ADDRESS_API   # 추가하기
# ...
~~~

docker-compose 파일에는 변수의 키와 값을 셋팅해준다. 
~~~yml
services:
  voca-front:
    container_name: voca-front
    build:
      context: ../voca-front
      dockerfile: Dockerfile
      args:
        - VUE_APP_ADDRESS=http://voca-world.com              # VUE_APP_ADDRESS = http://voca-world.com으로 변경된다.
        - VUE_APP_ADDRESS_API=http://voca-world.com/api      # 추가하기
~~~

### 정리
Docker와 Vue를 모두 처음 써 보는 상황이라 처음에는 하드 코딩식으로 진행하고 이후에 지금처럼 불편한 문제들을 해소하는 방향으로 코드를 정리하고 있다. 
오늘 환경 변수를 셋팅함으로써 주석 처리를 까먹는 실수를 할 가능성을 배제할 수 있었으며, 좀 더 편하고 유연하게 주소 관리를 할 수 있게 되었다.
