import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

/*
NAME
    likeReducer - Reducer for managing the state related to likes, comments, posts, profile updates, and authentication

SYNOPSIS
    likeReducer(state, action)

DESCRIPTION
    This reducer handles various state changes related to liking posts, adding and deleting comments,
    creating and deleting posts, and managing user profile updates, passwords, and authentication.
    It also provides functionality to clear errors and messages.

PARAMETERS
    state - The current state of the reducer, defaulting to initialState
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    likeRequest
        Sets the loading state to true when a like request is made.

    likeSuccess
        Sets loading to false and includes a success message when a like operation is successful.

    likeFailure
        Sets loading to false and includes an error message if the like operation fails.

    addCommentRequest
        Sets the loading state to true when a comment is being added.

    addCommentSuccess
        Sets loading to false and includes a success message when adding a comment succeeds.

    addCommentFailure
        Sets loading to false and includes an error message if adding a comment fails.

    deleteCommentRequest
        Sets the loading state to true when a comment is being deleted.

    deleteCommentSuccess
        Sets loading to false and includes a success message when deleting a comment succeeds.

    deleteCommentFailure
        Sets loading to false and includes an error message if deleting a comment fails.

    newPostRequest
        Sets the loading state to true when a new post request is made.

    newPostSuccess
        Sets loading to false and includes a success message when creating a new post succeeds.

    newPostFailure
        Sets loading to false and includes an error message if creating a new post fails.

    updateCaptionRequest
        Sets the loading state to true when updating a post caption.

    updateCaptionSuccess
        Sets loading to false and includes a success message when updating a caption succeeds.

    updateCaptionFailure
        Sets loading to false and includes an error message if updating a caption fails.

    deletePostRequest
        Sets the loading state to true when a post is being deleted.

    deletePostSuccess
        Sets loading to false and includes a success message when deleting a post succeeds.

    deletePostFailure
        Sets loading to false and includes an error message if deleting a post fails.

    updateProfileRequest
        Sets the loading state to true when a profile update request is made.

    updateProfileSuccess
        Sets loading to false and includes a success message when profile update succeeds.

    updateProfileFailure
        Sets loading to false and includes an error message if updating a profile fails.

    updatePasswordRequest
        Sets the loading state to true when a password update request is made.

    updatePasswordSuccess
        Sets loading to false and includes a success message when updating the password succeeds.

    updatePasswordFailure
        Sets loading to false and includes an error message if updating the password fails.

    deleteProfileRequest
        Sets the loading state to true when a profile deletion request is made.

    deleteProfileSuccess
        Sets loading to false and includes a success message when deleting a profile succeeds.

    deleteProfileFailure
        Sets loading to false and includes an error message if deleting a profile fails.

    forgotPasswordRequest
        Sets the loading state to true when a password reset request is made.

    forgotPasswordSuccess
        Sets loading to false and includes a success message when the password reset request succeeds.

    forgotPasswordFailure
        Sets loading to false and includes an error message if the password reset request fails.

    resetPasswordRequest
        Sets the loading state to true when resetting the password.

    resetPasswordSuccess
        Sets loading to false and includes a success message when resetting the password succeeds.

    resetPasswordFailure
        Sets loading to false and includes an error message if resetting the password fails.

    followUserRequest
        Sets the loading state to true when a user follow request is made.

    followUserSuccess
        Sets loading to false and includes a success message when the follow request succeeds.

    followUserFailure
        Sets loading to false and includes an error message if the follow request fails.

    clearErrors
        Clears any existing errors from the state.

    clearMessage
        Clears any existing messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/

export const likeReducer = createReducer(initialState, {
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  addCommentRequest: (state) => {
    state.loading = true;
  },
  addCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteCommentRequest: (state) => {
    state.loading = true;
  },
  deleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

/*
NAME
    myPostsReducer - Reducer for managing the state related to a user's posts

SYNOPSIS
    myPostsReducer(state, action)

DESCRIPTION
    This reducer manages the state of a user's posts. It handles state updates for fetching
    the user's posts and managing loading states and errors.

PARAMETERS
    state - The current state of the user's posts, defaulting to an empty object
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    myPostsRequest
        Sets the loading state to true when a request to fetch the user's posts is initiated.

    myPostsSuccess
        Sets loading to false and updates the state with the fetched posts upon a successful request.

    myPostsFailure
        Sets loading to false and includes an error message in the state if the request to fetch posts fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/

export const myPostsReducer = createReducer(initialState, {
  myPostsRequest: (state) => {
    state.loading = true;
  },
  myPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

/*
NAME
    userPostsReducer - Reducer for managing the state related to posts of a specific user

SYNOPSIS
    userPostsReducer(state, action)

DESCRIPTION
    This reducer manages the state of posts for a specific user. It updates the state based on
    actions related to fetching the posts, and handles loading states and errors.

PARAMETERS
    state - The current state of the user's posts, defaulting to an empty object
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    userPostsRequest
        Sets the loading state to true when a request to fetch a specific user's posts is initiated.

    userPostsSuccess
        Sets loading to false and updates the state with the fetched posts upon a successful request.

    userPostsFailure
        Sets loading to false and includes an error message in the state if the request to fetch posts fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/

export const userPostsReducer = createReducer(initialState, {
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});