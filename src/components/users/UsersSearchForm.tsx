import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {FC} from "react";
import {FilterType} from "../../redux/reduced/users-reducer";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<PropsType> = (props) => {
  return <div>
    <Formik
      initialValues={{term: ''}}
      validationSchema={Yup.object({
        term: Yup.string().max(15, 'Must be 15 characters or less').required(),
      })}
      onSubmit={(values: FilterType, formik) => {
        props.onFilterChanged(values)
        formik.setSubmitting(false)
      }}
    >
      {(formik) => (
        <Form>
          <Field type={'text'} name={'term'}/>
          {/*<ErrorMessage name={'term'}/>*/}
          {/*<Field as={'select'} name={'friends'} >*/}
          {/*  <option value={'null'}>All peoples</option>*/}
          {/*  <option value={'true'}>Only friends</option>*/}
          {/*  <option value={'false'}>Only unfriends</option>*/}
          {/*</Field>*/}
          <button type={'submit'} disabled={formik.isSubmitting}>Find</button>
        </Form>
      )}
    </Formik>

  </div>
}
