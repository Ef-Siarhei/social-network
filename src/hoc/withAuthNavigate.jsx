import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const withAuthNavigate = (Component) => {
  // Function wrapper component
  let WrapperComponent = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  };

  // Or so class wrapper component
  // class WrapperComponent extends React.Component {
  //   render() {
  //     if (!this.props.isAuth) return <Navigate to="/login" />;
  //     return <Component {...this.props} />;
  //   }
  // }

  let AuthNavigateComponent = connect(mapStateToProps, {})(WrapperComponent);
  return AuthNavigateComponent;
};

export default withAuthNavigate;
