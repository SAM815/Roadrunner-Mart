import { Avatar, Button, Typography, Dialog  } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
  
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";

import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItemsToCart } from "../../Actions/Cart";
import { useAlert } from "react-alert";

/*
Post()
NAME
    Post
SYNOPSIS
    Post({
      postId,
      caption,
      description,
      quantity,
      price,
      postImage,
      likes,
      comments,
      ownerImage,
      ownerName,
      ownerId,
      isDelete,
      isAccount
    })
DESCRIPTION
    A React component for displaying a single post with image, details, likes, and comments. It allows interactions such as liking, commenting, updating, deleting, and adding items to a cart.

    Uses local state for managing interactions and Material-UI `Dialog` for modals.

RETURNS
    A React component with post details, interaction buttons, and modals. Provides feedback through alerts and manages user interactions based on permissions.
*/

const Post = ({
  postId,
  caption,
  description,
  quantity,
  price,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,

  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [priceValue, setPriceValue] = useState(price);

  console.log(
    description, quantity, price);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  
  

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, descriptionValue, quantityValue, priceValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const [amount, setAmount] = useState(1);

  const increaseQuantity = () => {
    console.log("increase wuantity"); 

    if (amount >= quantity)
      return
    const qty = amount + 1;
    setAmount(qty);

  }

  const decreaseQuantity = () => {

    if (1>= amount)
      return
    const qty = amount-1;
    setAmount(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(postId, amount));
    alert.success("Items Added to cart");
  }


  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
        {/* Displaying the description */}
        <div className="productDetails">
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Description: {description}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Quantity: {quantity}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Price: {price}
          </Typography>


        </div>




      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        
          <>
            <button className="postFooterbutton" onClick={decreaseQuantity}>-</button>
            <input readOnly className="postFooterinput" type="number" value={amount} />
            <button className="postFooterbutton" onClick={increaseQuantity}>+</button>
            {!isAccount && (
              <Button onClick={addToCartHandler} disabled={quantity < 1}>
                <AddShoppingCartIcon />
              </Button>
            )}
          </>
        
{/* disabled = {post.quantity < 1 ? true: false} */}


        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            <textarea
              type="text"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              placeholder="Update description..."
              required
            />
            <input
              type="number"
              value={quantityValue}
              onChange={(e) => setQuantityValue(Number(e.target.value))}
              placeholder="Update quantity..."
              required
            />
            <input
              type="number"
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
              placeholder="Update price..."
              required
            />
            <Button type="submit" variant="contained">
              Update Details
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;