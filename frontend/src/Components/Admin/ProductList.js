import React, { useEffect } from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid'

import { getMyPosts, loadUser } from "../../Actions/User";
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


import { Edit, Delete, } from "@mui/icons-material"
import Sidebar from './Sidebar'

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, posts } = useSelector((state) => state.myPosts);

  

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 50,
      flex: 0.3
    },
    {
      field: "price",
      headerName: "Price($)",
      type: "number",
      minWidth: 75,
      flex: 0.5,
    },
    
  ]

  const rows = [];

  posts && posts.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.quantity,
      price: item.price,
      name: item.name,

    });
  })

  useEffect(()=>{
    if (error){
        alert.error(error);
        dispatch({ type: "clearErrors" });
    }

    

    
    dispatch(getMyPosts());
}, [dispatch, alert, error])
  return (
    <>
        
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id = "productListHeading">All Products</h1>

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

export default ProductList
