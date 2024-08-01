 import axios from "axios"

 /*
NAME
    createOrder - Action to create a new order

SYNOPSIS
    createOrder(order)

DESCRIPTION
    This function dispatches an action to create a new order.
    It sends a POST request to the /api/v1/order/new endpoint with the order data.
    Depending on the response, it dispatches either CREATE_ORDER_SUCCESS or CREATE_ORDER_FAIL.

PARAMETERS
    order - The order details to be created

RETURNS
    None
*/

export const createOrder = (order) => async (dispatch) => {
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

/*
NAME
    myOrders - Action to fetch user's orders

SYNOPSIS
    myOrders()

DESCRIPTION
    This function dispatches an action to fetch the current user's orders.
    It sends a GET request to the /api/v1/orders/me endpoint.
    Depending on the response, it dispatches either MY_ORDER_SUCCESS or MY_ORDER_FAIL.

PARAMETERS
    None

RETURNS
    None
*/
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

/*
NAME
    getOrderDetails - Action to fetch details of a specific order

SYNOPSIS
    getOrderDetails(id)

DESCRIPTION
    This function dispatches an action to fetch the details of a specific order.
    It sends a GET request to the /api/v1/orders/:id endpoint.
    Depending on the response, it dispatches either ORDER_DETAIL_SUCCESS or ORDER_DETAIL_FAIL.

PARAMETERS
    id - The ID of the order to fetch details for

RETURNS
    None
*/

export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type:"ORDER_DETAIL_REQUEST",
        })
        const {data} = await axios.get(`/api/v1/orders/${id}`);
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


/*
NAME
    clearErrors - Action to clear errors

SYNOPSIS
    clearErrors()

DESCRIPTION
    This function dispatches an action to clear any errors in the state.

PARAMETERS
    None

RETURNS
    None
*/

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:"CLEAR_ERRORS"
    })
}



/*
NAME
    getAllOrders - Action to fetch all orders (admin only)

SYNOPSIS
    getAllOrders()

DESCRIPTION
    This function dispatches an action to fetch all orders. (admin only)
    It sends a GET request to the /api/v1/admin/orders endpoint.
    Depending on the response, it dispatches either ALL_ORDER_SUCCESS or ALL_ORDER_FAIL.

PARAMETERS
    None

RETURNS
    None
*/
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

/*
NAME
    updateOrder - Action to update an order (admin only)

SYNOPSIS
    updateOrder(id, order)

DESCRIPTION
    This function dispatches an action to update an order. (admin only)
    It sends a PUT request to the /api/v1/admin/order/:id endpoint with the updated order data.
    Depending on the response, it dispatches either UPDATE_ORDER_SUCCESS or UPDATE_ORDER_FAIL.

PARAMETERS
    id - The ID of the order to update
    order - The updated order details

RETURNS
    None
*/
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

/*
NAME
    deleteOrder - Action to delete an order (admin only)

SYNOPSIS
    deleteOrder(id)

DESCRIPTION
    This function dispatches an action to delete an order. (admin only)
    It sends a DELETE request to the /api/v1/admin/order/:id endpoint.
    Depending on the response, it dispatches either DELETE_ORDER_SUCCESS or DELETE_ORDER_FAIL.

PARAMETERS
    id - The ID of the order to delete

RETURNS
    None
*/
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