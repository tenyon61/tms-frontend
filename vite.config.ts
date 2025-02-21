import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './plugins/BmsPlugins'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: parseInt(env.VITE_APP_PORT),
      host: '0.0.0.0',
      open: false,
      hmr: true,
    },
    plugins: [createVitePlugins(env, command, mode)],
    resolve: {
      alias: {
        '@': srcPath,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          javascriptEnabled: true,
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  }
})
