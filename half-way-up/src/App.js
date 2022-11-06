import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { GS } from "./components/GetStarted";
import {GSMain} from "./components/GetStarted";
import { Example } from "./components/Example";
import { AboutUs } from "./components/aboutus";
import { Footer } from "./components/Footer";
import { ForumC } from "./components/ForumC";
import { Contact } from "./components/Contact"
import { ForumP } from "./components/ForumP";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import { GSMain} from './components/GetStarted'
import { Register } from "./components/Register"
import "./components/CSS/AboutUs.css"
import "./components/CSS/Banner.css"
import "./components/CSS/Example.css"
import "./components/CSS/Footer.css"
import "./components/CSS/ForumC.css"
import "./components/CSS/ForumP.css"
import "./components/CSS/GetStarted.css"
import "./components/CSS/NavBar.css"
import "./components/CSS/Contact.css"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>

      <Routes>
        <Route path="/" element={
          <div>
            <Banner />
            <GS />
            <AboutUs />
            <Example />          
          </div>
        } />
        <Route path='/get-started' element={
          <div>
            <GSMain />        
          </div>
        } />
        <Route exact path='/forumc' element={
          <ForumC/>
        } />
        <Route path='/forum-p' element={
          <ForumP/>
        } />
        <Route path='/contact' element={
          <Contact />
        } />
        <Route path='/register' element={
          <Register />
        } />
      </Routes>



      </Router>
      <Footer />
    </div>
  );
}

export default App;
