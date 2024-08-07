import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import {
    getOrderDetails,

    updateOrder,
} from "../../Actions/Order";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { AccountTree } from "@mui/icons-material"
import { Button } from '@mui/material';

import "./ProcessOrder.css";
import Sidebar from "./Sidebar";



import "./ProcessOrder.css"

/*
ProcessOrder()
NAME
    ProcessOrder
SYNOPSIS
    ProcessOrder();
DESCRIPTION
    This React component handles the processing of orders.
    It allows an admin to update the status of an order (e.g., Processing, Shipped, Delivered).
    The component fetches order details and displays shipping info, payment status, order status, and cart items.
RETURNS
    Returns a React component that displays order details and a form to update order status.
*/

const ProcessOrder = () => {


    const { order, error, isLoading } = useSelector(state => state.orderDetails);

    const { error: updateError, isUpdated } = useSelector(state => state.order)

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [status, setStatus] = useState("");
    const processStatus = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);



        dispatch(updateOrder(id, myForm));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" })
        }
        if (updateError) {
            alert.error(error);
            dispatch({ type: "clearErrors" })
        }
        if (isUpdated) {
            alert.success("Order Status is Updated");
            dispatch({ type: "UPDATE_ORDER_RESET" })
        }
        dispatch(getOrderDetails(id));

    }, [alert, error, updateError, dispatch, id, isUpdated, updateError])


    return (
        <>



            <div className="dashboard">
                <Sidebar/>
                <div className="newProductContainer">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
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
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.post}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.post}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.amount} X ${item.price} ={" "}
                                                        <b>${item.price * item.amount}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={processStatus}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTree />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            isLoading ? true : false || status === "" ? true : false
                                        }
                                        
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default ProcessOrder