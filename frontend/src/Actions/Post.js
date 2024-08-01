import axios from "axios";

/*
NAME
    likePost - Action to like a post

SYNOPSIS
    likePost(id)

DESCRIPTION
    This function dispatches an action to like a specific post.
    It sends a GET request to the /api/v1/like/post/:id endpoint.
    Depending on the response, it dispatches either likeSuccess or likeFailure.

PARAMETERS
    id - The ID of the post to like

RETURNS
    None
*/

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/api/v1/like/post/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    addCommentOnPost - Action to add a comment on a post

SYNOPSIS
    addCommentOnPost(id, comment)

DESCRIPTION
    This function dispatches an action to add a comment on a specific post.
    It sends a PUT request to the /api/v1/post/comment/:id endpoint with the comment data.
    Depending on the response, it dispatches either addCommentSuccess or addCommentFailure.

PARAMETERS
    id - The ID of the post to comment on
    comment - The comment text to add

RETURNS
    None
*/
export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    deleteCommentOnPost - Action to delete a comment on a post

SYNOPSIS
    deleteCommentOnPost(id, commentId)

DESCRIPTION
    This function dispatches an action to delete a specific comment on a post.
    It sends a DELETE request to the /api/v1/post/comment/:id endpoint with the comment ID.
    Depending on the response, it dispatches either deleteCommentSuccess or deleteCommentFailure.

PARAMETERS
    id - The ID of the post
    commentId - The ID of the comment to delete

RETURNS
    None
*/
export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};
/*
NAME
    createNewPost - Action to create a new post

SYNOPSIS
    createNewPost(caption, description, image, quantity, price)

DESCRIPTION
    This function dispatches an action to create a new post.
    It sends a POST request to the /api/v1/post/upload endpoint with the post data.
    Depending on the response, it dispatches either newPostSuccess or newPostFailure.

PARAMETERS
    caption - The caption of the post
    description - The description of the post
    image - The image URL of the post
    quantity - The quantity available
    price - The price of the item

RETURNS
    None
*/
export const createNewPost = (caption, description, image, quantity, price) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        description,
        image,
        quantity,
        price
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    updatePost - Action to update a post

SYNOPSIS
    updatePost(caption, description, quantity, price, id)

DESCRIPTION
    This function dispatches an action to update a specific post.
    It sends a PUT request to the /api/v1/post/:id endpoint with the updated post data.
    Depending on the response, it dispatches either updateCaptionSuccess or updateCaptionFailure.

PARAMETERS
    caption - The updated caption of the post
    description - The updated description of the post
    quantity - The updated quantity available
    price - The updated price of the item
    id - The ID of the post to update

RETURNS
    None
*/
export const updatePost = (caption, description, quantity, price, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      {
        caption,
        description,
        quantity,
        price
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};
/*
NAME
    deletePost - Action to delete a post

SYNOPSIS
    deletePost(id)

DESCRIPTION
    This function dispatches an action to delete a specific post.
    It sends a DELETE request to the /api/v1/post/:id endpoint.
    Depending on the response, it dispatches either deletePostSuccess or deletePostFailure.

PARAMETERS
    id - The ID of the post to delete

RETURNS
    None
*/ 
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};