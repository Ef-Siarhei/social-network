import React from 'react';
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';

test('renders without crashing', () => {
  const root = ReactDOM.createRoot(document.createElement('div'));
  root.render(<SamuraiJSApp />);
  root.unmount();
});
