import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength15 = maxLengthCreator(15);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Input}
          name={'email'}
          placeholder={'email'}
          validate={[required, maxLength15]}
        />
      </div>
      <div>
        <Field
          component={Input}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <Field type={'checkbox'} name={'rememberMe'} component={'input'} />{' '}
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>Login here</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
