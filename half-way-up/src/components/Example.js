import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";
import logo from '../assets/img/GF-logo.png';

export const Example = () => {
    return (    
    <section className="aboutus" id="aboutus">
        <Container>
            <Row md={8}>
              <Col size={6} md={1}><img src={logo} alt="Your Logo Here" className="company-logo"/></Col>
              
              <Col size={6} md={11} style={{paddingTop: "auto", paddingBottom: "auto"}}> 
              
              <h3 style={{margin: "auto auto"}}>Global Foundries</h3>
              </Col>
            </Row>
            <Row md={4}>
              <Col size={6} md={1}></Col>
              <Col size={6} md={11}> @GlobalFoundries123 </Col>
            </Row>
            <Row md={6}>
              great
            </Row>
        </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
    )
}