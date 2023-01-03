import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({data}) => {
  return (
   <>
   <div className='d-flex flex-wrap mt-2 mx-3 justify-content-evenly'>
   {data.map((item,index)=>
       <ProductCard item={item} key={index} />
   )}
   
   </div>
      </>
  )
}

export default ProductsList