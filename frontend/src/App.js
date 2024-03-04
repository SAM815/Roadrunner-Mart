import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Account from "./Components/Account/Account";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [])
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />

          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Login />} />

          <Route
            path="/register"
            element={isAuthenticated ? <Account /> : <Register/>} />

            <Route
            path = "/update/profile"
            element = {isAuthenticated ? <UpdateProfile/> : <Login/>}
            />
        </Routes>


      </Router>
    </div>
  );
}
export default App;