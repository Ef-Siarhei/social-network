import s from './FormsControl.module.css';

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={hasError ? s.error : ''}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>some error</span>}
    </div>
  );
};
