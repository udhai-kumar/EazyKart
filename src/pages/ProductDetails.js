import React,{useState} from 'react'
import {Row,Container,Col} from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'
import Title from '../components/Title/Title'
import CommonSection from '../components/UI/CommonSection'
import products from '../assets/data/products';
import '../components/styles/ProductDetail.css'
import { motion } from 'framer-motion'
import {BsFillStarFill,BsStarHalf} from 'react-icons/bs'
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'


const ProductDetails = () => {
  const {id} =useParams();
  const[tab,setTab]=useState('desc');
  const dispatch=useDispatch();

  const product = products.find((item)=> item.id===id);
  const{imgUrl,productName,price,avgRating,reviews,description,shortDesc,category}=product;
    const cat= products.filter((item)=>item.category === category);

    const addToCart =()=>{
      dispatch(
        cartActions.addItem({
          id,
          imageUrl:imgUrl,
          productName,
          price
    })
      );
      toast.success('Product added SuccessFully')
      
    }

    const redirect=useNavigate();
    const Navigate = () =>{
      redirect("/cart")
    }
   
  

  
  return (
    <Title title={productName} >
      <CommonSection title={productName}/>
      <section>
        <Container>
          <Row className="d-flex flex-wrap">
            <Col lg="6" md="6"  className="pt-0">
              <motion.img whileHover={{scale:0.9}} src={imgUrl} alt={productName} class="mx-auto d-block" height="200" width="200"></motion.img>
            </Col>
            <Col lg="6" md="6" className="pt-0 mt-3 ">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className='product_rating d-flex align-items-center gap-5 mb-3'>
                  <div>
                    <span><BsFillStarFill className='icons'/></span>
                    <span><BsFillStarFill className='icons'/></span>
                    <span><BsFillStarFill className="icons"/></span>
                    <span><BsFillStarFill className="icons"/></span>
                    <span><BsStarHalf className="icons"/></span>
                 </div>
                <span><p>{avgRating}rating</p></span> 
              </div>
              <span className='price'>${price}</span>
              <p className="mt-2">{shortDesc}</p>
              
              <motion.button whileHover={{scale:1.1}} className='btn btn-outline-warning btn-sm' onClick={addToCart}>Add To Cart</motion.button>
              <motion.button whileHover={{scale:1.1}} className='btn btn-outline-info btn-sm' onClick={Navigate}>Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
      <Container>
        <Row>
          <Col lg="12" className="mt-3 mx-3">
            <div className='tab d-flex align-items-center gap-5'>
              <h6 className={`${tab==='desc' ?'active_tab':""}`} onClick={()=>setTab("desc")}>Description</h6> 
              <h6 className={`${tab==='rev' ?'active_tab':""}`} onClick={()=>setTab("rev")}>Reviews({reviews.length})</h6>           
               </div> 
               {tab === "desc" ?(<div className="tab_content mt-5">
                <p>{description}</p>
               </div>):<div className="tab_content mt-5">
                <div className='review_tab'>
                  <ul>
                    {
                      reviews.map((item,index)=>(
                        <li key={index}>
                          <h5>Antony George</h5>
                          <span>{item.rating}(rating)</span>
                        <p>{item.text}</p></li>
                      ))
                    }
                  </ul>

                </div>
               </div>}
               
          </Col>
        </Row>
      </Container>
      </section>
      <section>
        <Container>
          <Row>
            <h2 className='text-center'>Products you may like</h2>
            <Col lg='12'>
              <ProductsList data={cat}/>
            </Col>

          </Row>
        </Container>
      </section>
    </Title>

    
  )
}

export default ProductDetails