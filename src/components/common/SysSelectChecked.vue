<template>
  <a-select
    v-model:value="selectedOptions"
    mode="multiple"
    :max-tag-count="props.max"
    :options="options"
    :style="selectWidth"
    placeholder="请选择"
    @deselect="doDeSelect"
  >
    <template #option="item">
      <div @click.stop="toggleOption(item)">
        <a-checkbox :checked="selectedOptions.includes(item.value)" style="margin-right: 8px" />
        <span>{{ item.label }}</span>
      </div>
    </template>
    <template #dropdownRender="{ menuNode: menu }">
      <v-nodes :vnodes="menu" />
      <a-divider style="margin: 2px 0" />
      <a-space class="flex-center">
        <a-button type="text" @click="selectAll(true)">全选</a-button>
        <a-button type="text" @click="selectAll(false)">反选</a-button>
      </a-space>
    </template>
  </a-select>
</template>

<script lang="ts" setup>
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes
  },
})
type Props = {
  width?: number
  max?: number
  bindValue?: Array<string | number>
  options?: Array<{ value: string | number; label: string; title?: string; disabled?: boolean }>
}

const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return []
  },
  bindValue: () => {
    return []
  },
  width: 0,
  max: 1,
})

const selectedOptions = ref<Array<string | number>>([])
const selectWidth = props.width === 0 ? `width: 100%` : `width: ${props.width}px`
const emit = defineEmits(['selected'])

const toggleOption = (item: any) => {
  const index = selectedOptions.value.indexOf(item.value)
  if (index === -1) {
    selectedOptions.value = [...selectedOptions.value, item.value]
  } else {
    selectedOptions.value = selectedOptions.value.filter((i) => i !== item.value)
  }
  emit('selected', selectedOptions.value)
}

const doDeSelect = () => {
  emit('selected', selectedOptions.value)
}

const selectAll = (isAll: boolean) => {
  if (isAll) {
    // 全选
    selectedOptions.value = []
    selectedOptions.value = props.options.map((item) => item.value)
  } else {
    // 反选
    selectedOptions.value = props.options
      .filter((item) => !selectedOptions.value.includes(item.value))
      .map((item) => item.value)
  }
  emit('selected', selectedOptions.value)
}

watch(
  () => props.bindValue,
  () => {
    selectedOptions.value = props.bindValue
  },
)
</script>

<style scoped></style>
