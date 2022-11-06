import { Container, Row, Col } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png";
import smol from '../assets/img/RPI Robotics Small.svg';

export const Profile = () => {


  return (
    <section className="prof" id="aboutus">
        <a href="https://sites.ecse.rpi.edu/roboticsclub/">
        <img src={smol} className="smol" />
        </a>
        
    </section>
  )
}