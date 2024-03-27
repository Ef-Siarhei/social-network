import { Field, reduxForm } from 'redux-form';
import { Input } from '../comoon/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Input}
          name={'login'}
          placeholder={'Login'}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <Field
          component={Input}
          name={'password'}
          placeholder={'Password'}
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
