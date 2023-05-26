<template>
  <div class="login">
    <h1>Welcome to login</h1>
    <form @submit.prevent="onLoginSubmit">

      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" name="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" name="password"><br><br>
      <input type="submit" value="Login">
    </form>

    <Dashboard msg="dere" />

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { requests } from "@/dataSturcts/ServerRequests"
import { User, ClientData } from '@/dataSturcts/interfaces/interfaces';
import { Metadata } from "@/dataSturcts/interfaces/Metadata"
import store from "@/store"
import LoginResponse from '@/dataSturcts/InputResponse';


@Options({

})

export default class Login extends Vue {
  username = '';
  password = '';

  onLoginSubmit() {
    const user: User = {
      username: this.username,
      password: this.password,
    };

    const login = requests.login(user)

    fetch("http://localhost:8080/api/login", {
      method: login.method,
      body: login.body,
      headers: login.headers
    }).then(async res => {
      console.log(res);

      return res.json()
    }
    ).then((json: any) => {

      console.log(json);

      let res = LoginResponse.fromJson(json)
      res.toStore()


      this.$router.push({
        name: "Dashboard",
      })
    })

  }
}
</script>

