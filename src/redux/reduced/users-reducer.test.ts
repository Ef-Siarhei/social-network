import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType

beforeEach(() =>
  state = {
    users: [
      {
        id: 0,
        name: 'Sergei_0',
        status: 'status 0',
        photos: {
          small: null,
          large: null
        },
        followed: false
      },
      {
        id: 1,
        name: 'Sergei_1',
        status: 'status 1',
        photos: {
          small: null,
          large: null
        },
        followed: false
      },
      {
        id: 2,
        name: 'Sergei_2',
        status: 'status 2',
        photos: {
          small: null,
          large: null
        },
        followed: true
      },
      {
        id: 3,
        name: 'Sergei_3',
        status: 'status 3',
        photos: {
          small: null,
          large: null
        },
        followed: true
      }
    ],
    pageSize: 10,
    currentPage: 1,
    totalUsersCount: 0,
    isFetching: false,
    followingIsProgress: []
  }
)

test('follow success', () => {
  const newState = usersReducer(state, actions.followAC(1))
  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unFollow success', () => {
  const newState = usersReducer(state, actions.unFollowAC(3))
  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
