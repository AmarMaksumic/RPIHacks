import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { GS } from "./components/GetStarted";
import { RNNAV } from "./components/rnnav";
import { RC } from "./components/signup";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <GS />
      <Contact />
      <RNNAV />
      <RC />
      <Footer />
    </div>
  );
}

export default App;
