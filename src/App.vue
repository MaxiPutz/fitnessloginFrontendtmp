<template>
    <Login></Login>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import HelloWorld from './components/HelloWorld.vue';
import Login from './view/Login.vue';
import Register from './view/Register.vue';

@Options({
  components: {
    HelloWorld,
    Login,
    Register
  },
})

export default class App extends Vue {}
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
