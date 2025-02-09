import style from './users.module.css';
import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup'

type PropsType = {
  users: Array<UserType>
  pageSize: number
  currentPage: number
  totalUsersCount: number
  followingIsProgress: Array<number>
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
}

const Users: FC<PropsType> = (props) => {
  return (
    <div className={style.users}>

      <SignupForm/>

      {props.users.map((user: UserType) => {
        return (
          <User
            user={user}
            key={user.id}
            followingIsProgress={props.followingIsProgress}
            follow={props.follow}
            unFollow={props.unFollow}
          />
        );
      })}

      <Paginator
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />

      <button className={style.show_more}>Show more</button>
    </div>
  );
};


const MyTextInput: FC<{ [key: string]: string }> = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error ? style.text_input : undefined} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckbox: FC<{ [key: string]: string }> = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'})

  return (
    <div>
      <label className={'checkbox-input'}>
        <input type={'checkbox'} {...field} {...props}/>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={'error'}>{meta.error}</div>
      ) : null}
    </div>
  )
}

interface MySelectProps {
  label: string;
  name: string;
  id?: string
  options: { value: string; label: string }[];
}

const MySelect: FC<MySelectProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: "",
        accepted: false,
        showFriendsOrNot: ''
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, 'Must be 15 characters or less').required(),
        lastName: Yup.string().max(20, 'Must be 20 characters or less').required(),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={
        (values, {setSubmitting}: {setSubmitting: (isSubmitting: boolean)=>void}) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false)
        }
      }
    >
      {({isSubmitting}) => (
        <Form>

          <MyTextInput label={'First name'} name={'firstName'}/>
          <MyTextInput label={'Last name'} name={'lastName'}/>
          <MyTextInput label={'Email'} name={'email'}/>

          <MyCheckbox name={'accepted'}>
            Are you Ok
          </MyCheckbox>

          <MySelect
            label={'Show'}
            name={'showFriendsOrNot'}
            options={[
              { value: '', label: 'Select a type' },
              { value: 'allPeoples', label: 'All peoples' },
              { value: 'friends', label: 'Only friends' },
              { value: 'notFriends', label: 'Only not friends' },
            ]}
          />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default Users
