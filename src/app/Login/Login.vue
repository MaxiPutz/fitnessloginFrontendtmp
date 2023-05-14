<template>
    <div class="login">
        <h1>Welcome to login</h1>
      <form @submit.prevent="onLoginSubmit">

        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Login">
        <input type="submit" value="Register">

    </form>     
    
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import { requests} from "@/dataSturcts/ServerRequests"




@Options({
   
})

export default class Login extends Vue {
  username = "admin";
  password = "admin";

  onLoginSubmit () {
    const user = {
      username: this.username,
      password: this.password,
    };

    const login = requests.login(user);

    console.log(login)
    fetch(login.url, {
      method: login.method,
      body: JSON.stringify(login.body),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      });
  
  }
}
</script>

