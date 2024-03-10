import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Dialogs from './components/dialogs/Dialogs';
import Header from './components/header/Header';
import Music from './components/music/Music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state} />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/profile" element={<Profile store={props.store} />} />
          <Route path="/dialogs/*" element={<Dialogs store={props.store} />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
