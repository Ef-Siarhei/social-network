import {FC, useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const ChatPage: FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const Chat: FC = () => {
  return <div>
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages(JSON.parse(e.data))
    })
  }, [])

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
  return <div>
    <div>
      <textarea></textarea>
    </div>
    <div>
      <button>send</button>
    </div>
  </div>
}
