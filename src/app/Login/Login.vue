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

    <Dashboard msg="dere"/>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { requests } from "@/dataSturcts/ServerRequests"
import { User, ClientData, DashboardStruct } from '@/dataSturcts/interfaces';
import store from "@/store"
import LoginResponse from '@/dataSturcts/InputResponse';


@Options({

})

export default class Login extends Vue {
  username = "admin";
  password = "admin";

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
    }).then(res => res.json()
    ).then((json: any) => {


      let res = LoginResponse.fromJson(json)

      console.log("json", json)
      console.log("res", res)

     
      
      
      let client : ClientData = {
        clientId: res.clientId,
        clientSecret: res.clientSecret,
        myLoginToken: res.myLoginToken,
        username: res.username,
        stravaToken: null
      }


      console.log(client);
      
      


      store.dispatch('updateDashboardData', res.toDashboardStruct() )
      store.dispatch("updateClientData", client)

      this.$router.push({
        name: "Dashboard",
      })
    })

  }
}
</script>

