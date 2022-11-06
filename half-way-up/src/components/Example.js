import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";
import logo from '../assets/img/GF-logo.png';

export const Example = () => {
    return (    
    <section className="example" id="example">
        <Container>
          <Col>
            <Row md={10}>
              <Col md={1}><img src={logo} alt="Your Logo Here" className="company-logo"/></Col>
              
              <Col md={9} > 
                <Row md={6}>
                  <h3>Global Foundries</h3>
                </Row>
                <Row md={3}>
                  <span>@GlobalFoundries123</span>
                </Row>
              </Col>
            </Row>
            <Row md={6}>
              great
            </Row>
          </ Col>
        </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
    )
}