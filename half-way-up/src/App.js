import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { GS } from "./components/GetStarted";
//import { RNNAV } from "./components/about-us";
import { RC } from "./components/signup";
import { About } from "./components/aboutus";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <GS />
      <Contact />
      <RC />
      <About />
      <Footer />
    </div>
  );
}

export default App;
