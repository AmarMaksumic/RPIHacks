import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Register = () => {
  const signUpInit = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  }
  const [signUpDetails, setSignUpDetails] = useState(signUpInit);
  const [buttonText, setButtonText] = useState('Sign Up');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setSignUpDetails({
        ...signUpDetails,
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
                <h2>Let's Start Up an Account!</h2>
                <form>
                  <Col>
                    <Row size={12} sm={6} className="px-1">
                      <input type="text" value={signUpDetails.firstName} placeholder="Username" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Row>
                    <Row size={12} sm={6} className="px-1">
                      <input type="text" value={signUpDetails.lasttName} placeholder="Display Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Row>
                    <Row size={12} sm={6} className="px-1">
                      <input type="email" value={signUpDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Row>
                    <Row size={12} sm={6} className="px-1">
                    <form style={{width: "100%"}}>
                        <input type="radio" id="user" name="user_account" value="User"/>
                        <label for="user" className="user-lab">User Account</label><br/>
                        <input type="radio" id="comp" name="comp_account" value="Company"/>
                        <label for="comp" className="comp-lab">Company Account</label>
                    </form>
                    </Row>
                    <Row size={12} className="px-1">
                    <input type="text" value={signUpDetails.password} placeholder="Password" onChange={(e) => onFormUpdate('password', e.target.value)}/>
                      <input type="text" value={signUpDetails.password} placeholder="Password Again" onChange={(e) => onFormUpdate('password', e.target.value)}/>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Row>
                  </Col>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
