import path from 'node:path'
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

const srcPath = fileURLToPath(new URL('../src', import.meta.url))

export function createVitePlugins(env: Record<string, string>, command: string, mode: string) {
  console.log('Command:', command)
  console.log('EnvMode:', mode)
  console.log('EvnPort:', env.VITE_APP_PORT)
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(srcPath, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          prefix: 'icon',
          // enabledCollections: ['ri'],
        }),
        // Auto register Ant Design Vue components
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      dts: path.resolve(srcPath, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
    UnoCSS(),
  ]
  return vitePluginList
}
