import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi"
import colorSharp from "../assets/img/color-sharp.png";
import TrackVisibility from 'react-on-screen';
import {AiOutlineClose} from 'react-icons/ai'
import {v4 as uuid} from 'uuid'
import logo from "../assets/img/GF-logo.png"

export const CompanyBanner = () => {
    

    return (
        <Col className="yas">
            <Row>
                <Col className="col-69">
                    <TrackVisibility>
                    {({ isVisible }) =>
                        <img src={logo} alt="logo"/>}
                    </TrackVisibility>
                </Col>

                <Col className="col-69">
                    <span className="Company-titl">Global Foundries</span>
                </Col>

                <Col className="col-69">
                    Hiring Graphic
                </Col>
            </Row>

            <Row>
                <Col>
                    <Row>
                        Global Foundries is a leading semiconductor foundry, providing advanced technology solutions to the world's top semiconductor companies.
                    </Row>

                    <Row>
                        Links
                    </Row>
                </Col>

                <Col>
                
                    <Row>
                        Post1
                    </Row>

                    <Row>
                        Post2
                    </Row>
                    
                </Col>
            </Row>
        </Col>
    )

}