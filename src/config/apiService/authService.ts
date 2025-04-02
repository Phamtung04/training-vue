import { APi_PATH } from '../../constants/apiPath'
import api from '../api'

export const authService = {
  login: (data: any) => {
    return api.post(APi_PATH.AUTH.LOGIN, data)
  },
  register: (data: any) => {
    return api.post(APi_PATH.AUTH.REGISTER, data)
  },
  forgotPassword: (data: any) => {
    return api.post(APi_PATH.AUTH.FORGOT_PASSWORD, data)
  },
  confirmForgotPassword: (data: any) => {
    return api.post(APi_PATH.AUTH.CONFIRM_PASSWORD, data)
  },
}
