<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld v-if="disabled" />
  <CompApi v-if="disabled" />
  <TemplateRule v-if="disabled" />
  <ResponsiveBasic />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import CompApi from './components/CompApi.vue';
import TemplateRule from './components/TemplateRule.vue';
import ResponsiveBasic from './components/ResponsiveBasic.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    CompApi,
    TemplateRule,
    ResponsiveBasic,
  },

  data() {
    return {
      disabled: false,
    };
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
</style>
