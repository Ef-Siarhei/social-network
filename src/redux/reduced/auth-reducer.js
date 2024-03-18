const SET_USER_DATA = 'SET_USER_DATA';
const SET_IS_AUTH = 'SET_IS_AUTH';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: action.isAuth,
      };
    }

    default:
      return state;
  }
};

export const setUserData = (id, email, login) => ({
  type: SET_USER_DATA,
  data: { id, email, login },
});
export const setIsAuth = (isAuth) => ({
  type: SET_IS_AUTH,
  isAuth,
});

export default authReducer;
