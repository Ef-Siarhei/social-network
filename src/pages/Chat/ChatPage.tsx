import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/reduced/chat-reducer";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {ChatMessageType} from "../../api/chat-api";


export const ChatPage: FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat: FC = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())

    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return <div>
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)

  return <div style={{height: '400px', overflowY: 'auto'}}>
    {messages.map((m, index) => <Message key={index} message={m}/>)}
  </div>
}

const Message: FC<{ message: ChatMessageType }> = (props) => {
  return <>
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 10px'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={props.message.photo} alt={''} style={{width: '30px'}}/>
        <b>{props.message.userName}</b>
      </div>
      {props.message.message}
    </div>
    <hr/>
  </>
}

const AddMessageForm: FC = () => {
  const [message, setMessage] = useState('')
  const dispatch: AppDispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    </div>
    <div>
      <button onClick={sendMessageHandler} disabled={false}>Send</button>
    </div>
  </div>
}
