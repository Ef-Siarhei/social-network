import {createField, Input, Textarea} from "../../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {reduxForm, SubmitHandler} from "redux-form";
import {ProfileType} from "../../../../types/types";
import {FC} from "react";

const maxLength15 = maxLengthCreator(15)
const maxLength150 = maxLengthCreator(150)

type PropsType = {
  handleSubmit: SubmitHandler
  initialValues: Partial<ProfileType>
}

const ProfileDataForm: FC<PropsType> = ({handleSubmit, initialValues}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <b>Full name:</b>
      {createField('Full name', 'fullName', [required, maxLength15], Input)}
    </div>
    <div>
      <b>Looking for a job</b>:
      {createField('Looking for a Job', 'lookingForAJob', null, Input, {type: 'checkbox'})}
    </div>
    <div>
      <b>My professional skills:</b>
      {createField('My professional skills...', 'lookingForAJobDescription', [required, maxLength150], Textarea)}
    </div>
    <div>
      <b>About me:</b>
      {createField('About me...', 'aboutMe', [required, maxLength150], Textarea)}
    </div>
    <div>
      <b>My contacts:</b>
      {Object.keys(initialValues.contacts ?? {}).map(key => {
        return <div key={key}>
          <b>{key}:</b>
          {createField(key, 'contacts.' + key, null, Input)}
        </div>
      })}
    </div>

    <div>
      <button>Save</button>
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile', destroyOnUnmount: false})(ProfileDataForm)

export default ProfileDataFormReduxForm
