import React, {FC} from 'react';
import type {FormProps} from 'antd';
import {Button, Checkbox, Form, Input} from 'antd';
import {login} from "../../redux/reduced/auth-reducer";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {getCaptchaUrl} from "../../redux/selectors/auth-selectors";

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
  captcha: string
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const LoginFormAntd: FC = () => {
  const captchaUrl = useSelector(getCaptchaUrl)
  const formLoginError = useSelector((state: AppStateType)=>state.form.login)
  const dispatch: AppDispatch = useDispatch()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
   await dispatch(login(values.email, values.password, values.remember, values.captcha))
    console.log('Success:', values);
  };

  return (
    <Form
      name="login"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true, captcha: ''}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {formLoginError?.submitFailed && <div style={{border: 'solid 2px red', padding: '5px', color: 'red', marginBottom: '10px' }}>{formLoginError.error}</div>}
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{required: true, message: 'Please input your email!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {captchaUrl && <div style={{textAlign: 'center'}}><img src={captchaUrl} alt={'captcha'}/></div>}
      {captchaUrl &&
        <Form.Item<FieldType>
          label='Captcha'
          name="captcha"
          rules={[{required: true, message: 'Please input captcha!'}]}
        >
          <Input/>
        </Form.Item>
      }

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};
