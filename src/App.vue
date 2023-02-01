<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld id="disabled" msg="🌼안녕하세요. AFC Vue.js 프로젝트입니다.🌼" />

  <CompApi msg="안녕하세요." />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import CompApi from './components/CompApi.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    CompApi,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#disabled {
  display: none;
}
</style>
