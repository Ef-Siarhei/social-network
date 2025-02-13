import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {FC} from "react";
import {FilterType} from "../../redux/reduced/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/selectors/users-selectors";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<PropsType> = (props) => {

  const filter = useSelector(getUsersFilter)

  return <div>
    <Formik
      enableReinitialize
      // initialValues={{term: '', friend: 'null'}}
      initialValues={{term: filter.term, friend: filter.friend}}
      validationSchema={Yup.object({
        term: Yup.string().max(15, 'Must be 15 characters or less')
      })}
      onSubmit={(values, formik) => {
        // const filter: FilterType = {
        //   term: values.term,
        //   friend: values.friend === 'null' ? null : values.friend === 'true'
        // }
        const filter: FilterType = {
          term: values.term,
          friend: values.friend
        }
        // alert(JSON.stringify(values, null,2))
        props.onFilterChanged(filter)
        formik.setSubmitting(false)
      }}
    >
      {(formik) => (
        <Form>
          <Field type={'text'} name={'term'}/>
          {/*<ErrorMessage name={'term'}/>*/}
          <Field as={'select'} name={'friend'}>
            <option value={'null'}>All peoples</option>
            <option value={'true'}>Only friends</option>
            <option value={'false'}>Only unfriends</option>
          </Field>
          <button type={'submit'} disabled={formik.isSubmitting}>Find</button>
        </Form>
      )}
    </Formik>

  </div>
}
