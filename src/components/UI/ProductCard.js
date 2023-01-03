import React from 'react'
import{FaShoppingCart} from 'react-icons/fa'
import {motion} from 'framer-motion'
import {Col,Row} from 'react-bootstrap';
import'../../components/styles/Productcard.css'
import {Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({item}) => {
const dispatch = useDispatch()
const addToCart =()=>{
  dispatch(cartActions.addItem({
    id:item.id,
    productName:item.productName,
    price:item.price,
    imgUrl:item.imgUrl
  }))
  toast.success("Product Added Successfully");
}



  return (
    <Row>
        <div className='d-flex '>
    <Col lg='3' md='4' >
    <div className="product_item ">
        <div className='product_img'>
            <motion.img whileHover={{scale:1.1}} src={item.imgUrl} alt='chair' height="175" width="175"/>
        </div>
        <div className='p-2 product_info'>
        <h3 className='product_name'>
        <Link to={`/shop/${item.id}`} > {item.productName} </Link>
        </h3>

        <span>{item.category}</span>
        </div>
        <div className='product_card-bottom '>
           <span className='price'>${item.price}</span> 
            <motion.span whileHover={{scale:1.1}} onClick={addToCart}><FaShoppingCart className='addbutton' /></motion.span>
        </div>
    </div>
    
    </Col>
    </div>

    </Row>
  )
}

export default ProductCard