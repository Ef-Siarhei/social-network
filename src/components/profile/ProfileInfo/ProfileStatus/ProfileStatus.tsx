import React, {ChangeEvent, useState} from 'react';

type OwnPropsType = {
  status: string
  updateUserStatus: (newStatus: string) => void
}
type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<OwnPropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: OwnPropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status)
      this.setState({
        status: this.props.status,
      });
  }

  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || '-----'}
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              type={'text'}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;

// This also worked
// type OwnPropsType = {
//   status: string
//   updateUserStatus: (newStatus: string) => void
// }
//
// const ProfileStatus = (props: OwnPropsType) => {
//   let [editMode, setEditMode] = useState(false);
//   let [status, setStatus] = useState(props.status);
//
//   const activateEditMode = () => {
//     setEditMode(true);
//   };
//   const deactivateEditMode = () => {
//     setEditMode(false);
//     props.updateUserStatus(status);
//   };
//
//   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setStatus(e.currentTarget.value);
//   };
//
//   return (
//     <div>
//       {!editMode ? (
//         <div>
//           <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
//         </div>
//       ) : (
//         <div>
//           <input
//             onChange={onStatusChange}
//             autoFocus={true}
//             onBlur={deactivateEditMode}
//             type={'text'}
//             value={status}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProfileStatus;
