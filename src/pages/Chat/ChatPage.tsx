import {FC} from "react";

export const ChatPage: FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat: FC = () => {
  return <div>
    <Messages/>
    <AddMessageForm/>
  </div>
}

const Messages: FC = () => {
  const messages = ['adsa', 'saaf', 'fsgs']
  return <div style={{height: '400px', overflowY: 'auto'}}>
    {messages.map((m) => <Message message={m} />)}
    {messages.map((m) => <Message message={m} />)}
    {messages.map((m) => <Message message={m} />)}
  </div>
}

const Message: FC<any> = (props) => {
  const mes = {
    url: 'https://cdnb.artstation.com/p/assets/images/images/034/664/093/small/you-sian-jjevmori-pixel1.jpg?1612888820',
    name: 'Sergei'
  }
  return <div>
    <img src={mes.url} alt={''} style={{width: '40px'}}/>
    <b>{mes.name}</b>
    <div>{props.message}</div>
    <br/>
  </div>
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
