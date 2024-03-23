import React, { useState } from 'react';

class ProfileStatus extends React.Component {
  statusInputRef = React.createRef();
  state = {
    editMode: false,
  };
  activateEditMode = () => {
    console.log(this);
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUserStatus(this.statusInputRef.current.value);
  };

  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status}
            </span>
          </div>
        ) : (
          <div>
            <input
              ref={this.statusInputRef}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              type={'text'}
              defaultValue={this.props.status}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;

// This also worked
// const ProfileStatus = (props) => {
//   let [state, setState] = useState(false);
//   let statusInputRef = React.createRef();
//
//   const activateEditMode = () => {
//     setState(true);
//   };
//   const deactivateEditMode = () => {
//     setState(false);
//     props.updateUserStatus(statusInputRef.current.value);
//   };
//
//   return (
//     <div>
//       {!state ? (
//         <div>
//           <span onDoubleClick={activateEditMode}>{props.status}</span>
//         </div>
//       ) : (
//         <div>
//           <input
//             ref={statusInputRef}
//             autoFocus={true}
//             onBlur={deactivateEditMode}
//             type={'text'}
//             defaultValue={props.status}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProfileStatus;
