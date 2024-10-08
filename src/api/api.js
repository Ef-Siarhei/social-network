import axios from 'axios';
import {saveProfile} from "../redux/reduced/profile-reducer";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },

  unFollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
};

export const authAPI = {
  getMe() {
    return instance.get('auth/me').then((response) => response.data);
  },
  login(email, password, rememberMe) {
    return instance.post('auth/login', {email, password, rememberMe}).then((response) => response.data);
  },
  logout() {
    return instance.delete('auth/login').then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId).then((response) => response.data);
  },

  getStatus(userId) {
    return instance.get('profile/status/' + userId);
  },
  updateStatus(status) {
    return instance.put('profile/status', { status: status });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile) {
    return instance.put('profile', profile)
  }
};
