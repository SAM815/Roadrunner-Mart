import React, { useState } from 'react';
import { Button, Dialog, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, logoutUser } from "../../Actions/User";
import "./Account.css";

const Account = () => {
    const dispatch = useDispatch();
    const { user, loading: userLoading } = useSelector((state) => state.user);

    const logoutHandler = () => {
        dispatch(logoutUser());

    }
    const deleteProfileHandler =async () => {
        await dispatch(deleteMyProfile());
        dispatch(logoutUser());

    }
    return (
        <div className="account">
            <div className="accountleft">

                <Typography variant="h6">You have not made any post</Typography>

            </div>
            <div className="accountright">


                <Typography variant="h5">{user.name}</Typography>

                <div>
                    <button>
                        <Typography>Followers</Typography>
                    </button>

                </div>

                <div>
                    <button >
                        <Typography>Following</Typography>
                    </button>

                </div>

                <Button variant="contained" onClick={logoutHandler} >
                    Logout
                </Button>

                <Link to="/update/profile">Edit Profile</Link>
                <Link to="/update/password">Change Password</Link>

                <Button
                    variant="text"
                    style={{ color: "red", margin: "2vmax" }}
                    onClick = {deleteProfileHandler}
                >
                    Delete My Profile
                </Button>

            </div>
        </div>
    )
}

export default Account
