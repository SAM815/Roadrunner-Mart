/*
index.js
NAME
    index.js
SYNOPSIS
    Entry point for the application, responsible for rendering the root component and setting up the Redux store.
DESCRIPTION
    This file initializes the application, including rendering the root component, providing access to the Redux store, and injecting CSS styles with Material-UI's StyledEngineProvider.
PARAMETERS
    None.
RETURNS
    Initializes and renders the application's root component.
*/


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);