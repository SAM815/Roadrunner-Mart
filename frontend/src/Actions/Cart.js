

import axios from "axios";




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


export const removeItemsFromCart = (id) => async(dispatch, getState)=>{
    dispatch({
        type:"REMOVE_FROM_CART",
        payload:id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({
        type:"SAVE_SHIPPING_INFO",
        payload:data,
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}