import axios from 'axios'
import {PhotosType, ProfileType, UserType} from "../types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
  },
})

// ------------------------------------ Start usersAPI

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

// ------------------------------------ Start authAPI

export enum ResultCodesEnum {
  Sucsess = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type GetMeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: Array<string>
}

type LogOutResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const authAPI = {
  getMe() {
    // This type <GetMeResponseType> returned to response.data
    return instance.get<GetMeResponseType>('auth/me').then((response) => response.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>('auth/login', {
      email,
      password,
      rememberMe,
      captcha
    }).then((response) => response.data)
  },
  logout() {
    return instance.delete<LogOutResponseType>('auth/login').then((response) => response.data)
  },
}

// ------------------------------------ Start profileAPI

type UpdateStatusType = LogOutResponseType
type SaveProfileType = LogOutResponseType
type SavePhotoType = {
  data: {
    photos: PhotosType
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId).then((response) => response.data)
  },

  getStatus(userId: number) {
    return instance.get<string>('profile/status/' + userId).then(res => res.data)
  },
  updateStatus(status: string) {
    return instance.put<UpdateStatusType>('profile/status', {status: status}).then(res => res.data)
  },
  savePhoto(photoFile: string) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put<SavePhotoType>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  },
  saveProfile(profile: ProfileType) {
    return instance.put<SaveProfileType>('profile', profile).then(res => res.data)
  }
}

export const securityApi = {
  getCaptchaURL() {
    return instance.get('/security/get-captcha-url')
  }
}
