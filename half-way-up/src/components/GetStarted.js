
import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png"

export const GS = () => {


  return (
    <section className="get-started" id="get-started">
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
