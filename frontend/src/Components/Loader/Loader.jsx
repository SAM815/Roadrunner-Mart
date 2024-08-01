import React from "react";
import "./Loader.css";

/*
Loader()
NAME
    Loader
SYNOPSIS
    Loader()
DESCRIPTION
    This React component provides a loading spinner or animation to indicate that content is being fetched or processed. It is typically used to display a visual cue when data is being loaded or when an operation is in progress.

    The component uses CSS for styling and animation, making the loading indicator visually appealing and user-friendly.

RETURNS
    Returns a React component that displays a loading spinner or animation to inform users that content is being loaded.
*/


const Loader = () => {
  return (
    <div className="loadingPage">
      <div className="loadingCircle"></div>
    </div>
  );
};

export default Loader;