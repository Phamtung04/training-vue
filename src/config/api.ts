/// <reference types="vite/client" />

import axios from 'axios'
import { STATUS_CODE } from '../constants/statusCode'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use((config) => {
  const token = localStorage.getItem('training_vue_token_access')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (
        error.response.status === STATUS_CODE.BAD_REQUEST &&
        error.response.data.details?.length > 0
      ) {
        return Promise.reject({
          isValidationError: true,
          validationErrors: error.response.data.details,
          originalResponse: error.response,
        })
      }
    }
    return Promise.reject(error)
  }
)

export default api
