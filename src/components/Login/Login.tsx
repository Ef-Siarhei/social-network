import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../common/FormsControl/FormsControl'
import {maxLengthCreator, required} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/reduced/auth-reducer'
import {Navigate} from 'react-router-dom'
import s from '../common/FormsControl/FormsControl.module.css'
import {AppStateType} from "../../redux/redux-store"

type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type FormDataTypeKeys = Extract<keyof FormDataType, string>

const maxLength15 = maxLengthCreator(15)

const LoginForm: FC<InjectedFormProps<FormDataType, OwnLoginReduxFormPropsType> & OwnLoginReduxFormPropsType> =
  ({
     handleSubmit,
     error,
     captchaUrl
   }) => {
    return (
      <form onSubmit={handleSubmit}>
        {createField<FormDataTypeKeys>('Email', 'email', [required, maxLength15], Input)}
        {createField<FormDataTypeKeys>('Password', 'password', [required, maxLength15], Input, {
          type: 'password',
        })}
        {createField<FormDataTypeKeys>(undefined, 'rememberMe', undefined, Input, {
          type: 'checkbox',
          hi: 'qwerty'
        }, 'remember me')}

        {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
        {captchaUrl && createField<FormDataTypeKeys>('Enter symbol from img up', 'captcha', [required], Input)}

        {error && <div className={s.form_summary_error}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }

type OwnLoginReduxFormPropsType = {
  captchaUrl: string | null
}

// Создать форму Redux
const LoginReduxForm = reduxForm<FormDataType, OwnLoginReduxFormPropsType>({form: 'login'})(LoginForm)

const Login: FC<LoginPropsType> = ({login, isAuth, captchaUrl}) => {
  const onSubmit = (formData: FormDataType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  // перенаправить, если аутентифицируется
  if (isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div>
      <h1>Login here</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

// подключить Redux к компоненту входа в систему
export default connect(mapStateToProps, {login})(Login)
