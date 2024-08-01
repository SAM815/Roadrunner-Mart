import React, { useEffect, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from "react-redux";

import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createOrder, clearErrors } from '../../Actions/Order';
import axios from "axios";
import "./Payment.css";
import { CreditCard, Event, VpnKey } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';

/*
Payment()
NAME
    Payment
SYNOPSIS
    Payment()
DESCRIPTION
    This React component handles the payment process for an order. It integrates with Stripe to handle card payments. The component collects payment details from the user, processes the payment, and dispatches an action to create the order upon successful payment. If an error occurs, it alerts the user.

    The component retrieves order information from `sessionStorage`, sets up payment details, and uses the Stripe API to process the payment. Upon successful payment, it dispatches an action to create the order and navigates to a success page.

RETURNS
    Returns a React component that displays a payment form with fields for card information and a button to submit the payment. The component manages payment processing and error handling.
*/

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const payBtn = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),

    }

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subTotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice,

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",

                }
            };
            const { data } = await axios.post(
                `/api/v1/payment/process`,
                paymentData,
                config
            )

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            })

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);

            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status,
                    }
                   
                    console.log(order);

                    // //removing items from the cart
                    // cartItems.map((item)=>{
                    //     return dispatch(removeItemsFromCart(item.product))
                    // })
                   
                    dispatch(createOrder(order));
                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


    }, [dispatch, error, alert]);



    return (
        <div>
            <div className="paymentContainer">
                <form onSubmit={(e) => submitHandler(e)} className="paymentForm">

                    <Typography>
                        Card Info
                    </Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </div>
    )
}

export default Payment;