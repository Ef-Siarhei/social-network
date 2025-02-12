import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getUserStatus,} from '../../redux/reduced/profile-reducer';
import {useParams} from 'react-router-dom';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import {compose} from 'redux';
import {getAuthorizedUserId,} from '../../redux/selectors/profile-selectors';
import {AppDispatch} from "../../redux/redux-store";

const ProfileContainer: FC = (props) => {
  const authorizedUserId = useSelector(getAuthorizedUserId)
  const dispatch: AppDispatch = useDispatch()
  const params = useParams()

  let userId: number | null = Number(params.userId);

  const refreshProfile = async () => {
    if (!userId) {
      userId = authorizedUserId;
    }
    await dispatch(getUserProfile(userId))
    await dispatch(getUserStatus(userId))
  }

  useEffect(() => {
    refreshProfile();
  }, [userId])

  return (
    <>
      <Profile
        {...props}
        isOwner={!params.userId}
      />
    </>
  )
}

export default compose<React.FC>(
  withAuthNavigate,
)(ProfileContainer);
