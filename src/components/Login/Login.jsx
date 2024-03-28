import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControl/FormsControl';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import {connect} from "react-redux";
import {login} from "../../redux/reduced/auth-reducer";
import {Navigate} from "react-router-dom";

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
          validate={[required, maxLength15]}
        />
      </div>
      <div>
        <Field type={'checkbox'} name={'rememberMe'} component={'input'}/>{' '}
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to='/profile'/>
  }

  return (
    <div>
      <h1>Login here</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
