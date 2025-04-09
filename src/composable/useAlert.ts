// src/composables/useAlert.ts
import Swal from 'sweetalert2'

export const useAlert = () => {
  const success = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: message,
      timer: 1500,
      showConfirmButton: false,
    })
  }

  const error = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Thất bại!',
      text: message,
    })
  }

  const confirm = async (message: string) => {
    const result = await Swal.fire({
      title: 'Xác nhận',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    })
    return result.isConfirmed
  }

  return {
    success,
    error,
    confirm,
  }
}
