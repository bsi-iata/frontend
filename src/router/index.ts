import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: Home
    },
  ]
})


router.afterEach((to: any) => {
  document.title = `IATA-${to.meta.title}`
})

export default router