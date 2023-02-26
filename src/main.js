import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const api = axios.create({
  baseURL: 'https://ec2-44-212-33-47.compute-1.amazonaws.com:4443/api/v1'
})

export default api

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
