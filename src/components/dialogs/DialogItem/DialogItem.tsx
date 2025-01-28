import {NavLink} from 'react-router-dom';
import s from './DialogItem.module.css';
import {DialogsType} from "../../../redux/reduced/messages-reducer";
import {FC} from "react";

type OwnPropsType = {
  dialogItem: DialogsType
  key: number
}

type NavLinkProps = {
  isActive: boolean
}

const setActive = ({isActive}: NavLinkProps) => (isActive ? s.active : '');

const DialogItem: FC<OwnPropsType> = (props) => {
  let path = '/dialogs/' + props.dialogItem.id;

  return (
    <div>
      <NavLink to={path} className={setActive}>
        <div className={s.dialogItem}>
          <img className={s.icon} src={props.dialogItem.icon} alt=""/>
          <div className={s.personName}>{props.dialogItem.name}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default DialogItem;
