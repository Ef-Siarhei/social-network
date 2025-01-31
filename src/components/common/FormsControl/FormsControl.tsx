import s from './FormsControl.module.css';
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form';
import {FieldValidatorType} from "../../../utils/validators/validators";
import React, {FC} from "react";

type FieldComponentType = {
  input: WrappedFieldInputProps
  meta: WrappedFieldMetaProps
}

// Field from redux-form передает сам в компаненту пропсы input, meta, и пользовательские
// type WrappedFieldProps обьединяет input: WrappedFieldInputProps и meta: WrappedFieldMetaProps

type ChildrenType = {
  children: React.ReactNode
}

const FormControl: FC<FieldComponentType & ChildrenType> = ({meta, children}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={hasError ? s.error : ''}>
      <div>{children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea: FC<FieldComponentType> = (props) => {
  let {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<FieldComponentType> = (props) => {
  let {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const createField = <FormKeysType extends string,>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType> | undefined,
  component: React.FC<FieldComponentType>,
  props = {},
  text = '',
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />
    {text}
  </div>
);

