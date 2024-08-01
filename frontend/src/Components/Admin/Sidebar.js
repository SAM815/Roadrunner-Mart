import React from 'react';
import './Sidebar.css';
import logo from "../../Images/RoadrunnerMart.png";
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from "@mui/lab"
import { ExpandMore, PostAdd, Add, ImportExport, ListAlt, Dashboard, RateReview, People } from "@mui/icons-material"

/*
Sidebar()
NAME
    Sidebar
SYNOPSIS
    Sidebar();
DESCRIPTION
    This React component displays a sidebar navigation menu.
    It includes links to the dashboard, products, and orders.
    The product section is expandable, showing options for viewing all products or creating a new product.
RETURNS
    Returns a React component that renders a sidebar with navigation links.
*/

const Sidebar = () => {
    return (
      <div className='sideBar'>
          <Link to = "/">
              {/* <h2>ECommerce</h2> */}
              <img src={logo} alt="RamapoMarketplace" />
          </Link>
          <Link to = "/admin/dashboard">
              <p>
                  <Dashboard/> Dashboard
              </p>
          </Link>
          
          <Link to = "#">
          <TreeView
          defaultCollapseIcon = {<ExpandMore/>}
          defaultExpandIcon = {<ImportExport/>}
          >
              <TreeItem nodeId='1' label = "Products">
                  <Link to= "/admin/products">
                      <TreeItem nodeId='2' label = "All" icon = {<PostAdd/>}/>
                  </Link>
                  <Link to= "/newpost">
                      <TreeItem nodeId='3' label = "Create" icon = {<Add/>}/>
                  </Link>
              </TreeItem>
  
  
          </TreeView>
          </Link>
  
          <Link to = "/admin/orders">
              <p>
                  <ListAlt/>
                  Orders
              </p>
          </Link>
          
  
          
  
  
          
          
      </div>
    )
  }
  
  export default Sidebar
