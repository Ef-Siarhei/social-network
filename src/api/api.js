import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  // work without key!!!
  // headers: {
  //   'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
  // },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  getUsersClickToNumberPage(pageNumber, pageSize) {
    return instance
      .get(`users?count=${pageSize}&page=${pageNumber}`)
      .then((response) => response.data);
  },

  addFollow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },

  deleteFollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data);
  },
};
