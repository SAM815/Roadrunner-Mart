import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";

import axios from "axios";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js"

import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./Components/Cart/Success";


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />



        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />

        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />

        <Route

          path="/cart"
          element={isAuthenticated ? <Cart /> : <Login />}
        />

        <Route
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <Login />} />

        <Route
          path="/order/confirm"
          element={isAuthenticated ? <ConfirmOrder /> : <Login />} />


        

        <Route path="search" element={<Search />} />

        <Route
          path="/success"
          element={isAuthenticated ? <OrderSuccess /> : <Login />} />



        {window.location.pathname!=="/process/payment" &&
        <Route exact path="*" element = {
          <NotFound/>
          }/>
        
        }
      </Routes>
      {
          
          <Elements stripe = {loadStripe(stripeApiKey)}>
            <Routes>
              {<Route exact path = "/process/payment" element = {<Payment/>} />}
  
            </Routes>
          </Elements>
        }
        
    </Router>
  );
}

export default App;