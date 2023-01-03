import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/eco-logo.png'
import {BsCartCheck,BsFillHeartFill  } from "react-icons/bs";
import{ FaUserCircle}  from "react-icons/fa";
import './Header.css';
import{Link,useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'

const Header = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const navigate=useNavigate();
  const CartRedirect=()=>{
    navigate('/cart')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top">
      <Container>
     <Navbar.Brand className="Brand_title" >
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle "
            />
            EazyKart
          </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
           <Nav.Link className="head"><Link to='/home'>Home</Link></Nav.Link>
           <Nav.Link className="head"><Link to='/shop'>Shop</Link></Nav.Link>
           <Nav.Link className="head"><Link to='/about us'>About</Link></Nav.Link>
           <Nav.Link className="head"><Link to='/Cart'>Cart</Link></Nav.Link> 
          </Nav>
          <Nav className='me-2  Header_right'>
            <Nav.Link >
            <BsFillHeartFill className="Icon"/>
            <span className="badge">1</span>
            </Nav.Link>
            <Nav.Link >
           < BsCartCheck className="Icon" onClick={CartRedirect}/>
           <span className="badge">{totalQuantity}</span>
            </Nav.Link>
            <Nav.Link >
           <FaUserCircle className="Icon"/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
  )
}

export default Header