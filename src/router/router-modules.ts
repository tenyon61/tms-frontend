export const basicRouteMap = {
  // iframe模式下使用
  Iframe: () => import('@/pages/common/iframe.vue'),
  // 空页面
  ComponentError: () => import('@/pages/exception/component-error.vue'),
}
