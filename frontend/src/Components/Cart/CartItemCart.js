import React from 'react'
import "./CartItemCart.css"
import { Link } from 'react-router-dom'
/*
CartItemCard()
NAME
    CartItemCard
SYNOPSIS
    CartItemCard({ item, deleteCartItem });
    - item (object): The item object containing details about the product in the cart.
    - deleteCartItem (function): The function to remove the item from the cart.
DESCRIPTION
    This React component renders a single item in the shopping cart. It displays the item image, name, price, and a remove link.
    The item name is a clickable link that navigates to the product's detail page.
RETURNS
    Returns a React component that renders a single item card in the shopping cart with an image, name, price, and a remove link.
*/

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