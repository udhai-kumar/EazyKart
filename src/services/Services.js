import React from 'react'
import {Row,Container,Col} from 'react-bootstrap'
import { TbTruckDelivery } from "react-icons/tb";
import './services.css';
import {RiExchangeDollarLine,RiSecurePaymentFill,RiRefreshFill} from "react-icons/ri";
import {motion} from 'framer-motion';

const Services = () => {
  return (
    <section className='services'>
        <Container className="mt-5">
            <Row>
                 <Col lg='3' md='4'>
                    <motion.div whileHover={{scale:1.1}}>
                    <div className='service_item'>
                     <span><TbTruckDelivery className='icons'/></span>
                     <div>
                         <h3>Free Shipping</h3>
                         <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    </div>
                    </motion.div>
                     </Col>
                     <Col lg='3' md='4'>
                     <motion.div whileHover={{scale:1.1}}>

                    <div className='service_item'>
                     <span><RiRefreshFill className="icons"/></span>
                     <div>
                         <h3>Easy Returns</h3>
                         <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    </div>
                    </motion.div>

                     </Col>

                     <Col lg='3' md='4'>
                     <motion.div whileHover={{scale:1.1}}>

                    <div className='service_item'>
                     <span><RiSecurePaymentFill className="icons"/></span>
                     <div>
                         <h3>Pay Secure</h3>
                         <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    </div>
                    </motion.div>

                     </Col>

                     <Col lg='3' md='4'>
                     <motion.div whileHover={{scale:1.1}}>

                    <div className='service_item'>
                     <span><RiExchangeDollarLine className="icons"/></span>
                     <div>
                         <h3>Back Guarantee</h3>
                         <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    </div>
                    </motion.div>

                     </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Services