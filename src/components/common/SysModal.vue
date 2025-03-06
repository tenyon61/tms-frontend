<template>
  <a-modal
    v-model:open="innerOpen"
    :title="props.title"
    :width="props.width + 'px'"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div :style="{ height: props.height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确认</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
type Props = {
  open: boolean
  title?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '标题',
  width: 630,
  height: 280,
})
const innerOpen = ref(props.open)
watch(
  () => props.open,
  (val) => {
    innerOpen.value = val
  },
)
const emit = defineEmits(['handleCancel', 'handleOk', 'showModal'])

const handleCancel = () => {
  emit('handleCancel')
}
const handleOk = () => {
  emit('handleOk')
}
</script>
