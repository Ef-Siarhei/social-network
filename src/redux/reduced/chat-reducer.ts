import {FormAction} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from "../redux-store"
import {chatApi, ChatMessageType, StatusType} from "../../api/chat-api";
import {Dispatch} from "redux";


let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
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
    case 'sn/chat/STATUS_CHANGED': {
      return {
        ...state,
        status: action.payload.status
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
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'sn/chat/STATUS_CHANGED',
    payload: {status}
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

let _newChangedHandler: ((status: StatusType) => void) | null = null
const newChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_newChangedHandler === null) {
    _newChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _newChangedHandler
}

// Thunks creator
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start()
  chatApi.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
  chatApi.subscribe('status-changed', newChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unSubscribe('messages-received', newMessagesHandlerCreator(dispatch))
  chatApi.unSubscribe('status-changed', newChangedHandlerCreator(dispatch))
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
