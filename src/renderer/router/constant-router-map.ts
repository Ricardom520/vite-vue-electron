import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@renderer/views/404.vue')
  },
  {
    path: '/',
    redirect: '/recommend',
    name: '总览',
    component: () => import('@renderer/views/home/index.vue'),
    children: [
      {
        path: 'recommend',
        component: () => import('@renderer/views/subPages/recommend/index.vue')
      },
      {
        path: 'download',
        component: () => import('@renderer/views/subPages/download/index.vue')
      },
      {
        path: 'history',
        component: () => import('@renderer/views/subPages/history/index.vue')
      },
      {
        path: 'like',
        component: () => import('@renderer/views/subPages/like/index.vue')
      },
      {
        path: 'musicRoom',
        component: () => import('@renderer/views/subPages/musicRoom/index.vue')
      },
      {
        path: 'video',
        component: () => import('@renderer/views/subPages/video/index.vue')
      }
    ]
  },
  {
    path: '/lyrics/tool',
    component: () => import('@renderer/views/lyrics/tool.vue')
  }
]

export default routes