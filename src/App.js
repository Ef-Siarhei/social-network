import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Dialogs from "./components/dialogs/Dialogs";
import Header from "./components/header/Header";
import Music from "./components/music/Music";
import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/profile" Component={Profile} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" Component={Music} />
          <Route path="/settings" Component={Settings} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
