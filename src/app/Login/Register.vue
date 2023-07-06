<template>
  <div class="register">
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
import { ServerAddress } from '@/dataSturcts/interfaces/static/ServerAddress';



export default class Register extends Vue {
  username = '';
  password = '';
  repeatPassword = '';

  registerUser(): void {
    const serverURL = (new ServerAddress).getUrl()
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    const loginRequest = {
      username: this.username,
      password: this.password,
    };

    // Perform the POST request to the server
    fetch( serverURL +'/api/userCreate', {
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

          console.log(serverURL);


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


<style>
.register {
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