import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state from './redux/state';
import { BrowserRouter } from 'react-router-dom';
import {
  addPost,
  updateNewPostText,
  addMessage,
  updateNewMessageText,
  subscribe,
} from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          state={state}
          addPost={addPost}
          updateNewPostText={updateNewPostText}
          addMessage={addMessage}
          updateNewMessageText={updateNewMessageText}
        />
      </BrowserRouter>
    </React.StrictMode>,
  );
};

rerenderEntireTree(state);

subscribe(rerenderEntireTree);
