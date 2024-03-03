import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

const setActive = ({ isActive }) => (isActive ? s.active : '');

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;

  return (
    <div>
      <NavLink to={path} className={setActive}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
