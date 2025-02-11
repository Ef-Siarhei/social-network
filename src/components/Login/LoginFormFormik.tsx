import React, {FC} from "react"
import {ErrorMessage, Field, Form, Formik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {getCaptchaUrl} from "../../redux/selectors/auth-selectors"
import {AppDispatch} from "../../redux/redux-store"
import {login} from "../../redux/reduced/auth-reducer"
import * as Yup from 'yup'

export const LoginFormFormik: FC = () => {
  const captchaUrl = useSelector(getCaptchaUrl)
  const dispatch: AppDispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').max(20, 'Must be 20 characters or less').required('Required'),
        password: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
        rememberMe: Yup.boolean().oneOf([true], 'Must be only true'),
        captcha: captchaUrl ? Yup.string().required('Required') : Yup.string()
      })}
      onSubmit={async (values, {setSubmitting}) => {
        await dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
        setSubmitting(false)
      }}
    >
      {(formik) => (
        <Form>
          <label htmlFor="email">Email: </label>
          <Field name="email" type="email"/>
          <ErrorMessage name="email"/>

          <label htmlFor="password">Password:</label>
          <Field name="password" type="password"/>
          <ErrorMessage name="password"/>

          <label htmlFor="rememberMe">Remember me:</label>
          <Field name="rememberMe" type={'checkbox'}/>
          <ErrorMessage name="rememberMe"/>

          {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
          {captchaUrl &&
            <div>
              <label htmlFor="captcha">Enter symbol from img up:</label>
              <Field name="captcha" type={'text'}/>
              <ErrorMessage name="captcha"/>
            </div>
          }
          <button type="submit" disabled={formik.isSubmitting}>Login</button>
        </Form>
      )}
    </Formik>
  )
}
