import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getUserStatus,} from '../../redux/reduced/profile-reducer';
import {Params, useParams} from 'react-router-dom';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import {compose} from 'redux';
import {getAuthorizedUserId,} from '../../redux/selectors/profile-selectors';
import {AppDispatch} from "../../redux/redux-store";

type ParamsType = {
  params: Readonly<Params>
}

type PropsType = ParamsType

const withRouter = (WrappedComponent: React.ComponentType<PropsType>) => (props: PropsType) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks
  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

const ProfileContainer: FC<PropsType> = (props) => {

  const authorizedUserId = useSelector(getAuthorizedUserId)
  const dispatch: AppDispatch = useDispatch()

  let userId: number | null = Number(props.params['userId']);

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
        isOwner={!props.params['userId']}
      />
    </>
  )
}

export default compose<React.FC>(
  withRouter,
  withAuthNavigate,
)(ProfileContainer);
