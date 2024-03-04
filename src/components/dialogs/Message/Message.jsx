import s from './Message.module.css';

const Message = (props) => {
  const position = props.messageItem.hasOwnProperty('input')
    ? {
        positionMessageItem: s.positionLeft,
        styleMessage: s.messageLeft,
      }
    : {
        positionMessageItem: s.positionRight,
        styleMessage: s.messageRight,
      };

  return (
    <div className={`${s.messageItem} ${position.positionMessageItem}`}>
      <img
        src="https://flomaster.top/uploads/posts/2023-10/thumbs/1697595964_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-12.jpg"
        alt=""
        className={s.icon}
      />
      <span className={`${s.message} ${position.styleMessage}`}>
        {props.messageItem.message}
      </span>
    </div>
  );
};

export default Message;
