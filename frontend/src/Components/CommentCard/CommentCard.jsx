import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

/*
CommentCard()
NAME
    CommentCard
SYNOPSIS
    CommentCard({
      userId,
      name,
      avatar,
      comment,
      commentId,
      postId,
      isAccount
    })
DESCRIPTION
    This React component displays a comment on a post. It shows the commenter's avatar, name, and the content of the comment. The component includes a button to delete the comment, which is conditionally rendered based on whether the comment belongs to the account owner or the current user.

    The component uses Material UI's `Button` and `Typography` for styling and incorporates the `Delete` icon to represent the delete action. The `Link` component from `react-router-dom` is used to navigate to the commenter's profile when their avatar or name is clicked.

    The `deleteCommentHandle` function dispatches an action to delete the comment and subsequently refreshes the post list based on whether the comment is on the user's own account or following posts.

RETURNS
    Returns a React component that displays the commenter's details and the comment itself. Includes a conditional delete button based on user permissions.
*/

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;