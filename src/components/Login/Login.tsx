import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../common/FormsControl/FormsControl'
import {maxLengthCreator, required} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/reduced/auth-reducer'
import {Navigate} from 'react-router-dom'
import s from '../common/FormsControl/FormsControl.module.css'
import {AppStateType} from "../../redux/redux-store"

// Определить набор данных для данных формы
type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

// Создать валидатор максимальной длины
const maxLength15 = maxLengthCreator(15)

// определение компонента входа в систему
const LoginForm: FC<InjectedFormProps<FormDataType, OwnLoginReduxFormPropsType> & OwnLoginReduxFormPropsType> =
  ({
     handleSubmit,
     error,
     captchaUrl
   }) => {
    return (
      <form onSubmit={handleSubmit}>
        {createField('Email', 'email', [required, maxLength15], Input)}
        {createField('Password', 'password', [required, maxLength15], Input, {
          type: 'password',
        })}
        {createField(null, 'rememberMe', null, Input, {type: 'checkbox', hi: 'qwerty'}, 'remember me')}

        {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
        {captchaUrl && createField('Enter symbol from img up', 'captcha', [required], Input)}

        {error && <div className={s.form_summary_error}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </form>
    )
  }

// Определите типы предложений для LoginReduxForm
type OwnLoginReduxFormPropsType = {
  captchaUrl: string | null
}

// Создать форму Redux
const LoginReduxForm = reduxForm<FormDataType, OwnLoginReduxFormPropsType>({form: 'login'})(LoginForm)

// определить типы состояния Redux и отправки
type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
// объединить реквизиты state and dispatch
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

// Основное определение компонента входа в систему
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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

// подключить Redux к компоненту входа в систему
export default connect(mapStateToProps, {login})(Login)
