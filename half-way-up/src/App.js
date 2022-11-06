import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { GS } from "./components/GetStarted";
import { Example } from "./components/Example";
import { AboutUs } from "./components/aboutus";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <GS />
      <AboutUs />
      <Example />
      <Footer />
    </div>
  );
}

export default App;
