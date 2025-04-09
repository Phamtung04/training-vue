import { data } from 'autoprefixer'
import { API_PATH } from '../../constants/apiPath'
import api from '../api'

export const userService = {
  listUser: (
    page: number,
    limit: number,
    sortName: string,
    direction: string,
    data: Object
  ) => {
    const queryParams = new URLSearchParams()

    queryParams.append('page', `${page}`)
    queryParams.append('limit', `${limit}`)
    queryParams.append('sortName', sortName)
    queryParams.append('direction', direction)

    return api.post(
      `${API_PATH.USER.LIST_USER}?${queryParams.toString()}`,
      data
    )
  },
  updateUser: (data: any) => {
    return api.post(API_PATH.USER.UPDATE_USER, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteUser: (data: any) => {
    return api.post(API_PATH.USER.DELETE_USER, data)
  },
  getUserById: (data: any) => {
    return api.post(API_PATH.USER.GET_USER_BY_ID, data)
  },
}
