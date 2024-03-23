import React, { useState } from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
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
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              type={'text'}
              value={this.props.status}
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
//
//   const activateEditMode = () => {
//     setState(true);
//   };
//   const deactivateEditMode = () => {
//     setState(false);
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
//             autoFocus={true}
//             onBlur={deactivateEditMode}
//             type={'text'}
//             value={props.status}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProfileStatus;
