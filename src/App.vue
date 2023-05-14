<template>
  <div>
    <nav>
      <router-link to="/">Login</router-link> | 
      <router-link to="/register">Register</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>


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
