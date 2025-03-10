import { Modal } from 'ant-design-vue'
import { LegacyButtonType } from 'ant-design-vue/es/button/buttonTypes'

export default function sysConfirm(title?: string, text?: string, type?: LegacyButtonType) {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: title ?? '请确认是否删除该数据?',
      okText: text ?? '确认',
      okType: type ?? 'danger',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        reject(false)
      },
    })
  }).catch(() => {
    return false
  })
}
