
import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png"

export const aboutus = () => {


  return (
    <section className="aboutus" id="aboutus">
        <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <h2>
              About us
            </h2>
            <h4>
            We are Half Way Down, and our goal is to bring together all the up and coming startup companies across 
            industries into one, easy and accessible website!
            </h4>
            <p>
            Our team has noticed that startup companies often take the backseat when it comes to recruiting, trading, and networking. 
            However, using this website, startup companies will have their own forums for discussion and connection. 
            We envision a startup having the ability to create an account to immediately start troubleshooting with fellow startups, 
            advertise their brand to students and interested hobbyists, and engage in business transactions directly, circumventing the middleman.
            </p>

          </Col>
        </Row>
      </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
