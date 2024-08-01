

/*
store.js
NAME
    store.js
SYNOPSIS
    Redux store configuration for managing application state.
DESCRIPTION
    This file sets up the Redux store by combining reducers, applying middleware (including thunk for asynchronous actions), and enhancing it with Redux DevTools for debugging.
PARAMETERS
    None.
RETURNS
    Configured Redux store for the application.
*/

import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
  userSellerReducer

} from "./Reducers/User";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import { cartReducer } from "./Reducers/Cart";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "./Reducers/Order";

let initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")):
    [],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo")):
    {},
  }
}

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    userSellerReducer:userSellerReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails:orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    
    

   
  },
  preloadedState: initialState,
});

export default store; 