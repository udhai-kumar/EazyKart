import React from 'react'
import {Container} from 'react-bootstrap'
import "./CommonSection.css";

const CommonSection = ({title}) => {
  return (
    <section className="shop_heading">
        <Container className="text-center">
        <h2>{title}</h2>
    </Container>
    </section>
    

    )
}

export default CommonSection;