import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

/*
NotFound()
NAME
    NotFound
SYNOPSIS
    NotFound()
DESCRIPTION
    This React component displays a "Page Not Found" message when a user navigates to a non-existent route. It provides a visual indicator (an error icon) and a message indicating that the requested page could not be found.

    The component includes a link to redirect users back to the home page, enhancing the user experience by providing an easy way to navigate away from the error page.

    The component uses Material UI for styling and layout. The `ErrorOutline` icon from Material UI is used to visually represent the error, and the `Typography` component is used to display text with various styles.

RETURNS
    Returns a React component that displays an error message and a link to the home page. The layout and styling are handled using CSS classes defined in the `NotFound.css` file.
*/

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;