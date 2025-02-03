import {BaseThunkType, InferActionsTypes} from "../redux-store";

type ActionsTypes = InferActionsTypes<typeof actions>

export type DialogsType = {
  id: number
  name: string
  icon: string
}
export type MessagesType = {
  id: number
  input?: boolean
  output?: boolean
  message: string
}

type InitialStateType = typeof initialState
let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Roman',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595928_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-3.jpg',
    },
    {
      id: 2,
      name: 'Kat',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595964_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-12.jpg',
    },
    {
      id: 3,
      name: 'Olga',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595973_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-29.jpg',
    },
    {
      id: 4,
      name: 'Pasha',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595998_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-31.jpg',
    },
    {
      id: 5,
      name: 'Sergei',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595977_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-23.jpg',
    },
    {
      id: 6,
      name: 'Masha',
      icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595983_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-26.jpg',
    },
  ] as Array<DialogsType>,
  messages: [
    {id: 1, input: true, message: 'Hi, how are you?'},
    {id: 2, output: true, message: 'What is you do today?'},
    {id: 3, input: true, message: 'Come to me tomorrow.'},
    {id: 4, input: true, message: 'Pasha'},
    {id: 5, output: true, message: 'Sergei'},
    {id: 6, input: true, message: 'Masha'},
  ] as Array<MessagesType>
};

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/messages/SEND_MESSAGE': {
      let newMessage: MessagesType = {
        id: 7,
        output: true,
        message: action.message
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    }
    default:
      return state;
  }
};

const actions = {
  sendNewMessageActionCreator: (message: string) => ({
    type: 'sn/messages/SEND_MESSAGE',
    message,
  } as const)
};

// thunk creator
type ThunkType = BaseThunkType<ActionsTypes, void>
export const sendMessage = (message: string): ThunkType => {
  //thunk
  return (dispatch) => {
    dispatch(actions.sendNewMessageActionCreator(message));
  };
};

export default messagesReducer;
