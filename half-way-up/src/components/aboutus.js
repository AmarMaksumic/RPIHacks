import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png"
import contactImg from "../assets/img/logo.png";
import logo from '../assets/img/logo.svg';

export const AboutUs = () => {


  return (
    <section className="aboutus" id="aboutus">
        <Container>
        <Row className="align-items-center">
          <Col size={12} md={12}>
            <h2>
              <br></br>About Us
            </h2>
            <h4>
            We are the Half Way Down team, and our goal is to bring together all the up and coming startup companies across 
            industries into one, easy and accessible website!
            </h4>
          </Col>
            <Col size={12} md={6}>
              <p>
              Our team has noticed that startup companies often take the backseat when it comes to recruiting, trading, and networking. 
              However, using this website, startup companies will have their own forums for discussion and connection. 
              We envision a startup having the ability to create an account to immediately start troubleshooting with fellow startups, 
              advertise their brand to students and interested hobbyists, and engage in business transactions directly, circumventing the middleman.
              </p>
            </Col>
            <Col size={12} md={3}>
              <img src="logo.png" alt="Contact Us" width="200" height="200" />
            </Col>
        </Row>
      </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}