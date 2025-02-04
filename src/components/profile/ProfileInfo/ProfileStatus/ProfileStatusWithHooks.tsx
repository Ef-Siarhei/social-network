import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type OwnPropsType = {
  status: string
  updateUserStatus: (newStatus: string) => void
}

const ProfileStatusWithHooks: FC<OwnPropsType> = (props) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      <b>Status: </b>
      {!editMode &&
          <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
      }
      {editMode &&
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            type={'text'}
            value={status}
          />
      }
    </div>
  );
};
export default ProfileStatusWithHooks;
