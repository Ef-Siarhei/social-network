import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} disPatch={store.disPatch.bind(store)} />
      </BrowserRouter>
    </React.StrictMode>,
  );
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);
