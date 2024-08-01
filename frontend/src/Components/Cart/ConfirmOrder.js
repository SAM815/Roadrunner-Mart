import React from 'react'
import "./ConfirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/*
ConfirmOrder()
NAME
    ConfirmOrder
SYNOPSIS
    ConfirmOrder()
DESCRIPTION
    This React component is used to display the confirmation of an order before proceeding to payment. It shows shipping information, cart items, and an order summary including subtotal, shipping charges, tax, and total price. The user can review their order details and proceed to payment.

    The component calculates the subtotal, shipping charges, tax, and total price based on the cart items and shipping information. It uses the `CheckoutSteps` component to show the current step in the checkout process.

    The `proceedToPayment` function stores the order information in `sessionStorage` and navigates the user to the payment page.

RETURNS
    Returns a React component that displays shipping information, cart items, and order summary with a button to proceed to payment.
*/

const ConfirmOrder = () => {

    const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);

    const subTotal = cartItems.reduce(
        (acc, item)=>acc + item.amount*item.price, 0
    )
    const shippingCharges = subTotal>1000?0:15;
    
    const tax = subTotal * 0.18;
    
    
    const totalPrice = subTotal + tax + shippingCharges;
    const navigate = useNavigate();

    const proceedToPayment = () => {
        const data= {
            subTotal,
            tax, 
            shippingCharges,
            totalPrice,
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  return (
    <>
        
        <CheckoutSteps activeSteps={1}/>
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                       <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                       </div>
                       <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                       </div>
                       <div>
                            <p>Address:</p>
                            <span>{address}</span>
                       </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            cartItems && 
                            cartItems.map((item)=>(
                                <div key = {item.product}>
                                    <img src={item.image} alt="Product" />
                                    {/* <p>{item.name}</p> */}
                                    <Link to = {`/`}>
                                        {`${item.name}`}
                                    </Link>
                                    <span>
                                        {item.amount} X ${item.price} = {" "}
                                        <b> {`$${
                                            item.price*item.amount
                                        }`}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>SubTotal:</p>
                            <span>${subTotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>${shippingCharges}</span>
                        </div>
                        <div>
                            <p>Tax:</p>
                            <span>${tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>${totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder