import { Typography, Button } from "@mui/material";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";



const UpdateProfile = () => {
  const {  user } = useSelector((state) => state.user);
 

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
 
  

  const dispatch = useDispatch();


  

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
  };

 
  return  (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          RoadrunnerMart
        </Typography>

        
        
        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button  type="submit">
          Update
        </Button>
      </form>
    </div>
  )
    
  
};

export default UpdateProfile;