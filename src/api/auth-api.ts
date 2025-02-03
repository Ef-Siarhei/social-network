import {instance, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

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
export type LogOutResponseType = {
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
