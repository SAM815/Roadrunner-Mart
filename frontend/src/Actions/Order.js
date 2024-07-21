import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        console.log("The order is: ", order);
        console.log('Dispatching CREATE_ORDER_REQUEST');
        dispatch({
            type: "CREATE_ORDER_REQUEST",
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        console.log('Sending request to /api/v1/order/new with order:', order);
        const { data } = await axios.post("/api/v1/order/new", order, config);

        console.log(data);

       
        dispatch({
            type: "CREATE_ORDER_SUCCESS", payload: data
        });
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        dispatch({
            type: "CREATE_ORDER_FAIL",
            payload: error.response ? error.response.data.error : error.message,
        });
    }
};


export const myOrders = () => async (dispatch) => {
    try {
        dispatch({
            type:"MY_ORDER_REQUEST",
        })

        const {data} = await axios.get("/api/v1/orders/me");

        dispatch({
            type:"MY_ORDER_SUCCESS", payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:"MY_ORDER_FAIL",
            payload:error.response.data.error,
        })
    }
}



export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type:"ORDER_DETAIL_REQUEST",
        })
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({
            type:"ORDER_DETAIL_SUCCESS", payload:data.order
        })
        console.log("Yeta")
    } catch (error) {
        dispatch({
            type:"ORDER_DETAIL_FAIL",
            payload:error.response.data.error,
        })
    }
}



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:"CLEAR_ERRORS"
    })
}



//Get all order -admin
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type:"ALL_ORDER_REQUEST",
        })

        const {data} = await axios.get("/api/v1/admin/orders");

        dispatch({
            type:"ALL_ORDER_SUCCESS", payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:"ALL_ORDER_FAIL",
            payload:error.response.data.error,
        })
    }
}

//Update an order - admin
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({
            type:"UPDATE_ORDER_REQUEST",
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };

        const {data} = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({
            type:"UPDATE_ORDER_SUCCESS", payload:data.success
        })
    } catch (error) {
        dispatch({
            type:"UPDATE_ORDER_FAIL",
            payload:error.response.data.error,
        })
    }
}

//Delete an order -admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type:"DELETE_ORDER_REQUEST",
        })

       

        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type:"DELETE_ORDER_SUCCESS", payload:data.success
        })
    } catch (error) {
        dispatch({
            type:"DELETE_ORDER_FAIL",
            payload:error.response.data.error,
        })
    }
}