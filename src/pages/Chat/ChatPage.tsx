import React, {FC, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/reduced/chat-reducer";
import {AppDispatch} from "../../redux/redux-store";
import {ChatMessageType} from "../../api/chat-api";
import {getChatMessages, getChatStatus} from "../../redux/selectors/chat-selectors";


export const ChatPage: FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const status = useSelector(getChatStatus)

  useEffect(() => {
    dispatch(startMessagesListening())

    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {(status === 'error') && <div>Some error. Please refresh the page</div>}
      <Messages/>
      <AddMessageForm/>
    </div>
  )
}

const Messages: FC = () => {
  const messages = useSelector(getChatMessages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    const element = e.currentTarget
    if (element.scrollHeight - element.scrollTop < element.clientHeight + 30) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler} >
    {messages.map((m) => <Message key={m.id} message={m}/>)}
    <div ref={messagesAnchorRef}></div>
  </div>
}

const Message: FC<{ message: ChatMessageType }> = React.memo((props) => {
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
})

const AddMessageForm: FC = () => {
  const [message, setMessage] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const status = useSelector(getChatStatus)

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
      <button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</button>
    </div>
  </div>
}
