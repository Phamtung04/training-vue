import { jwtDecode } from 'jwt-decode'
import { UserPayload } from './config'

export const getUserInfo = (): UserPayload | null => {
  const token = localStorage.getItem('training_vue_token_access')
  if (!token) return null

  try {
    const decoded = jwtDecode<{ data: UserPayload }>(token)
    return decoded.data
  } catch (error) {
    console.error('Token không hợp lệ')
    return null
  }
}
