import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";
import "./NewPost.css";
/*
NewPost()
NAME
    NewPost
SYNOPSIS
    NewPost()
DESCRIPTION
    This React component provides a form for users to create and submit a new post. It includes fields for uploading an image, entering a caption, description, quantity, and price. The component uses Material UI for styling and layout, and integrates with Redux for state management and dispatching actions.

    The `handleImageChange` function handles image file input, reads the selected file using `FileReader`, and updates the state with the image data URL. The `submitHandler` function is triggered upon form submission, dispatching the `createNewPost` action with the form data and subsequently loading the user data by dispatching `loadUser`.

    The `useEffect` hook manages side effects related to error and message notifications. It listens for changes in the `error` and `message` state from Redux, and uses the `react-alert` library to display appropriate alerts. It also clears these states after displaying the alerts.

RETURNS
    Returns a React component that renders a form for creating a new post, allowing users to upload an image, provide a caption, description, quantity, and price. The form submission triggers actions to create the post and update the user data.
*/
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState();
  const [price, setPrice] = useState();

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, description,image, quantity, price));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity of products"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          
        />
        <input
          type="number"
          placeholder="Price per product"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;