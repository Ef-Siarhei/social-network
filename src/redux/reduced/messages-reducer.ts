const SEND_MESSAGE = 'SEND-MESSAGE';

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

type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
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

type SendNewMessageActionCreatorType = {
  type: typeof SEND_MESSAGE,
  message: string
}

export const sendNewMessageActionCreator = (message: string): SendNewMessageActionCreatorType => ({
  type: SEND_MESSAGE,
  message,
});

// thunk creator
export const sendMessage = (message: string) => {
  //thunk
  return (dispatch: any) => {
    dispatch(sendNewMessageActionCreator(message));
  };
};

export default messagesReducer;
