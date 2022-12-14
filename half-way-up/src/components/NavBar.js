import { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="HWU" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="get-started" className={activeLink === 'get-started' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('get-started')}>Get Started</Nav.Link>
              <NavDropdown 
                title={
                  <span className="custom-dropdown">Discover</span>
                }
                id="forum-dropdown-options" 
                className={activeLink === 'discover' ? 'active navbar-link nav-link custom-dropdown' : 'nav-link navbar-link custom-dropdown'}
                onClick={() => onUpdateActiveLink('discover')}

              >
                {/* Idea: Have a tooltip appear when hovering over the Startups and Posts options to explain that they are for finding posts based on startups or filter etc. */}
                <NavDropdown.Item href="/forumc"  onClick={() => onUpdateActiveLink('discover')}>Startups</NavDropdown.Item> 
                <NavDropdown.Item href="/forum-p"  onClick={() => onUpdateActiveLink('discover')}>Posts</NavDropdown.Item>

              </NavDropdown>
              <Nav.Link href="register" className={activeLink === 'register' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('register')}>Register</Nav.Link>
              <Nav.Link href="profile" className={activeLink === 'profile' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('profile')}>Profile</Nav.Link>
              <Nav.Link href="contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Routes>
        <Route exact path='/' exact element={}
      </Routes> */}
    </Router>
  )
}
