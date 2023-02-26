<template>
  <template v-if="auth.isAuthenticated">
    <div class="d-flex justify-content-center d-flex flex-row mb-3 grid gap-3" >
      <label class="fs-4 p-2 g-col-6">Hello user: {{ auth.user }}</label>
      <div class="fs-4 p-2 g-col-6">
        <router-link @click="logout" to="/login">Logout</router-link>
      </div>
    </div>
  </template>
  <template v-else>
    <div>
      <label class="form-label"> Hello Visitor </label>
    </div>
  </template>
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
