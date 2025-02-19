import {FC} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../../../redux/selectors/profile-selectors";
import {saveProfile} from "../../../../redux/reduced/profile-reducer";
import {AppDispatch} from "../../../../redux/redux-store";
import * as Yup from 'yup'

export const ProfileDataFormFormik: FC = () => {
  const profile = useSelector(getProfile)
  const dispatch: AppDispatch = useDispatch()

  return (
    <Formik
      initialValues={{...profile}}
      validationSchema={Yup.object({
        fullName: Yup.string().max(15, 'Must be 15 characters or less').required(),
        lookingForAJobDescription: Yup.string().max(150, 'Must be 150 characters or less'),
        aboutMe: Yup.string().max(150, 'Must be 150 characters or less')
      })}
      onSubmit={async (values) => {
        await dispatch(saveProfile(values))
      }}
    >
      {(formik) => (
        <Form style={{display: 'flex', flexDirection: 'column'}}>
          <label htmlFor={'fullName'}>Full Name: </label>
          <Field name={'fullName'}/>

          <label htmlFor={'lookingForAJob'}>Looking for a job: </label>
          <Field name={'lookingForAJob'} type={'checkbox'}/>

          <label htmlFor={'lookingForAJobDescription'}>The job description: </label>
          <Field name={'lookingForAJobDescription'} type={'textarea'}/>

          <label htmlFor={'aboutMe'}>About me: </label>
          <Field name={'aboutMe'} type={'textarea'}/>

          {Object.keys(profile?.contacts ?? {}).map(key => {
            return <div key={key}>
              <label htmlFor={'contacts.' + key}>{key}: </label>
              <Field name={'contacts.' + key}/>
            </div>
          })}

          <button type={'submit'} disabled={formik.isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}
