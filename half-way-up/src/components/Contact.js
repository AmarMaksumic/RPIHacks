import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const contactInit = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [contactDetails, setContactDetails] = useState(contactInit);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setContactDetails({
        ...contactDetails,
        [category]: value
      })
  }

  return (
    <section className="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img src={logo} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div >
                <h2>Get In Touch</h2>
                <form>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={contactDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={contactDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={contactDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={contactDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={contactDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
