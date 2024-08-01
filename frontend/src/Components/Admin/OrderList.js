import React, {useEffect} from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid'
import {
    getAllOrders,
    clearErrors,
    deleteOrder,
} from "../../Actions/Order"
import {Link, useNavigate} from "react-router-dom"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'

import {Edit, Delete, } from "@mui/icons-material"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'

/*
OrderList()
NAME
    OrderList
SYNOPSIS
    OrderList();
DESCRIPTION
    This React component displays a list of all orders in a table format using DataGrid.
    It allows the user to view order details, edit, and delete orders.
    The component handles fetching orders, managing errors, and displaying success messages.
RETURNS
    Returns a React component that displays the list of orders with options to edit and delete.
*/

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error, orders} = useSelector(state=>state.allOrders);
    const {error:deleteError, isDeleted} = useSelector(state=>state.order);
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

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
            flex:0.3,
            headerName:"Actions",
            minWidth:50,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <>
                        <Link to = {`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit/>
                        </Link>
                        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
                }
            }
                
    ]

    const rows = [];

    orders && orders.forEach((item)=>{
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status :item.orderStatus,

        });
    })

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Order Deleted successfully");
            navigate("/admin/orders");
            dispatch({type:"DELETE_ORDER_RESET"});
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate])
  return (
    <>
        
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id = "productListHeading">All Orders</h1>

                <DataGrid
                    rows = {rows}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>
    </>
  )
}

export default OrderList