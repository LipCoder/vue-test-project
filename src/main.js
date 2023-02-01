import { createApp } from 'vue';
import App from './App.vue';

import CompApi from './components/CompApi.vue';

// # 최상위 컴포넌트 구성
const app = createApp(App);

// # .config
// 앱 레벨의 옵션을 구성할 수 있게 해주는 객체
app.config.errorHandler = (err) => {
  /* 에러 처리 */
  console.error(err);
};

// # 컴포넌트 등록
// 이렇게 하면 CompApi를 앱 어디에서나 사용할 수 있다.
app.component('CompApi', CompApi);

// # 마운트
// 앱을 마운트 컨테이너에 등록한다.
// 마운트 되지 않으면 vue는 아무것도 렌더링 하지 않는다.
//createApp(App).mount('#app');
app.mount('#app');

// # 멀티 앱 인스턴스
// 앱 인스턴스는 동일 페이지 내 하나로 제한하지 않는다.
// 여러 Vue 앱 인스턴스가 동일한 페이지에 공존할 수 있으며, 각각은 고유한 범위를 가진다.
const app1 = createApp(App);
app1.mount('#container-1');
const app2 = createApp(App);
app2.mount('#container-2');
