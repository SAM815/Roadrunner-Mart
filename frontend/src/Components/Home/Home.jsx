import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts, getUserPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

/*
Home()
NAME
    Home
SYNOPSIS
    Home()
DESCRIPTION
    This React component is the main page of the application, displaying posts from followed users on the left side and a list of users on the right side. It fetches posts and user data from the Redux store and handles loading and error states.

    The component uses Material UI for typography and integrates `react-alert` for displaying notifications. It conditionally renders a loader when data is being fetched and displays posts and users once the data is available.

    The `useEffect` hooks are used to fetch data and handle errors or messages. If there are any errors, they are displayed using alerts. 

RETURNS
    Returns a React component that displays a list of posts and users. If data is still loading, a `Loader` component is shown. If no posts or users are available, appropriate messages are displayed.
*/


const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);



  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              description = {post.description}
              quantity = {post.quantity}
              price = {post.price}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
        
      </div>
      
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
             
              
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;