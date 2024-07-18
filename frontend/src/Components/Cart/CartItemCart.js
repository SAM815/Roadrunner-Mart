import React from 'react'
import "./CartItemCart.css"
import { Link } from 'react-router-dom'

const CartItemCard = ({item, deleteCartItem}) => {
  return (
    <div className='CartItemCard'>
        <img src={item.image} alt="ssa" />
        <div>
            <Link to = {`/product/${item.post}`}>{item.name}</Link>
            <span>{`Price: $${item.price}`}</span>
            <p onClick= {()=>deleteCartItem(item.post)}>Remove</p>
            
        </div>
    </div>
  )
}

export default CartItemCard