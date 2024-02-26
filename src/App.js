import "./App.scss";

function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324"></img>
      </header>
      <nav className="nav">
        <ul>
          <li>Profile</li>
          <li>Messages</li>
          <li>News</li>
          <li>Music</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="content">
        <div>
          <img
            className="img_1"
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          />
        </div>
        <div>
          <img src="https://www.researchgate.net/publication/328101815/figure/fig3/AS:678371700772865@1538747825499/Original-image-of-Lena-200X200-pixels.ppm" />
          <div>Description</div>
        </div>
        <div>
          My posts
          <div>New post</div>
        </div>
        <div>
          Posts
          <div>post 1</div>
          <div>post 2</div>
        </div>
      </div>
    </div>
  );
}

export default App;
