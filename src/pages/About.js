import React from 'react'
import logo from '../assets/images/eco-logo.png'
import { Row, Col, Container } from 'react-bootstrap'
import '../components/styles/About.css'
import Title from '../components/Title/Title';



const About = () => {
  return (
    <Title title='About'>
    <Container>
      <Row>
        <Col lg="6" md="6">
          <div>
            <img src={logo} alt="logo" height="350" width="350" className="mx-3 d-block" />
          </div>
        </Col>

        <Col lg="6" md="6">
          <div className="my-2" >
          <h1>Bringing brands and people together</h1>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt omnis, aliquam explicabo unde nulla eos ex, nisi quae mollitia ipsa modi aut reprehenderit doloribus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt omnis, aliquam explicabo unde nulla eos ex, nisi quae mollitia ipsa modi aut reprehenderit doloribus.</p>
            <button className="btn btn-sm btn-outline-warning">Read More..</button>
          </div>
          
        </Col>
      </Row>
    </Container>
    </Title>
  )
}

export default About