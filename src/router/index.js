import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/operations',
    name: 'operations',
    component: HomeView,
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('passou pelo router' + to + ' @ ' + from)
  if (to.meta?.auth) {
    const auth = useAuth()
    console.log('User token, eh o: ' + auth.token)
    console.log('O auth.user é o -> ' + auth.user)
    if (auth.token && auth.user) {
      const isAuthenticated = auth.checkToken()
      console.log('passou pelo router 3' + to)
      if (isAuthenticated) {
        console.log('passou pelo router 4' + to)
        next()
      } else {
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
