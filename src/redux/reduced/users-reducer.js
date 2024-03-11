const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

const initialState = {
  users: [
    {
      id: 1,
      followed: true,
      fullName: 'Sergei',
      status: 'I am a boss!',
      location: { city: 'Minsk', country: 'Belarus' },
      photoURL:
        'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
    },
    {
      id: 2,
      followed: false,
      fullName: 'Dmitry',
      status: 'I am a little pig!',
      location: { city: 'Moscow', country: 'Russia' },
      photoURL:
        'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
    },
    {
      id: 3,
      followed: true,
      fullName: 'Mishel',
      status: 'I am  not a norse!',
      location: { city: 'Minsk', country: 'Belarus' },
      photoURL:
        'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
    },
    {
      id: 4,
      followed: false,
      fullName: 'Pit',
      status: 'I am a student!',
      location: { city: 'NewYork', country: 'USA' },
      photoURL:
        'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
    },
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    }
    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unFollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
