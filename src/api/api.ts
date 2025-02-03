import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
  },
})

export type ResponseType<D = {}, RC = ResultCodesEnum | ResultCodeForCaptchaEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}
