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
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./Reducers/Order";

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
    

   
  },
  preloadedState: initialState,
});

export default store; 