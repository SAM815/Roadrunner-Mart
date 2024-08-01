

import axios from "axios";


/*
NAME
    addItemsToCart - Action to add items to the cart

SYNOPSIS
    addItemsToCart(id, amount)

DESCRIPTION
    This function dispatches an action to add items to the cart.
    It fetches the product details from the backend using the product ID,
    and then dispatches the ADD_TO_CART action with the product details.
    The cart items are also saved to localStorage.

PARAMETERS
    id - The ID of the product to add to the cart
    amount - The quantity of the product to add to the cart

RETURNS
    None
*/

export const addItemsToCart = (id, amount) => async (dispatch, getState)=>{

    const {data} = await axios.get(`/api/v1/post/${id}`);

    dispatch({
        type:"ADD_TO_CART",
        payload:{
            post:data.post._id,
            name:data.post.caption,
            price:data.post.price,
            image:data.post.image.url,
            stock:data.post.quantity,
            amount,
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  
}

/*
NAME
    removeItemsFromCart - Action to remove items from the cart

SYNOPSIS
    removeItemsFromCart(id)

DESCRIPTION
    This function dispatches an action to remove items from the cart.
    It dispatches the REMOVE_FROM_CART action with the product ID,
    and then saves the updated cart items to localStorage.

PARAMETERS
    id - The ID of the product to remove from the cart

RETURNS
    None
*/
export const removeItemsFromCart = (id) => async(dispatch, getState)=>{
    dispatch({
        type:"REMOVE_FROM_CART",
        payload:id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

/*
NAME
    saveShippingInfo - Action to save shipping information

SYNOPSIS
    saveShippingInfo(data)

DESCRIPTION
    This function dispatches an action to save shipping information.
    It dispatches the SAVE_SHIPPING_INFO action with the shipping data,
    and then saves the shipping information to localStorage.

PARAMETERS
    data - The shipping information to save

RETURNS
    None
*/
export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({
        type:"SAVE_SHIPPING_INFO",
        payload:data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}