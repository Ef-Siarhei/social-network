import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import store from './redux/store';
import store from './redux/redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App store={store} />
      </BrowserRouter>
    </React.StrictMode>,
  );
};

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree();
});
