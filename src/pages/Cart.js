import React from 'react'
import Title from '../components/Title/Title';
import { Container,Row,Col} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import {AiFillDelete} from 'react-icons/ai'
import "../components/styles/Cart.css";
import {Link} from 'react-router-dom';

const Cart = () => {

  const cartItems = useSelector(state =>state.cart.cartItems);
  console.log(cartItems);
  const SubTotal=useSelector(state => state.cart.totalAmount);
  
  return (
    <Title title='Cart'>
      <section className="mt-2 mb-2">
        <Container>
          <Row>
            <Col lg='9' md='9'>
              {cartItems.length ===0?(
              <div class="card-body cart">
								<div class="col-sm-12 empty-cart-cls text-center">
									<img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" width="200" height="200" alt="empty" class="img-fluid mb-4 mr-3"/>
									<h3><strong>Your Cart is Empty</strong></h3>
									<h4>Add something to make me happy </h4>
									
								
								</div>
                </div>
						):( 
            <Table responsive size="sm">
      <thead>
        <tr>
          <th>Image</th>
          <th>ProductName</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove</th>
          
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item,index)=>(
          <Remove item={item} key={index}/>
          ))}
      </tbody>
         </Table>
)}

   
          </Col>
          <Col lg="3" md="3">

            <div className="Checkout">
            <h6>Total Qty:<span>{cartItems.length}</span></h6>
              <h6>SubTotal:<span>${SubTotal}</span></h6>
              <h6>Free Shipping <span>$0</span></h6>
              <h4>Total<span>${SubTotal}</span></h4>
              <button className='btn btn-info btn-sm w-100'><Link to="/shop">Continue Shopping</Link></button>
              <button className='btn btn-primary btn-sm w-100 mt-2'>Checkout</button>
            </div>
          </Col>
          </Row>
        </Container>
      </section>
    </Title>
  )
}
const Remove =({item})=>{

  const dispatch = useDispatch();
  const Delete = ()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  return(<tr>
    <td><img src={item.imageUrl} alt="pic" height="150" width="150" className="mx-auto d-block"/></td>
    <td>{item.productName}</td>
    <td>${item.price}</td>
    <td>{item.quantity}Nos</td>
    <td><AiFillDelete className="delete" onClick={Delete}/></td>
  </tr>)
  }
  




export default Cart