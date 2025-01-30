import axios, {AxiosResponse} from 'axios'
import {ProfileType} from "../types/types"

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },

  follow(id: number) {
    return instance.post(`follow/${id}`).then((response) => response.data)
  },

  unFollow(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  },
}

// TODO start authApi
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

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId).then((response) => response.data)
  },

  getStatus(userId: number) {
    return instance.get('profile/status/' + userId)
  },
  updateStatus(status: string) {
    return instance.put('profile/status', {status: status})
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile: ProfileType) {
    return instance.put('profile', profile)
  }
}

export const securityApi = {
  getCaptchaURL() {
    return instance.get('/security/get-captcha-url')
  }
}
