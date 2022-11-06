import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";

export const Example = () => {
    return (    
    <section className="aboutus" id="aboutus">
        <Container>
            <Row md={1}>
                <Col md={11}>
                <Row md={1}/>
                <Row md={8}>
                    <Col md={1}/>
                    <Col md={5}>
                        <div>
                            Heelo
                        </div>
                    </Col>
                    <Col md={2}/>
                </Row>
                <Row md={2}/>
                </Col>
            </Row> 
        </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
    )
}