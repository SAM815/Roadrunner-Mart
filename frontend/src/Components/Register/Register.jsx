import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const submitHandler =(e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password));
    }

    return (
        <div className="register">
            <form onSubmit={submitHandler} className="registerForm">
                <Typography variant="h3" style={{ padding: "2vmax" }}>
                    RoadRunner Mart
                </Typography>

                <input
                    type="text"
                    placeholder="name"
                    className="registerInputs"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    className="registerInputs"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="registerInputs"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/">
                    <Typography>Already Signed Up? Login Now</Typography>
                </Link>

                <Button  type="submit">
                    Sign Up
                </Button>

            </form>
        </div>
    )
}

export default Register
