import MyPosts from './MyPosts';
import {
  addNewPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/reduced/profile-reducer';
import StoreContext from '../../../store-context';
import React from 'react';

const MyPostContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let profilePage = store.getState().profilePage;

        let addPost = () => {
          store.dispatch(addNewPostActionCreator());
        };

        let changePost = (text) => {
          store.dispatch(updateNewPostTextActionCreator(text));
        };
        return (
          <MyPosts
            profilePage={profilePage}
            addPost={addPost}
            changePost={changePost}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
export default MyPostContainer;
