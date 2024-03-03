import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let dialogs = [
  { id: 1, name: 'Roman' },
  { id: 2, name: 'Kat' },
  { id: 3, name: 'Olga' },
  { id: 4, name: 'Pasha' },
  { id: 5, name: 'Sergei' },
  { id: 6, name: 'Masha' },
];
let messages = [
  { id: 1, message: 'Hi, how are you?' },
  { id: 2, message: 'What is you do today?' },
  { id: 3, message: 'Come to me tomorrow.' },
  { id: 4, message: 'Pasha' },
  { id: 5, message: 'Sergei' },
  { id: 6, message: 'Masha' },
];

let posts = [
  { id: 1, message: 'Hi, how are you?', like: '5' },
  { id: 2, message: "It's my first post.", like: '20' },
];

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App posts={posts} dialogs={dialogs} messages={messages} />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
