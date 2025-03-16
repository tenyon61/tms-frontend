import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '@/router/static-routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})
export default router
