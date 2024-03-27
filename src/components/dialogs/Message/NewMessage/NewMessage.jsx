import { Field, reduxForm } from 'redux-form';
import s from './NewMessage.module.css';

const addMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.newMessage}>
      <Field
        component={'textarea'}
        name={'message'}
        placeholder={'Enter your message'}
        className={s.input}
      />
      <button>Send message</button>
    </form>
  );
};
const AddMessageReduxForm = reduxForm({ form: 'newMessage' })(addMessageForm);

const NewMessage = (props) => {
  let addNewMessage = (formData) => {
    props.sendMessage(formData.message);
  };

  return <AddMessageReduxForm onSubmit={addNewMessage} />;
};

export default NewMessage;
