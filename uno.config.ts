import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {},
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [],
  shortcuts: [
    // 垂直水平居中
    ['flex-center', 'flex items-center justify-center'],
    // 放在两边
    ['flex-between', 'flex items-center justify-between'],
    // 放在最后
    ['flex-end', 'flex items-end justify-between'],
  ],
})
