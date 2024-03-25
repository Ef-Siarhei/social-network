import React, { useState } from 'react';

// class ProfileStatus extends React.Component {
//   state = {
//     editMode: false,
//     status: this.props.status,
//   };
//   activateEditMode = () => {
//     console.log(this);
//     this.setState({
//       editMode: true,
//     });
//   };
//   deactivateEditMode = () => {
//     this.setState({
//       editMode: false,
//     });
//     this.props.updateUserStatus(this.state.status);
//   };
//
//   onStatusChange = (e) => {
//     this.setState({
//       status: e.currentTarget.value,
//     });
//   };
//
//   render() {
//     return (
//       <div>
//         {!this.state.editMode ? (
//           <div>
//             <span onDoubleClick={this.activateEditMode}>
//               {this.props.status || '-----'}
//             </span>
//           </div>
//         ) : (
//           <div>
//             <input
//               onChange={this.onStatusChange}
//               autoFocus={true}
//               onBlur={this.deactivateEditMode}
//               type={'text'}
//               value={this.state.status}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// export default ProfileStatus;

// This also worked
const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
        </div>
      ) : (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            type={'text'}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
