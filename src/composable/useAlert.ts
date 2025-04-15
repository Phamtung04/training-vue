import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'

export const useAlert = () => {
  const { t } = useI18n()
  const successNotify = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: t('actionContainer.successes'),
      text: message,
      timer: 1500,
      showConfirmButton: false,
    })
  }

  const errorNotify = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: t('actionContainer.error'),
      text: message,
    })
  }

  const warning = (message: string) => {
    Swal.fire({
      icon: 'warning',
      title: t('actionContainer.warning'),
      text: message,
    })
  }

  const confirm = async (message: string) => {
    const result = await Swal.fire({
      title: t('actionContainer.confirm'),
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('actionContainer.apply'),
      cancelButtonText: t('actionContainer.cancel'),
    })
    return result.isConfirmed
  }

  return {
    successNotify,
    errorNotify,
    confirm,
    warning,
  }
}
