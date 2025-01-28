import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {logout} from '../../redux/reduced/auth-reducer';
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth:boolean
  login: string | null
}

type MapDispatchToPropsType = {
  logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);
