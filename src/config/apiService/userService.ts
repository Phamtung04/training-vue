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
      `${API_PATH.USER_API.LIST_USER_API}?${queryParams.toString()}`,
      data
    )
  },
  updateUser: (data: any) => {
    return api.post(API_PATH.USER_API.UPDATE_USER_API, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteUser: (data: any) => {
    return api.post(API_PATH.USER_API.DELETE_USER_API, data)
  },
  getUserById: (data: any) => {
    return api.post(API_PATH.USER_API.GET_USER_BY_ID_API, data)
  },
}
