import {AppStateType} from "../redux-store"

export const getChatStatus = (state: AppStateType) =>  state.chat.status
export const getChatMessages = (state: AppStateType) =>  state.chat.messages
