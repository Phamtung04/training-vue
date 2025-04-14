import { API_PATH } from '../../constants/apiPath'
import api from '../api'

export const authService = {
  login: (data: any) => {
    return api.post(API_PATH.AUTH_API.LOGIN_API, data)
  },
  register: (data: any) => {
    return api.post(API_PATH.AUTH_API.REGISTER_API, data)
  },
  forgotPassword: (data: any) => {
    return api.post(API_PATH.AUTH_API.FORGOT_PASSWORD_API, data)
  },
  confirmForgotPassword: (data: any) => {
    return api.post(API_PATH.AUTH_API.CONFIRM_PASSWORD_API, data)
  },
}
