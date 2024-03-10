import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import store from './redux/store';
import store from './redux/redux-store';
import StoreContext from './store-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree();
});
