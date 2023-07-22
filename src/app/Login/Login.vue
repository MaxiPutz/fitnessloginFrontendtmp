<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="onLoginSubmit">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" name="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" name="password"><br><br>
      <input type="submit" value="Login">
    </form>

    <Dashboard/>

  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { requests } from "@/dataSturcts/ServerRequests"
import { User, ClientData } from '@/dataSturcts/interfaces/interfaces';
import { Metadata } from "@/dataSturcts/interfaces/Metadata"
import store from "@/store"
import LoginResponse from '@/dataSturcts/InputResponse';
import { ServerAddress } from '@/dataSturcts/interfaces/static/ServerAddress';


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

    const serverURL = (new ServerAddress()).getUrl()

    console.log("serverURL", serverURL)

    fetch(serverURL + "/api/login", {
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
    }).catch((ele) => {
      alert("login faild")
    })

  }
}
</script>


<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-family: Arial, sans-serif;
}

h1 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="password"],
input[type="submit"] {
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
}

input[type="submit"] {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px; 
}

input[type="submit"]:hover {
  background-color: #45a049;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border: 1px solid #4CAF50;
}

</style>
