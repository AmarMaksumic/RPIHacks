import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import Carousel from 'react-multi-carousel';
import colorSharp from "../assets/img/color-sharp.png"
import 'react-multi-carousel/lib/styles.css';
import Button from 'react-bootstrap/Button';


export const GS = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="get-started" id="get-started">
      <div className="container">
          <div className="row">
            <div className="col-12">
                <div className="gs-bx wow zoomIn">
                  <h2>Get Started!</h2>
                  <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme gs-slider">
                      <div className="item">
                      <Button href="/forum-p" variant="primary" className="button" active><h2>Start A Post</h2></Button>
                      </div>
                      <div className="item">
                      <Button href="/register" variant="primary" className="button" active><h2>Register Account</h2></Button>
                      </div>
                      <div className="item align-middle">
                        <Button href="/forumc" variant="primary" className="button" active><h2>Browse Startups</h2></Button>
                      </div>
                  </Carousel>
                </div>
            </div>
          </div>
        </div>
        
        <img className="background-image-left cut" src={colorSharp} alt="Image" />
        <img className="background-image-right cut" src={colorSharp} alt="Image" />
    </section>
  )

}


export const GSMain = () => {
  return (
    <section className="banner" id="home">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="align-items-center" style={{margin: "auto auto auto auto"}}> 
          <Col md={4} style={{margin: "auto 30px auto 50px"}}>
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                      <Nav.Link eventKey="first"><h2 style={{color: "white"}}>Register</h2></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                      <Nav.Link eventKey="second"><h2 style={{color: "white"}}>Create a Post</h2></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                      <Nav.Link eventKey="third"><h2 style={{color: "white"}}>Follow a Start Up</h2></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                      <Nav.Link eventKey="fourth"><h2 style={{color: "white"}}>Comment amogus</h2></Nav.Link>
                </Nav.Item>
            </Nav>
          </Col>
          <Col md={5}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <p style={{fontSize: "25px"}}>
                  Create a profile for your company to gain access to hundreds of forums!
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p style={{fontSize: "25px"}}>
                  Make your first post about anything from troubleshooting to recruiting!
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <p style={{fontSize: "25px"}}>
                  Follow your favorite up and coming start ups and be the first to see their posts!
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
              <p style={{fontSize: "25px"}}>
                  Start commenting to interact with your peers in the start up community!
                </p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </section>
  )
}