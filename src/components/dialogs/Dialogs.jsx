import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './Message/NewMessage/NewMessageContainer';

export default function Dialogs(props) {
  let dialogElements = props.dialogs.map((person) => (
    <DialogItem person={person} key={person.id} />
  ));

  let messagesElements = props.messages.map((messageItem) => (
    <Message messageItem={messageItem} key={messageItem.id} />
  ));
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages_block}>
        <div className={s.messages}>{messagesElements}</div>
        <NewMessageContainer />
      </div>
    </div>
  );
}

// export default function Dialogs() {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let messagesPage = store.getState().messagesPage;
//
//         let dialogElements = messagesPage.dialogs.map((person) => (
//           <DialogItem person={person} key={person.id} />
//         ));
//
//         let messagesElements = messagesPage.messages.map((messageItem) => (
//           <Message messageItem={messageItem} key={messageItem.id} />
//         ));
//         return (
//           <div className={s.dialogs}>
//             <div className={s.dialogs_items}>{dialogElements}</div>
//             <div className={s.messages_block}>
//               <div className={s.messages}>{messagesElements}</div>
//               <NewMessageContainer store={store} />
//             </div>
//           </div>
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// }
