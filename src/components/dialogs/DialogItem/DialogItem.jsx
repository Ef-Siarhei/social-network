import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css';

const setActive = ({ isActive }) => (isActive ? s.active : '');

const DialogItem = (props) => {
  let path = '/dialogs/' + props.person.id;

  return (
    <div>
      <NavLink to={path} className={setActive}>
        <div className={s.dialogItem}>
          <img className={s.icon} src={props.person.icon} alt="" />
          <div className={s.personName}>{props.person.name}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default DialogItem;
