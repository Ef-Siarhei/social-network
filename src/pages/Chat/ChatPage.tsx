import {FC, useEffect, useState} from "react";


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
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
  const [chatStatus, setChatStatus] = useState<'connected' | 'disabled' | null>(null)

  useEffect(() => {
    let ws: WebSocket
    const closeHandler = () => {
      setTimeout(createChannel, 5000)
      setChatStatus('disabled')
    }

    function createChannel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }

    createChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  useEffect(() => {
    const connectedHandler = () => {
      setChatStatus('connected')
    };
    wsChannel?.addEventListener('open', connectedHandler)

    return () => {
      wsChannel?.removeEventListener('open', connectedHandler)
    }
  }, [wsChannel])

  return <div>
    {chatStatus === 'disabled' && <div
      style={{color: 'red', position: 'fixed', top: '50%', left: '50%'}}
    >The channel disabled
      <button onClick={() => {
        setChatStatus(null)
      }}>Ok</button>
    </div>}
    <Messages wsChannel={wsChannel}/>
    <AddMessageForm wsChannel={wsChannel}/>
  </div>
}

const Messages: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    };
    wsChannel?.addEventListener('message', messageHandler)

    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }
  }, [wsChannel])

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

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus('ready')
    }
    wsChannel?.addEventListener('open', openHandler)

    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel?.send(message)
    setMessage('')
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    </div>
    <div>
      <button onClick={sendMessage} disabled={wsChannel === null || readyStatus !== 'ready'}>Send</button>
    </div>
  </div>
}
