import React,{useState,useEffect} from 'react'
import Title from '../components/Title/Title';
import Carousel from 'react-bootstrap/Carousel';
import Services from '../services/Services';
import {Row,Container,Col} from 'react-bootstrap'
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products';



function Home() {
const [data,setData]=useState(products)
const[best,setBest]=useState(products)
const[arrival,setArrival]=useState(products)

useEffect(()=>{
  const filtered=products.filter((item)=>item.category==="chair")
  setData(filtered);
  const bestfilter=products.filter((item)=>((item.category===("chair"))||(item.category===("sofa"))))
  setBest(bestfilter);
  const newfilter=products.filter((item)=>item.category==="mobile")
 setArrival(newfilter);

},[])


  return (
    <Title title={'Home'}>
    <section>
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/Pre-book/D12731792_IN_WLM_Apple_PC_LP_top_banner._CB452057659_.jpg"
          alt="Offers"
          height="400"
        />
            </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://assets.tatacliq.com/medias/sys_master/images/28221365157918.jpg"
          height="400"
          alt="Offers"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-40"
          src="https://venngage-wordpress.s3.amazonaws.com/uploads/2021/10/Email-Banner-Furniture-Sale.png"
          alt="Offers"
          height="400"
        />
       
      </Carousel.Item>
    </Carousel> 
    </section> 
    <Services/>
    <section className='trending_products'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section_title'>Trending Products</h2>
          </Col>
          <ProductsList data={data}/>
        </Row>

      </Container>

    </section>
    <section className='best_products'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section_title'>BestSelling Products</h2>
          </Col>
          <ProductsList data={best}/>
        </Row>

      </Container>

    </section>
    <section className='new_products'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section_title'>New Arrivals</h2>
          </Col>
          <ProductsList data={arrival}/>

        </Row>

      </Container>

    </section>
    </Title>
  )
}

export default Home;