import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@renderer/views/404.vue')
  },
  {
    path: '/',
    name: '总览',
    component: () => import('@renderer/views/home/index.vue')
  }
]

export default routes