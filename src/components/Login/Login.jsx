import { reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/reduced/auth-reducer';
import { Navigate } from 'react-router-dom';
import s from '../common/FormsControl/FormsControl.module.css';

const maxLength15 = maxLengthCreator(15);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', [required, maxLength15], Input)}
      {createField('Password', 'password', [required, maxLength15], Input, {
        type: 'password',
      })}
      {createField(
        null,
        'rememberMe',
        null,
        Input,
        { type: 'checkbox' },
        'remember me',
      )}

      {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
      {captchaUrl && createField('Enter symbol from img up', 'captcha', [required], Input)}


      {error && <div className={s.form_summary_error}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login here</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
