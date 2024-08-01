import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/*
User()
NAME
    User
SYNOPSIS
    User({ userId, name, avatar })
DESCRIPTION
    A React component for displaying user information. Renders a user's avatar and name, and links to the user's profile page.

    Uses Material-UI's `Typography` for displaying text and standard HTML elements for layout. 

RETURNS
    A clickable link that navigates to the user's profile page, including the user's avatar and name.
*/

const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography>{name}</Typography>
    </Link>
  );
};

export default User;