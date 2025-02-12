import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {AppDispatch} from "../../../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {updateUserStatus} from "../../../../redux/reduced/profile-reducer";
import {getStatus} from "../../../../redux/selectors/profile-selectors";

const ProfileStatusWithHooks: FC = () => {
  const statusFromState = useSelector(getStatus)
  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(statusFromState);

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    setStatus(statusFromState)
  }, [statusFromState])

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = async () => {
    setEditMode(false);
    await dispatch(updateUserStatus(status))
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      <b>Status: </b>
      {!editMode &&
          <span onDoubleClick={activateEditMode}>{statusFromState || '----'}</span>
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
