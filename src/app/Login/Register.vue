<template>
  <div class="login">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" name="username" /><br /><br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" name="password" /><br /><br />
      <label for="password">Repeat Password:</label>
      <input type="password" v-model="repeatPassword" id="repeatPassword" name="repeatPassword" /><br /><br />
      <input type="submit" value="Register" />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { requests } from "@/dataSturcts/ServerRequests"
import { User, ClientData } from '@/dataSturcts/interfaces/interfaces';
import LoginResponse from '@/dataSturcts/InputResponse';


export default class Register extends Vue {
  username = '';
  password = '';
  repeatPassword = '';

  registerUser(): void {
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    const loginRequest = {
      username: this.username,
      password: this.password,
    };

    // Perform the POST request to the server
    fetch('http://localhost:8080/api/userCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful
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


          alert('Registration successful.');
        } else {
          // Registration failed
          alert('Registration failed.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      });
  }
}
</script>

