import Contacts from "../Contacts/Contacts";
import {ProfileType} from "../../../../types/types";
import {FC} from "react";

type PropsType = {
  isOwner: boolean
  profile: ProfileType
  setProfileStatusEdit: () => void
}

const ProfileData: FC<PropsType> = (props) => {
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
          <button onClick={props.setProfileStatusEdit}>Edit profile</button>
        </div>}
    </div>
  )
}

export default ProfileData
