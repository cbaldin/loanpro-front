import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import './index.css'

const api = axios.create({
  baseURL: 'http://ec2-52-90-4-159.compute-1.amazonaws.com:8080/api/v1'
})

export default api

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
