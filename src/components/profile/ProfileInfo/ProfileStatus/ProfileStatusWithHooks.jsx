import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

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

  const onStatusChange = (e) => {
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
