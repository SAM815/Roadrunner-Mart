import React from 'react';
import './Sidebar.css';
import logo from "../../Images/RoadrunnerMart.png";
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from "@mui/lab"
import { ExpandMore, PostAdd, Add, ImportExport, ListAlt, Dashboard, RateReview, People } from "@mui/icons-material"

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
