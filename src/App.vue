<template>
  <div>
    <nav v-if="!isLoggedIn">
      <router-link to="/">Login</router-link> |
      <router-link to="/fitness/login">Login</router-link> |
      <router-link to="/fitnes2">Login</router-link> |
      <router-link to="/fitness/login2">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/info">Info</router-link> |
      <router-link to="/demo">Demo</router-link> |
      <router-link to="/how-to-use">How to Use</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>



<script lang="ts">
import { Vue } from 'vue-class-component';
import store from "@/store"
import { ClientData } from './dataSturcts/interfaces/interfaces';

export default class App extends Vue {
  isLoggedIn = false


  mounted(): void {
    const client: ClientData = store.getters.getClientData

    store.watch(() => store.getters.getClientData, (client: ClientData) => {
      this.isLoggedIn = client?.myLoginToken != null

    })

    this.isLoggedIn = client?.myLoginToken != null
  }
}

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
