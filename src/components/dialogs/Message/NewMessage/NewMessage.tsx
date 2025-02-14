import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './NewMessage.module.css';
import {createField, Textarea} from '../../../common/FormsControl/FormsControl';
import {maxLengthCreator, required,} from '../../../../utils/validators/validators';
import {FC} from "react";
import {sendMessage} from "../../../../redux/reduced/messages-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../redux/redux-store";

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


export const NewMessage: FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const addNewMessage = (formData: FormDataType) => {
    dispatch(sendMessage(formData.message))
  };

  return <AddMessageReduxForm onSubmit={addNewMessage}/>;
};
