<template>
    <div class="login">
        <h1>Welcome to login</h1>
        <h3>{{ msg }}</h3>
        <form>
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

@Options({
    props: {
        msg: String
    }
})

export default class Login extends Vue {
    msg!: string
}
</script>

