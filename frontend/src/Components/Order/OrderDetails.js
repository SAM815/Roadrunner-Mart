import React , {useEffect}from 'react'
import "./OrderDetails.css"
import {useSelector, useDispatch} from "react-redux";

import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getOrderDetails, clearErrors } from '../../Actions/Order';
import Loading from '../Loader/Loader';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

/*
OrderDetails()
NAME
    OrderDetails
SYNOPSIS
    OrderDetails()
DESCRIPTION
    This React component displays detailed information about a specific order. It uses Redux to fetch and manage order data and displays it in a structured format.

    The component retrieves the order details using the `getOrderDetails` action and manages the loading and error states. It uses the `useParams` hook to get the order ID from the URL parameters and then dispatches an action to fetch the order details based on that ID.

    The component displays various details about the order, including:
    - Order ID
    - Shipping Information (name, phone number, address)
    - Payment Information (status, amount)
    - Order Status
    - Order Items (with links to product details)

    The component also handles loading states by showing a spinner (`Loading` component) while data is being fetched, and error states by displaying an error alert if an error occurs.

    The `useEffect` hook is used to fetch the order details when the component mounts or when dependencies change. Error handling and clearing errors are also managed within this hook.

RETURNS
    Returns a React component that displays detailed information about a specific order. The component includes sections for shipping information, payment information, order status, and a list of ordered items. If loading, a spinner is shown. If an error occurs, an error alert is displayed.
*/

const OrderDetails = () => {
    const {order, error, isLoading} = useSelector((state)=>state.orderDetails);
    const dispatch= useDispatch();
    const alert = useAlert();
    const {id} = useParams();

    
    
    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        console.log(`Id = ${id}`)
        dispatch(getOrderDetails(id));
    },[dispatch, alert, error, id])
    
  return (
    <>
        {isLoading? <Loading/> :
        <>
            
            <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                    <Typography component="h1">
                        Order #{order &&order._id}
                    </Typography>
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{order.shippingInfo && 
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                            }</span>
                        </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.paymentInfo &&
                                    order.paymentInfo.status === "succeeded"
                                    ? "greenColor":
                                    "redColor"
                                }
                            >
                                {order.paymentInfo && 
                                    order.paymentInfo.status === "succeeded"?
                                    "PAID":
                                    "NOT PAID"
                                }
                            </p>
                        </div>

                        <div>
                            <p>Amount:</p>
                            <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                    </div>
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.orderStatus && order.orderStatus === "Delivered"
                                    ? "greenColor"
                                    :
                                    "redColor"
                                }
                            >
                                <span>{order.orderStatus && order.orderStatus}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="orderDetailsCartItems">
                    <Typography>Order Items:</Typography>
                    <div className="orderDetailsCartItemsContainer">
                        {
                            order.orderItems && 
                            order.orderItems.map((item)=>(
                                <div key = {item.product}>
                                    <img src = {item.image} alt = "Product" />
                                    <Link to={`/products/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                        {item.amount} X ${item.price} = {" "}
                                        <b>${item.price * item.amount}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>}
    </>
  )
}

export default OrderDetails