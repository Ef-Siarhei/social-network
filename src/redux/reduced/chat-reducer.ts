import {FormAction} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from "../redux-store"
import {chatApi, ChatMessageType} from "../../api/chat-api";
import {Dispatch} from "redux";

let initialState = {
  messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/chat/MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
      }
    }
    case 'sn/chat/MESSAGES_CLEAR': {
      return {
        ...state,
        messages: []
      }
    }
    default:
      return state
  }
}

// Actions creator
const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'sn/chat/MESSAGES_RECEIVED',
    payload: {messages},
  } as const),
  messagesClear: () => ({
    type: 'sn/chat/MESSAGES_CLEAR',
  } as const)
}


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

// Thunks creator
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start()
  chatApi.subscribe(newMessagesHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unSubscribe(newMessagesHandlerCreator(dispatch))
  chatApi.stop()
  dispatch(actions.messagesClear())
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message)
}

export default chatReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
