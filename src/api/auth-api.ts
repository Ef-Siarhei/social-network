import {instance, ResponseType} from "./api";

type GetMeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
  getMe() {
    // This type <GetMeResponseType> returned to response.data
    return instance.get<ResponseType<GetMeResponseDataType>>('auth/me').then((response) => response.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<ResponseType<LoginResponseDataType>>('auth/login', {
      email,
      password,
      rememberMe,
      captcha
    }).then((response) => response.data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login').then((response) => response.data)
  },
}
