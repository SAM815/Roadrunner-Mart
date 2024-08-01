import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";

/*
ForgotPassword()
NAME
    ForgotPassword
SYNOPSIS
    ForgotPassword()
DESCRIPTION
    This React component provides a form for users to request a password reset by submitting their email address. The component dispatches an action to send a password reset token to the provided email. It handles loading and error states, as well as displays success messages when appropriate.

    The component uses Material UI's `Button` and `Typography` for styling. It also integrates `react-alert` for displaying error and success messages. The `useEffect` hook manages side effects related to errors and messages.

RETURNS
    Returns a React component that includes a form for entering an email address and a button to submit the form. Displays messages based on the status of the password reset request.
*/


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          RoadRunner-Mart
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;