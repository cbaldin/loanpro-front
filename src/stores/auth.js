import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../main.js'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(localStorage.getItem('userName'))

  function setToken (tokenValue) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser (userValue) {
    localStorage.setItem('userName', userValue)
    user.value = userValue
  }

  async function checkToken () {
    try {
      const { data } = await api.get('/login/verify', {
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      return data
    } catch (error) {
      alert.apply('Error on token validation')
    }
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value
  })

  function clearUser () {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    token.value = ''
    user.value = ''
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    clearUser
  }
})
