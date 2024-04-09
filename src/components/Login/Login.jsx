import { Field, reduxForm } from 'redux-form';
import { createField, Input } from '../common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/reduced/auth-reducer';
import { Navigate } from 'react-router-dom';
import s from '../common/FormsControl/FormsControl.module.css';

const maxLength15 = maxLengthCreator(15);

const LoginForm = ({ handleSubmit, error }) => {
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

      {error && <div className={s.form_summary_error}>{error}</div>}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ login, isAuth }) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login here</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
