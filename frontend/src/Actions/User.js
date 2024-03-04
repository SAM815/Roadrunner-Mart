import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });
        const { data } = await axios.post(
            "/api/v1/login",
            { email, password }, {
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
            payload: error,
        });
    }
}

export const loadUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoaduserRequest",

        });

        const { data } = await axios.get("/api/v1/me");
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error,
        })
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest",
        });
        const { data } = await axios.post(
            "/api/v1/register",
            { name, email, password }, {
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
}

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest"
        })
        const { data } = await axios.get(`/api/v1/user/${id}`);
        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        });
    }

}

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

}

export const deleteMyProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest",
        });

        const { data } = await axios.delete("/api/v1/delete/me");

        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteProfileFailure",
            payload: error.response.data.message,
        });
    }
}

export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        })

        const { data } = await axios.put(
            "/api/v1/update/profile",
            { name, email },
            {
                headers: {
                    "Content-Type": "application/json",

                },
            }
        );

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        });
    }
}