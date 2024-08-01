import axios from "axios";

/*
NAME
    loginUser - Action to log in a user

SYNOPSIS
    loginUser(email, password)

DESCRIPTION
    This function dispatches an action to log in a user.
    It sends a POST request to the /api/v1/login endpoint with the user's email and password.
    Depending on the response, it dispatches either LoginSuccess or LoginFailure.

PARAMETERS
    email - The email of the user
    password - The password of the user

RETURNS
    None
*/
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    loadUser - Action to load the current user's data

SYNOPSIS
    loadUser()

DESCRIPTION
    This function dispatches an action to load the current user's data.
    It sends a GET request to the /api/v1/me endpoint.
    Depending on the response, it dispatches either LoadUserSuccess or LoadUserFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    getFollowingPosts - Action to get posts from followed users

SYNOPSIS
    getFollowingPosts()

DESCRIPTION
    This function dispatches an action to get posts from users that the current user is following.
    It sends a GET request to the /api/v1/posts endpoint.
    Depending on the response, it dispatches either postOfFollowingSuccess or postOfFollowingFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    getMyPosts - Action to get the current user's posts

SYNOPSIS
    getMyPosts()

DESCRIPTION
    This function dispatches an action to get the posts made by the current user.
    It sends a GET request to the /api/v1/my/posts endpoint.
    Depending on the response, it dispatches either myPostsSuccess or myPostsFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get("/api/v1/my/posts");
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    getAllUsers - Action to get all users

SYNOPSIS
    getAllUsers(name)

DESCRIPTION
    This function dispatches an action to get all users.
    It sends a GET request to the /api/v1/users endpoint with an optional query parameter for filtering users by name.
    Depending on the response, it dispatches either allUsersSuccess or allUsersFailure.

PARAMETERS
    name - (Optional) The name to filter users by

RETURNS
    None
*/
export const getAllUsers =
  (name = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: "allUsersRequest",
        });

        const { data } = await axios.get(`/api/v1/users?name=${name}`);
        dispatch({
          type: "allUsersSuccess",
          payload: data.users,
        });
      } catch (error) {
        dispatch({
          type: "allUsersFailure",
          payload: error.response.data.message,
        });
      }
    };

    /*
NAME
    logoutUser - Action to log out the current user

SYNOPSIS
    logoutUser()

DESCRIPTION
    This function dispatches an action to log out the current user.
    It sends a GET request to the /api/v1/logout endpoint.
    Depending on the response, it dispatches either LogoutUserSuccess or LogoutUserFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    registerUser - Action to register a new user

SYNOPSIS
    registerUser(name, email, password, avatar)

DESCRIPTION
    This function dispatches an action to register a new user.
    It sends a POST request to the /api/v1/register endpoint with the user's registration data.
    Depending on the response, it dispatches either RegisterSuccess or RegisterFailure.

PARAMETERS
    name - The name of the user
    email - The email of the user
    password - The password of the user
    avatar - (Optional) The avatar URL of the user

RETURNS
    None
*/
export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

  /*
NAME
    updateProfile - Action to update the user's profile

SYNOPSIS
    updateProfile(name, email, avatar)

DESCRIPTION
    This function dispatches an action to update the current user's profile.
    It sends a PUT request to the /api/v1/update/profile endpoint with the updated profile data.
    Depending on the response, it dispatches either updateProfileSuccess or updateProfileFailure.

PARAMETERS
    name - The updated name of the user
    email - The updated email of the user
    avatar - (Optional) The updated avatar URL of the user

RETURNS
    None
*/
export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    updatePassword - Action to update the user's password

SYNOPSIS
    updatePassword(oldPassword, newPassword)

DESCRIPTION
    This function dispatches an action to update the current user's password.
    It sends a PUT request to the /api/v1/update/password endpoint with the old and new passwords.
    Depending on the response, it dispatches either updatePasswordSuccess or updatePasswordFailure.

PARAMETERS
    oldPassword - The current password of the user
    newPassword - The new password to set

RETURNS
    None
*/
export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

  /*
NAME
    deleteMyProfile - Action to delete the current user's profile

SYNOPSIS
    deleteMyProfile()

DESCRIPTION
    This function dispatches an action to delete the current user's profile.
    It sends a DELETE request to the /api/v1/delete/me endpoint.
    Depending on the response, it dispatches either deleteProfileSuccess or deleteProfileFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete("/api/v1/delete/me");

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    forgotPassword - Action to initiate a password reset process

SYNOPSIS
    forgotPassword(email)

DESCRIPTION
    This function dispatches an action to initiate the password reset process.
    It sends a POST request to the /api/v1/forgot/password endpoint with the user's email.
    Depending on the response, it dispatches either forgotPasswordSuccess or forgotPasswordFailure.

PARAMETERS
    email - The email of the user requesting a password reset

RETURNS
    None
*/
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    resetPassword - Action to reset the user's password

SYNOPSIS
    resetPassword(token, password)

DESCRIPTION
    This function dispatches an action to reset the user's password.
    It sends a POST request to the /api/v1/password/reset/{token} endpoint with the new password and reset token.
    Depending on the response, it dispatches either resetPasswordSuccess or resetPasswordFailure.

PARAMETERS
    token - The password reset token
    password - The new password to set

RETURNS
    None
*/
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    getUserPosts - Action to get posts from a specific user

SYNOPSIS
    getUserPosts(id)

DESCRIPTION
    This function dispatches an action to get posts made by a specific user.
    It sends a GET request to the /api/v1/userposts/{id} endpoint with the user's ID.
    Depending on the response, it dispatches either userPostsSuccess or userPostsFailure.

PARAMETERS
    id - The ID of the user whose posts are to be retrieved

RETURNS
    None
*/
export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    getUserProfile - Action to get a specific user's profile

SYNOPSIS
    getUserProfile(id)

DESCRIPTION
    This function dispatches an action to get the profile information of a specific user.
    It sends a GET request to the /api/v1/user/{id} endpoint with the user's ID.
    Depending on the response, it dispatches either userProfileSuccess or userProfileFailure.

PARAMETERS
    id - The ID of the user whose profile is to be retrieved

RETURNS
    None
*/
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    followAndUnfollowUser - Action to follow or unfollow a user

SYNOPSIS
    followAndUnfollowUser(id)

DESCRIPTION
    This function dispatches an action to follow or unfollow a user.
    It sends a GET request to the /api/v1/follow/{id} endpoint with the user's ID.
    Depending on the response, it dispatches either followUserSuccess or followUserFailure.

PARAMETERS
    id - The ID of the user to follow or unfollow

RETURNS
    None
*/
export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};

/*
NAME
    userSellerAction - Action to enable a user as a seller

SYNOPSIS
    userSellerAction()

DESCRIPTION
    This function dispatches an action to enable the current user as a seller.
    It sends a GET request to the /api/v1/enableuser endpoint.
    Depending on the response, it dispatches either createSellerSuccess or createSellerFailure.

PARAMETERS
    None

RETURNS
    None
*/
export const userSellerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "createSellerRequest",
    });

    const { data } = await axios.get("/api/v1/enableuser");
    dispatch({
      type: "createSellerSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "createSellerFailure",
      payload: error.response.data.message
    });
  }
}