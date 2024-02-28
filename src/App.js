import "./App.scss";
import Dialogs from "./components/dialogs/Dialogs";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Dialogs />
        {/* <Profile /> */}
      </div>
    </div>
  );
}

export default App;
