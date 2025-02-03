import {UserType} from "../types/types";
import {instance} from "./api";
import {LogOutResponseType} from "./auth-api";

type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export type FollowUnFollowResponseType = LogOutResponseType

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },

  follow(id: number) {
    return instance.post<FollowUnFollowResponseType>(`follow/${id}`).then((response) => response.data)
  },

  unFollow(id: number) {
    return instance.delete<FollowUnFollowResponseType>(`follow/${id}`).then((response) => response.data)
  },
}
