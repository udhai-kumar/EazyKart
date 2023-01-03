import React,{useState} from 'react';
import CommonSection from '../components/UI/CommonSection'
import Title from '../components/Title/Title';
import "../components/styles/Shop.css"
import {Container,Row,Col } from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';



const Shop = () => { 

  const[product,setProduct]=useState(products);
  const handleChange=(e)=>{
    const value =e.target.value;
    value ==="All"?setProduct(products):setProduct(products.filter((item)=>item.category===value))
  }
 const search=(e)=>{
  const keyword=e.target.value;
  console.log(keyword);
  const SearchProduct=products.filter((item)=>item.productName.toLowerCase().includes(keyword.toLowerCase()));
  setProduct(SearchProduct);
 }

 const Sort=(e)=>{
  const sort = e.target.value;
  if(sort==='Name'){
    setProduct(products.sort((a, b) => (a.productName > b.productName) ? 1 : -1)); 
  }

  else if(sort==='Price'){
   setProduct(products.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1));
  } 
  else{
    setProduct(products);
  }


 }
  console.log(product);
  return (
    <Title title="Shop">
      <CommonSection title="Products" />
      <section className="mt-3">
      <Container>
        <Row className="gap">
          <Col lg="3" md="6" className="mb-2">
            <div className="Cat_filter">
              <select onChange={handleChange}>
              <option value="All"> All</option>
                <option value="sofa"> Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
            </div>
          </Col>
          <Col lg="3" md="6" className="mb-2">
          <div className="Cat_filter">
              <select onChange={Sort}>
              <option>Sort By</option>
                <option value="Name">Name</option>
                <option value="Price">Price</option>
              </select>
            </div>
          </Col>
          <Col lg="6" md="12" className="">
            <div className="search_box">
              <input type="text" placeholder="Search.." onChange={search}/>
              <span><FaSearch className="searchicon"/></span>
            </div>
          </Col>
        </Row>
      </Container>
      </section>
      <section>
        <Container>
          <Row className="pb-3">
            {
              products.length===0?(<h1 className="text-center">No Products Found</h1>):(<ProductsList data={product} />)
            }
          </Row>
        </Container>

      </section>
    </Title>


  )
}

export default Shop