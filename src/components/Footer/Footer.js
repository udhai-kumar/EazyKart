import React from 'react'
import './footer.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/eco-logo.png'
import payment from '../../assets/images/payment.png'

import {FaFacebookF,FaInstagram,FaTwitter,FaLinkedin,FaEnvelope,FaPhone, FaLocationArrow} from 'react-icons/fa'


const Footer = () => {
  return (
    <>

<section className="footer" id="footer">
    <div className="container-fluid">
      <div className="foot-container">

        <div className="foot-box d-flex flex-column align-items-center">
          <img src={logo} className="logo" alt="logo" />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, saepe.</p>
          <div className="share">
            <span className="links"> <FaFacebookF  className="fab"/></span>
            <span className="links"> <FaInstagram  className="fab"/></span>
            <span className="links"> <FaTwitter  className="fab"/></span>
            <span className="links"> <FaLinkedin  className="fab"/></span>
          </div>
        </div>

        <div className="foot-box d-flex flex-column align-items-center">
          <h5>Contact</h5>
          <span  className="links"> <FaPhone  className="fas"/> 1800-222-3333 </span>
          <span  className="links"> <FaEnvelope  className="fas"/> xyz@eazykart.com </span>
          <span  className="links"><FaLocationArrow  className="fas"/> Chennai, india - 600004 </span>
        </div>

        <div className="foot-box d-flex flex-column align-items-center">
          <h5>Quick Links</h5>
          <span className="links"><Link to="/home">Home</Link></span> 
          <span className="links"><Link to="/shop">Shop</Link></span> 
          <span className="links"><Link to="/about us">About</Link></span> 
          <span className="links"><Link to="/cart">Cart</Link></span> 
 
        </div>

        <div className="foot-box d-flex flex-column align-items-center">
          <h5>Newsletter</h5>
          <p>Subscribe for latest updates</p>
          <div><input type="email" placeholder="Email" className="email" /></div>
         <div className='mt-2'><span><button className="btn btn-outline-info btn-sm justify-content-center">Subscribe</button></span></div> 
          <img src={payment} className="payment-img mt-2" alt="payment methods" />
        </div>

      </div>

      <div className="credit mt-0"> Created by <span> Udhayakumar S </span> | all rights reserved </div>
    </div>
  </section>

    </>
  )
}

export default Footer