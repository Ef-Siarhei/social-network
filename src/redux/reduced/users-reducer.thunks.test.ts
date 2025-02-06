import {actions, follow, unFollow} from "./users-reducer";
import {usersAPI} from "../../api/users-api";
import {ApiResponseType, ResultCodesEnum} from "../../api/api";

jest.mock("../../api/users-api")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
const extraArgument = {}

const result: ApiResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

test('follow thunk dispatches correct actions', async () => {

  userAPIMock.follow.mockReturnValue(Promise.resolve(result))

  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, extraArgument)

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followAC(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
})

test('unFollow thunk dispatches correct actions', async () => {

  userAPIMock.unFollow.mockReturnValue(Promise.resolve(result))

  const thunk = unFollow(5)

  await thunk(dispatchMock, getStateMock, extraArgument)

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 5))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowAC(5))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 5))
})

