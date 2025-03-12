import { Icon } from '@iconify/vue'
import { VueElement } from 'vue'
import { ItemType } from 'ant-design-vue'

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
