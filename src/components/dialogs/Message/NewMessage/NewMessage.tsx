import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './NewMessage.module.css';
import {createField, Textarea} from '../../../common/FormsControl/FormsControl';
import {maxLengthCreator, required,} from '../../../../utils/validators/validators';
import {FC} from "react";

type FormDataType = {
  message: string
}
type FormDataKeysType = keyof FormDataType

const maxLength20 = maxLengthCreator(20);

const addMessageForm: FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.newMessage}>
      {createField<FormDataKeysType>('Enter your message', 'message', [required, maxLength20], Textarea, {className: s.input})}
      <button>Send message</button>
    </form>
  );
};
const AddMessageReduxForm = reduxForm<FormDataType>({form: 'newMessage'})(addMessageForm);


type OwnPropsType = {
  sendMessage: (message: string) => void
}

const NewMessage: FC<OwnPropsType> = (props) => {
  let addNewMessage = (formData: FormDataType) => {
    props.sendMessage(formData.message);
  };

  return <AddMessageReduxForm onSubmit={addNewMessage}/>;
};

export default NewMessage;
