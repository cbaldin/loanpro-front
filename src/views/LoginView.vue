<template>
    <form>
      <br><br>
      <div class="position-absolute top-50 start-50 translate-middle">
        <div class="w-100 mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="user.username">
          <br>
        </div>
        <div class="w-100 mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="pass" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login" to="operations">Submit</button>
      </div>
</form>

</template>

<script setup>
import api from '../main.js'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth.js'
import router from './../router'

const auth = useAuth()

const user = reactive({
  username: '',
  password: ''
})

async function login () {
  try {
    await api.post('/login', user).then(res => {
      console.log(res.data)
      auth.setToken(res.data.token)
      auth.setUser(res.data.username)
    })
    router.push({ name: 'operations' })
  } catch (error) {
    alert('Problema na requisicao')
  }
}
</script>
