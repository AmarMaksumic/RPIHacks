import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import Carousel from 'react-multi-carousel';
import colorSharp from "../assets/img/color-sharp.png"
import 'react-multi-carousel/lib/styles.css';
import Button from 'react-bootstrap/Button';

export const GS = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
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
        <section className="get-started-2">
          <img className="background-image-left cut" src={colorSharp} alt="Image" />
          <img className="background-image-right cut" src={colorSharp} alt="Image" />
        </section>

    </section>
  )

}