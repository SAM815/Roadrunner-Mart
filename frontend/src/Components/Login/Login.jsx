import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

/*
Login()
NAME
    Login
SYNOPSIS
    Login()
DESCRIPTION
    This React component renders a login form for users to authenticate themselves. It includes fields for email and password, and handles user input through controlled components. The component utilizes Material UI for styling and layout, and integrates with Redux for managing state and dispatching actions.

    Upon form submission, the `loginHandler` function is triggered, which prevents the default form submission event and dispatches the `loginUser` action with the email and password entered by the user.

    The component also uses the `useEffect` hook to handle side effects related to authentication, such as displaying error or success messages through the `react-alert` library. It listens for changes in the `error` and `message` state from Redux, and clears these states after displaying the appropriate alerts.

RETURNS
    Returns a React component that provides a user interface for logging into the application, including a form for entering email and password, and links for password recovery and new user registration.
*/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
        RoadRunner-Mart
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;