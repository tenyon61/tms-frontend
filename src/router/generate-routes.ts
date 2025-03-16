import { Icon } from '@iconify/vue'
import { VueElement } from 'vue'
import { ItemType } from 'ant-design-vue'
import { RouteRecordRaw } from 'vue-router'
import CenterLayout from '@/layouts/CenterLayout.vue'
import ProLayout from '@/layouts/Index.vue'

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

export const convertRoutesToItems = (routes: any) => {
  return routes.map((route: any) => {
    const { path, name, meta = {}, children } = route
    return getItem(
      meta.title || name,
      path,
      h(Icon, { icon: meta.icon }),
      children?.length ? convertRoutesToItems(children) : undefined,
    )
  })
}
const modules = import.meta.glob('@/views/**/*.vue')

export const generateRoutes = (routes: RouteRecordRaw[], router: any) => {
  const res: Array<RouteRecordRaw> = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    const component = tmp.component
    if (route.component) {
      if (component == 'ProLayout') {
        tmp.component = ProLayout
      } else {
        tmp.component = modules[`/src/${component}`]
      }
    }
    if (tmp.children && tmp.children.length > 0) {
      if (route.component != 'ProLayout') {
        tmp.component = CenterLayout
      }
      tmp.children = generateRoutes(tmp.children, router)
    }
    res.push(tmp)
    router.addRoute(tmp)
  })
  return res
}
// 类型增强
// type RouteComponent = RouteRecordRaw['component']
// type CustomRoute = Omit<RouteRecordRaw, 'component' | 'children'> & {
//   component?: string | RouteComponent
//   children?: CustomRoute[]
// }
//
// const modules = import.meta.glob('@/views/**/*.vue')
//
// // 组件解析器
// const resolveComponent = (component: string): RouteComponent => {
//   if (component === 'ProLayout') return ProLayout
//   if (modules[`/src/${component}`]) return modules[`/src/${component}`]
//   console.warn(`Component ${component} not found in views directory`)
//   return undefined
// }
//
// export const generateRoutes = (routes: CustomRoute[], router: any): RouteRecordRaw[] => {
//   const processRoute = (route: CustomRoute): RouteRecordRaw => {
//     const normalizedRoute: any = {
//       ...route,
//       component:
//         typeof route.component === 'string' ? resolveComponent(route.component) : route.component,
//     }
//
//     if (route.children?.length) {
//       normalizedRoute.children = route.children.map(processRoute)
//       if (!normalizedRoute.component) {
//         normalizedRoute.component = route.component === 'ProLayout' ? ProLayout : CenterLayout
//       }
//     }
//
//     return normalizedRoute
//   }
//
//   // 清空现存路由并添加新路由
//   // router.getRoutes().forEach((route: any) => router.removeRoute(route.name))
//   routes.forEach((route) => router.addRoute(route))
//   return routes.map(processRoute).filter(Boolean)
// }
