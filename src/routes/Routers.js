import React, { useEffect } from 'react'
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import About from '../pages/About'
import ProductDetails from '../pages/ProductDetails'

 function Routers() {
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top when route changes

  },[location.pathname])
  return <>
  <Routes>
  <Route path='/' element ={<Home/>}/>
  <Route path='/home' element ={<Home/>}/>
  <Route path='/shop' element ={<Shop/>}/>
  <Route path='/about us' element ={<About/>}/>
  <Route path='/shop/:id' element ={<ProductDetails/>}/>
  <Route path='/cart' element ={<Cart/>}/>
</Routes>
</>

}
export default Routers