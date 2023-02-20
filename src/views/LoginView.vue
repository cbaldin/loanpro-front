<template>
    <div>
      <div>
        <div>
          <input type="text" placeholder="E-mail" v-model="user.username">
        </div>
        <div>
          <input type="password" placeholder="Password" v-model="user.password">
        </div>
        <router-link @click="login" to="../operations">Login</router-link>
      </div>
    </div>
</template>

<script setup>
import api from '../main.js'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth.js'

const auth = useAuth()

const user = reactive({
  username: '',
  password: ''
})

function login () {
  try {
    api.post('/login', user).then(res => {
      console.log(res.data)
      auth.setToken(res.data.token)
      auth.setUser(res.data.username)
    })
  } catch (error) {
    console.error('Problema na requisicao')
  }
}
</script>
