import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

/*
NAME
    userReducer - Reducer for managing user authentication and profile state

SYNOPSIS
    userReducer(state, action)

DESCRIPTION
    This reducer manages the state related to user authentication, registration, loading user data, and logging out.
    It handles state updates for login, registration, loading user data, and logout operations.

PARAMETERS
    state - The current state related to user authentication and profile, defaulting to an empty object
    action - The action object containing a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    LoginRequest
        Sets the loading state to true when a login request is initiated.

    LoginSuccess
        Sets loading to false, updates the user data, and sets `isAuthenticated` to true upon a successful login.

    LoginFailure
        Sets loading to false, records an error message, and sets `isAuthenticated` to false if login fails.

    RegisterRequest
        Sets the loading state to true when a registration request is initiated.

    RegisterSuccess
        Sets loading to false, updates the user data, and sets `isAuthenticated` to true upon a successful registration.

    RegisterFailure
        Sets loading to false, records an error message, and sets `isAuthenticated` to false if registration fails.

    LoadUserRequest
        Sets the loading state to true when a request to load user data is initiated.

    LoadUserSuccess
        Sets loading to false, updates the user data, and sets `isAuthenticated` to true upon successful data retrieval.

    LoadUserFailure
        Sets loading to false, records an error message, and sets `isAuthenticated` to false if loading user data fails.

    LogoutUserRequest
        Sets the loading state to true when a logout request is initiated.

    LogoutUserSuccess
        Sets loading to false, clears the user data, and sets `isAuthenticated` to false upon successful logout.

    LogoutUserFailure
        Sets loading to false, records an error message, and keeps `isAuthenticated` as true if logout fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

/*
NAME
    postOfFollowingReducer - Reducer for managing posts from users that the current user follows

SYNOPSIS
    postOfFollowingReducer(state, action)

DESCRIPTION
    This reducer manages the state related to posts from users that the current user follows.
    It handles state updates for fetching these posts and managing loading states and errors.

PARAMETERS
    state - The current state related to posts from followed users, defaulting to an empty object
    action - The action object containing a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    postOfFollowingRequest
        Sets the loading state to true when a request to fetch posts from followed users is initiated.

    postOfFollowingSuccess
        Sets loading to false and updates the state with the fetched posts upon a successful request.

    postOfFollowingFailure
        Sets loading to false and records an error message if the request to fetch posts fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const postOfFollowingReducer = createReducer(initialState, {
  postOfFollowingRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

/*
NAME
    allUsersReducer - Reducer for managing the state related to fetching all users

SYNOPSIS
    allUsersReducer(state, action)

DESCRIPTION
    This reducer manages the state related to fetching the list of all users.
    It handles state updates for fetching the users list and managing loading states and errors.

PARAMETERS
    state - The current state related to the list of all users, defaulting to an empty object
    action - The action object containing a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    allUsersRequest
        Sets the loading state to true when a request to fetch all users is initiated.

    allUsersSuccess
        Sets loading to false and updates the state with the fetched users list upon a successful request.

    allUsersFailure
        Sets loading to false and records an error message if the request to fetch users fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

/*
NAME
    userProfileReducer - Reducer for managing the state related to a specific user's profile

SYNOPSIS
    userProfileReducer(state, action)

DESCRIPTION
    This reducer manages the state related to fetching and updating a specific user's profile.
    It handles state updates for fetching profile data and managing loading states and errors.

PARAMETERS
    state - The current state related to a specific user's profile, defaulting to an empty object
    action - The action object containing a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    userProfileRequest
        Sets the loading state to true when a request to fetch a specific user's profile is initiated.

    userProfileSuccess
        Sets loading to false and updates the state with the fetched user profile upon a successful request.

    userProfileFailure
        Sets loading to false and records an error message if the request to fetch the user profile fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true;
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

/*
NAME
    userSellerReducer - Reducer for managing the state related to creating or updating a seller profile

SYNOPSIS
    userSellerReducer(state, action)

DESCRIPTION
    This reducer handles the state for creating or updating a seller profile. It manages the loading state, updates the user profile on success, and handles errors.

PARAMETERS
    state - The current state related to the seller profile, defaulting to an empty object
    action - The action object containing a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    createSellerRequest
        Sets the loading state to true when a request to create or update a seller profile is initiated.

    createSellerSuccess
        Sets loading to false and updates the state with the new seller profile data upon a successful request.

    createSellerFailure
        Sets loading to false and records an error message if the request to create or update the seller profile fails.

    clearErrors
        Clears any existing error messages from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const userSellerReducer = createReducer(initialState, {
  createSellerRequest: (state) => {
    state.loading = true;
  },
  createSellerSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  createSellerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
})