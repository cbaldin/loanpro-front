<template>
  <template v-if="auth.isAuthenticated">
    Hello user: {{ auth.user }} |
  </template>
  <template v-else>
    Hello visitor  |
  </template>
  <router-link @click="logout" to="/login">Logout</router-link>
  <nav>
    <router-link to="/login">Login</router-link>
    <br>
    <router-link to="/operations">Operations</router-link>
  </nav>
  <router-view/>
</template>

<script setup>
import { useAuth } from '@/stores/auth.js'
const auth = useAuth()

function logout () {
  auth.clearUser()
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
