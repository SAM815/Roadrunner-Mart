import React, { useEffect } from 'react'
import "./MyOrder.css"
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, myOrders} from "../../Actions/Order";
import Loading from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';

import {Launch} from "@mui/icons-material"

/*
MyOrders()
NAME
    MyOrders
SYNOPSIS
    MyOrders()
DESCRIPTION
    This React component displays a list of orders for the currently logged-in user. It uses the `DataGrid` component from Material UI to present the orders in a tabular format.

    The component retrieves the user's orders from the Redux store and displays them in a grid with columns for Order ID, Status, Quantity of Items, Amount, and Actions. The status column uses different colors to indicate whether the order is "Delivered" or not. The actions column provides a link to view detailed information about each order.

    The component handles loading and error states. It displays a loading spinner (`Loading` component) while fetching data and shows an error message if an error occurs. The `useAlert` hook from `react-alert` is used to display error messages.

    The `useEffect` hook is used to fetch orders and handle errors when the component mounts or when dependencies change.

RETURNS
    Returns a React component that displays the user's orders in a table. The table is dynamically populated with order data from the Redux store. If loading, a spinner is shown. If an error occurs, an error alert is displayed. The component also includes a link to view details for each order.
*/

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoading, error, order} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);

    const columns = [
        {field:"id", headerName:"Order ID", minWidth:300, flex:1},
        {
            field:"status",
            headerName:"Status",
            
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            
            flex:0.3
            
        },
        {
            field:"amount",
            headerName:"Amount($)",
            type:"number",
            minWidth:300,
            flex:0.5
        },
        {
            field:"actions",
            headerName:"Actions",
            midWidth:150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell: (params)=>{
                return (
                    <Link to = {`/order/${params.getValue(params.id, "id")}`}>
                        <Launch/>
                    </Link>
                );
            },

        }
    ];
    const rows = [];

    order &&
    order.forEach((item, index)=>{
        rows.push({
            id:item._id,
            status:item.orderStatus,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
        })
    })

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch, alert, error])
  return (
    <>
        
        {isLoading? (<Loading/>) :
         (
        <div className='myOrdersPage'>
            <DataGrid
                rows = {rows}
                columns = {columns}
                pageSize= {10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
            />
            <Typography id= "myOrdersHeading">
                {user.name}'s Orders
            </Typography>
        </div>)
        }
    </>
  )
}

export default MyOrders