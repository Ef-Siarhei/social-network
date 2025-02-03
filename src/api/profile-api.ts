import {PhotosType, ProfileType} from "../types/types";
import {LogOutResponseType} from "./auth-api";
import {instance, ResultCodesEnum} from "./api";

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
