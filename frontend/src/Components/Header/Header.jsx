import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,


} from "@mui/icons-material";

import { Tooltip, Typography } from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from "../../Images/RoadrunnerMart.png";


const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);

  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  return (
    <div className="header">

      <Link to="/" className="logo-container">
        <img src={logo} alt="RamapoMarketplace" className="logo" />
      </Link>


      <Tooltip title="Home">
        <Link to="/" onClick={() => setTab("/")}>
          {tab === "/" ? <Home style={{ color: "F5C24A" }} /> : <HomeOutlined />}
        </Link>
      </Tooltip>

      <Tooltip title="Add new post">
        <Link to="/newpost" onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <Add style={{ color: "F5C24A" }} />
          ) : (
            <AddOutlined />
          )}
        </Link>
      </Tooltip>

      <Tooltip title="Search">
        <Link to="/search" onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <Search style={{ color: "F5C24A" }} />
          ) : (
            <SearchOutlined />
          )}
        </Link>
      </Tooltip>

      <Tooltip title="Account">
        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <AccountCircle style={{ color: "F5C24A" }} />
          ) : (
            <AccountCircleOutlined />
          )}
        </Link>

      </Tooltip>

      <Tooltip title="Seller Dashboard if enabled seller account">

        {user.seller ?
          <Link to="/admin/dashboard" onClick={() => setTab("/admin/dashboard")}>
            {tab === "/admin/dashboard" ? (
              <ShopIcon style={{ color: "F5C24A" }} />
            ) : (
              <ShopOutlinedIcon />
            )}
          </Link> :
          <Link to="/admin/dashboard" onClick={() => setTab("/admin/dashboard")} style={{ pointerEvents: "none", cursor: "default" }}>
            {tab === "/admin/dashboard" ? (
              <ShopIcon style={{ color: "F5C24A" }} />
            ) : (
              <ShopOutlinedIcon />
            )}
          </Link>
        }
      </Tooltip>
      <Tooltip title="Cart">
        <Link to="/cart" onClick={() => setTab("/cart")} className="cartLink" >

          {tab === "/cart" ? (
            <ShoppingCartIcon style={{ color: "#F5C24A" }} />
          ) : (
            <ShoppingCartOutlinedIcon />
          )}
          {cartItems.length > 0 && (
            <span className="cartCount">{cartItems.length}</span>
          )}

        </Link>

      </Tooltip>





    </div>
  );
};

export default Header;