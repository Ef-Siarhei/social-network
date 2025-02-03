import {instance} from "./api";

type GetCaptchaURLType = {
  url: string
}
export const securityApi = {
  getCaptchaURL() {
    return instance.get<GetCaptchaURLType>('/security/get-captcha-url').then(response => response.data)
  }
}
