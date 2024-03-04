import React from 'react';
import "./Home.css";
import User from '../User/User';


const Home = () => {
    return (
        <div className="home">
            <div className="homeleft">
                <h1>Will work on this later</h1>
            </div>
            <div className="homeright">
                <User
                    userId={"user._id"}
                    name={"Samman"}
                    avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
                />
            </div>
        </div>
    )
}

export default Home
