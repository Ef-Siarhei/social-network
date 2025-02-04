import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppStateType} from "../redux/redux-store";

// Определяем типы для пропсов
interface MapStateProps {
  isAuth: boolean
}

interface WithAuthNavigateProps extends MapStateProps {
  // Здесь можно добавить другие пропсы, которые будут переданы в компонент
}

// Функция для маппинга состояния
let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

// Обертка компонента
const withAuthNavigate = (Component: React.ComponentType<WithAuthNavigateProps>) => {
  // Компонент-обертка
  let WrapperComponent: React.FC<WithAuthNavigateProps> = (props) => {
    if (!props.isAuth) return <Navigate to="/login"/>;
    return <Component {...props} />;
  };

  return connect(mapStateToProps, {})(WrapperComponent);
};

export default withAuthNavigate;
