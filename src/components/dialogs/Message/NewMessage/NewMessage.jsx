import { Field, reduxForm } from 'redux-form';
import s from './NewMessage.module.css';
import { Textarea } from '../../../comoon/FormsControl/FormsControl';
import {
  maxLengthCreator,
  required,
} from '../../../../utils/validators/validators';

const maxLength20 = maxLengthCreator(20);

const addMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.newMessage}>
      <Field
        name={'message'}
        component={Textarea}
        placeholder={'Enter your message'}
        className={s.input}
        validate={[required, maxLength20]}
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
