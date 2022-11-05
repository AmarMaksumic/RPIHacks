
import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png"

export const RNNAV = () => {


  return (
    <section className="rnnav" id="rnnav">
        <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>

          </Col>
        </Row>
      </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
