import { createRouter, createWebHistory } from 'vue-router'
import dynamicRoutes from '@/router/dynamic-routes.ts'
import staticRoutes from '@/router/static-routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...dynamicRoutes, ...staticRoutes],
})
export default router
