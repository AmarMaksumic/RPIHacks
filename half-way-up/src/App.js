import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { GS } from "./components/GetStarted";
import { RC } from "./components/signup";
import { AboutUs } from "./components/AboutUs";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <GS />
      <RC />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
