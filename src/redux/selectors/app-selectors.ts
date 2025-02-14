import {AppStateType} from "../redux-store"

export const getInitialized = (state: AppStateType) =>  state.app.initialized
export const getGlobalError = (state: AppStateType) =>  state.app.globalError
