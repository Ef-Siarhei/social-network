import Contacts from "../Contacts/Contacts";
import {ProfileType} from "../../../../types/types";
import {FC} from "react";
import {AppDispatch} from "../../../../redux/redux-store";
import {useDispatch} from "react-redux";
import {setProfileStatusEdit} from "../../../../redux/reduced/profile-reducer";

type OwnPropsType = {
  isOwner: boolean
  profile: ProfileType
}

const ProfileData: FC<OwnPropsType> = (props) => {

  const dispatch: AppDispatch = useDispatch()

  const submitEdit = async () => {
    await dispatch(setProfileStatusEdit('edit'))
  }

  return (
    <div>
      <Contacts contacts={props.profile.contacts}/>

      <div>
        <b>About me:</b> {props.profile['aboutMe']}
      </div>

      <div>
        <div>
          <b>Looking for a job</b>: {props.profile['lookingForAJob'] ? 'yes' : 'no'}
        </div>
        {props.profile['lookingForAJob'] &&
          <div>
            <b>My professional skills</b>: {props.profile['lookingForAJobDescription']}
          </div>
        }
      </div>

      {props.isOwner &&
        <div>
          <button onClick={submitEdit}>Edit profile</button>
        </div>}
    </div>
  )
}

export default ProfileData
