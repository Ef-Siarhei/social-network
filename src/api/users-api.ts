import {UserType} from "../types/types";
import {ApiResponseType, instance} from "./api";

export type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term = '', friend: string = '') {
    return instance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}` + (term.length > 0 ? `&term=${term}` : '') + (friend === null ? '' : `&friend=${friend}`))
      .then((response) => response.data)
  },

  follow(id: number) {
    return instance.post<ApiResponseType>(`follow/${id}`).then((response) => response.data)
  },

  unFollow(id: number) {
    return instance.delete<ApiResponseType>(`follow/${id}`).then((response) => response.data)
  },
}
