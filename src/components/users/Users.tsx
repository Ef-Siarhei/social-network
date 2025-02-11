import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/reduced/users-reducer";
import {
  getCurrentPage,
  getFollowingIsProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter
} from "../../redux/selectors/users-selectors";
import {AppDispatch} from "../../redux/redux-store";

const Users: FC = () => {

  const users = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const followingIsProgress = useSelector(getFollowingIsProgress)
  const filter = useSelector(getUsersFilter)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, [])

  const onPageChanged = async (pageNumber: number) => {
    try {
      await dispatch(requestUsers(pageNumber, pageSize, filter));
    } catch (error) {
      console.error("Failed to change page:", error);
    }
  };

  const onFilterChanged = async (filter: FilterType) => {
    await dispatch(requestUsers(1, pageSize, filter))
  }

  const follow = async (userId: number) => {
    // @ts-ignore
    await dispatch(follow(userId))
  }

  const unFollow = async (userId: number) => {
    // @ts-ignore
    await dispatch(unFollow(userId))
  }

  const showMore = async () => {
    const nextPage = currentPage + 1;
    await dispatch(requestUsers(nextPage, pageSize, filter));
  };

  return (
    <div className={style.users}>

      {/*<SignupForm/>*/}
      <UsersSearchForm onFilterChanged={onFilterChanged}/>

      {users.map((user: UserType) => {
        return (
          <User
            user={user}
            key={user.id}
            followingIsProgress={followingIsProgress}
            follow={follow}
            unFollow={unFollow}
          />
        );
      })}

      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

      <button className={style.show_more} onClick={showMore}>Show more</button>
    </div>
  );
};


// const MyTextInput: FC<{ [key: string]: string }> = ({label, ...props}) => {
//   const [field, meta] = useField(props)
//
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className={meta.touched && meta.error ? style.text_input : undefined} {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className={'error'}>{meta.error}</div>
//       ) : null}
//     </>
//   )
// }
//
// const MyCheckbox: FC<{ [key: string]: string }> = ({children, ...props}) => {
//   const [field, meta] = useField({...props, type: 'checkbox'})
//
//   return (
//     <div>
//       <label className={'checkbox-input'}>
//         <input type={'checkbox'} {...field} {...props}/>
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className={'error'}>{meta.error}</div>
//       ) : null}
//     </div>
//   )
// }
//
// interface MySelectProps {
//   label: string;
//   name: string;
//   id?: string
//   options: { value: string; label: string }[];
// }
//
// const MySelect: FC<MySelectProps> = ({ label, options, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props}>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };
//
//
// const SignupForm = () => {
//   return (
//     <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: "",
//         accepted: false,
//         showFriendsOrNot: ''
//       }}
//       validationSchema={Yup.object({
//         firstName: Yup.string().max(15, 'Must be 15 characters or less').required(),
//         lastName: Yup.string().max(20, 'Must be 20 characters or less').required(),
//         email: Yup.string().email('Invalid email address').required('Required'),
//       })}
//       onSubmit={
//         (values, {setSubmitting}: {setSubmitting: (isSubmitting: boolean)=>void}) => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false)
//         }
//       }
//     >
//       {(formik) => (
//         <Form>
//
//           <MyTextInput label={'First name'} name={'firstName'}/>
//           <MyTextInput label={'Last name'} name={'lastName'}/>
//           <MyTextInput label={'Email'} name={'email'}/>
//
//           <MyCheckbox name={'accepted'}>
//             Are you Ok
//           </MyCheckbox>
//
//           <MySelect
//             label={'Show'}
//             name={'showFriendsOrNot'}
//             options={[
//               { value: '', label: 'Select a type' },
//               { value: 'allPeoples', label: 'All peoples' },
//               { value: 'friends', label: 'Only friends' },
//               { value: 'notFriends', label: 'Only not friends' },
//             ]}
//           />
//           <button type="submit" disabled={formik.isSubmitting}>Submit</button>
//         </Form>
//       )}
//     </Formik>
//   )
// }

export default Users
