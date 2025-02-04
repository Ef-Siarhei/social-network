import {createField, Input, Textarea} from "../../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../../types/types";
import {FC} from "react";

const maxLength15 = maxLengthCreator(15)
const maxLength150 = maxLengthCreator(150)

type FormDataKeysType = keyof ProfileType

const ProfileDataForm: FC<InjectedFormProps<ProfileType>> = ({handleSubmit, initialValues}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <b>Full name:</b>
      {createField<FormDataKeysType>('Full name', 'fullName', [required, maxLength15], Input)}
    </div>
    <div>
      <b>Looking for a job</b>:
      {createField<FormDataKeysType>('Looking for a Job', 'lookingForAJob', undefined, Input, {type: 'checkbox'})}
    </div>
    <div>
      <b>My professional skills:</b>
      {createField<FormDataKeysType>('My professional skills...', 'lookingForAJobDescription', [required, maxLength150], Textarea)}
    </div>
    <div>
      <b>About me:</b>
      {createField<FormDataKeysType>('About me...', 'aboutMe', [required, maxLength150], Textarea)}
    </div>
    <div>
      <b>My contacts:</b>
      {Object.keys(initialValues.contacts ?? {}).map(key => {
        return <div key={key}>
          <b>{key}:</b>
          {createField(key, 'contacts.' + key, undefined, Input)}
        </div>
      })}
    </div>

    <div>
      <button>Save</button>
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType>({
  form: 'edit-profile',
  destroyOnUnmount: false
})(ProfileDataForm)

export default ProfileDataFormReduxForm
