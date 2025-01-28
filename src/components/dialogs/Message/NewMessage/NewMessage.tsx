import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import s from './NewMessage.module.css';
import {Textarea} from '../../../common/FormsControl/FormsControl';
import {
  maxLengthCreator,
  required,
} from '../../../../utils/validators/validators';
import {FC} from "react";

type FormDataType = {
  message: string
}

const maxLength20 = maxLengthCreator(20);

const addMessageForm: FC<InjectedFormProps<FormDataType>> = (props) => {
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
const AddMessageReduxForm = reduxForm<FormDataType>({form: 'newMessage'})(addMessageForm);


type NewMessagePropsType = {
  sendMessage: (message: string) => void
}

const NewMessage: FC<NewMessagePropsType> = (props) => {
  let addNewMessage = (formData: FormDataType) => {
    props.sendMessage(formData.message);
  };

  return <AddMessageReduxForm onSubmit={addNewMessage}/>;
};

export default NewMessage;
