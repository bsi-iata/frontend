import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'order'
      },
      component: () => import('../views/home.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      meta: {
        title: 'order-detail'
      },
      component: () => import('../views/orderDetail.vue'),
      props: true
    },
  ]
})


router.afterEach((to: any) => {
  document.title = `IATA-${to.meta.title}`
})

export default router