
import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import Carousel from 'react-multi-carousel';
import colorSharp from "../assets/img/color-sharp.png"
import 'react-multi-carousel/lib/styles.css';

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
                          <h5>Start a Post!</h5>
                      </div>
                      <div className="item">
                          <h5>Register Account</h5>
                      </div>
                      <div className="item">
                          <h5>Browse Startups</h5>
                      </div>
                  </Carousel>
                </div>
            </div>
          </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )

}
