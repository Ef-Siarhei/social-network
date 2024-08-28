import Contacts from "../Contacts/Contacts";

const ProfileData = (props) => {
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
          <button onClick={props.goToEditMode}>Edit profile</button>
        </div>}
    </div>
  )
}

export default ProfileData
