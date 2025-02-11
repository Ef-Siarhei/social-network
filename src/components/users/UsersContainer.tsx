import {useSelector} from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {getIsFetching,} from '../../redux/selectors/users-selectors';
import withAuthNavigate from "../../hoc/withAuthNavigate";
import {compose} from "redux";

type OwnPropsType = {
  pageTitle: string
}

const UsersPage: React.FC<OwnPropsType> = (props) => {

  const isFetching = useSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader/> : null}
      <h2>{props.pageTitle}</h2>
      <Users/>
    </>
  );
}

export default compose<React.FC<OwnPropsType>>(withAuthNavigate)(UsersPage);
