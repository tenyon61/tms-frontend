export default function useModal() {
  const modal = reactive<BASE.SysModal>({
    open: false,
    title: '',
    width: 630,
    height: 280,
  })
  const showModal = () => {
    modal.open = true
  }
  const handleOk = () => {
    modal.open = false
  }
  const handleCancel = () => {
    modal.open = false
  }
  return {
    modal,
    showModal,
    handleOk,
    handleCancel,
  }
}
