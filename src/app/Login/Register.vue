<template>
    <div class="login">
        <h1>Register</h1>
        <form>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password"><br><br>
      <label for="password">Password repead:</label>
      <input type="password" id="password" name="password"><br><br>
      <input type="submit" value="Register">

    </form>     
    
    </div>
</template>

<script lang="ts">
import { Vue} from 'vue-class-component'

export default class Register extends Vue {
}
</script>

