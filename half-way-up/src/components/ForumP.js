import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi"
import colorSharp from "../assets/img/color-sharp.png";
import TrackVisibility from 'react-on-screen';
import {AiOutlineClose} from 'react-icons/ai'
import {v4 as uuid} from 'uuid'
import one from '../assets/img/1.png'
import two from '../assets/img/2.png'
import thr from '../assets/img/3.png'

import {CompanyBanner} from './CompanyBanner.js'

export const ForumP = () => {

    const filtersInit = {
        age: '',
        size: '',
        sizeComp: '',
        dist: '',
        tags: [],
    }

    const [filters, setFilters] = useState(filtersInit)

    const onFormUpdate = (category, value) => {
        setFilters({
            ...filters,
            [category]: value,
        })
    }

    var plcHldr = ''
    const [tagValue, setTagTo] = useState('')
    const onTagLineUpdate = (tag) => {
        setTagTo(tag)
    }

    const enterKeyPress = (e, tag) => {
        if(e.key === 'Enter'){
            console.log("Tag: ", tag)
            setTagTo('');
            if(filters.tags.find(etag => {return etag === tag || etag.toUpperCase() === tag.toUpperCase()})){
                return;
            }
            setFilters({
                ...filters,
                tags: [...filters.tags, tag],
            })
        }
        console.log(filters)
    }

    const handleTagDeletion = (xtag) => {
        setFilters({
            ...filters,
            tags: filters.tags.filter((tag) => {return tag !== xtag})
        })
    }

  return (
    <section className="forum-c" id="forum-c">
        <Container style={{maxWidth: "70%"}}>
            <Col className="align-items-center">
                <Row className="align-items-center center-row">
                    <h1>Search The Forum!</h1>
                </Row>

                <Row className='layer-1'> {/*Search*/}
                    <Col>

                        <Row>
                            <Form.Control 
                                type='text' 
                                placeholder="Enter Tag Here..." 
                                className="tagline"
                                value={tagValue}
                                onKeyDown={(e) => enterKeyPress(e, e.target.value)}
                                onChange={(e) => onTagLineUpdate(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <div className="tag-corral">
                                {filters.tags.map(tag => (
                                    <div key={uuid()} className='tag-shell'>
                                        <span className='tag-text'>{tag}</span>
                                        <AiOutlineClose onClick={(e) => handleTagDeletion(tag)} className='delete-tag' color='red'/>
                                    </div>
                                ))}
                            </div>
                        </Row>

                    </Col>
                </Row>

                <Row className="imas">
                    <h1>For now it remains empty...</h1>
                </Row>  
            </Col>
        </Container>

        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}