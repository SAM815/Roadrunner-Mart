import React from 'react';
import "./Success.css";
import {CheckCircle} from "@mui/icons-material"
import {Typography} from "@mui/material"
import { Link } from 'react-router-dom';

/*
OrderSuccess()
NAME
    OrderSuccess
SYNOPSIS
    OrderSuccess()
DESCRIPTION
    This React component displays a success message to the user after an order has been successfully placed. It includes a checkmark icon, a message indicating that the order has been placed successfully, and a link to view the user's orders.

    The component uses Material UI's `CheckCircle` icon and `Typography` for styling. It provides a link for the user to navigate to the order history page where they can view their orders.

RETURNS
    Returns a React component that displays a success message with an icon and a link to view orders.
*/


const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
        <CheckCircle/>
        <Typography>Your Order has been placed successfully</Typography>
        <Link to = "/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess;