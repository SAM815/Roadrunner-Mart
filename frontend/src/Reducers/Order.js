/*
NAME
    newOrderReducer - Reducer for managing the state of creating a new order

SYNOPSIS
    newOrderReducer(state, action)

DESCRIPTION
    This reducer handles the state related to the creation of a new order.
    It updates the state based on the action type and payload, managing loading states and errors.

PARAMETERS
    state - The current state of the new order process, defaulting to an empty object
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    CREATE_ORDER_REQUEST
        Sets the loading state to true when the order creation process starts.

    CREATE_ORDER_SUCCESS
        Updates the state with the newly created order and sets loading to false upon success.

    CREATE_ORDER_FAIL
        Sets loading to false and includes the error message if the order creation fails.

    CLEAR_ERRORS
        Clears any existing errors from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const newOrderReducer = (state = {}, action)=>{
    switch(action.type){
        case "CREATE_ORDER_REQUEST":
            return {
                ...state,
                isLoading:true,
            }
        
        case "CREATE_ORDER_SUCCESS":
            return {
                isLoading:false,
                order:action.payload,
            }

        case "CREATE_ORDER_FAIL":
            return {
                isLoading:false,
                error:action.payload,
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}

/*
NAME
    myOrdersReducer - Reducer for managing the state of a user's orders

SYNOPSIS
    myOrdersReducer(state, action)

DESCRIPTION
    This reducer handles the state related to fetching a user's orders.
    It updates the state based on the action type and payload, managing loading states and errors.

PARAMETERS
    state - The current state of the user's orders, defaulting to { orders: [] }
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    MY_ORDER_REQUEST
        Sets the loading state to true when fetching the user's orders.

    MY_ORDER_SUCCESS
        Updates the state with the fetched orders and sets loading to false upon success.

    MY_ORDER_FAIL
        Sets loading to false and includes the error message if fetching the user's orders fails.

    CLEAR_ERRORS
        Clears any existing errors from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const myOrdersReducer = (state = {orders:[]}, action)=>{
    switch(action.type){
        case "MY_ORDER_REQUEST":
            return {
                isLoading:true,
            }
        
        case "MY_ORDER_SUCCESS":
            return {
                isLoading:false,
                order:action.payload,
            }

        case "MY_ORDER_FAIL":
            return {
                isLoading:false,
                error:action.payload,
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}
/*
NAME
    orderDetailsReducer - Reducer for managing the state of order details

SYNOPSIS
    orderDetailsReducer(state, action)

DESCRIPTION
    This reducer handles the state related to fetching details of a specific order.
    It updates the state based on the action type and payload, managing loading states and errors.

PARAMETERS
    state - The current state of the order details, defaulting to { order: {} }
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    ORDER_DETAIL_REQUEST
        Sets the loading state to true when fetching the order details.

    ORDER_DETAIL_SUCCESS
        Updates the state with the fetched order details and sets loading to false upon success.

    ORDER_DETAIL_FAIL
        Sets loading to false and includes the error message if fetching the order details fails.

    CLEAR_ERRORS
        Clears any existing errors from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const orderDetailsReducer = (state = {order:{}}, action)=>{
    switch(action.type){
        case "ORDER_DETAIL_REQUEST":
            return {
                isLoading:true,
            }
        
        case "ORDER_DETAIL_SUCCESS":
            return {
                isLoading:false,
                order:action.payload,
            }

        case "ORDER_DETAIL_FAIL":
            return {
                isLoading:false,
                error:action.payload,
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}

/*
NAME
    allOrdersReducer - Reducer for managing the state of all orders (admin view)

SYNOPSIS
    allOrdersReducer(state, action)

DESCRIPTION
    This reducer handles the state related to fetching all orders for admin purposes.
    It updates the state based on the action type and payload, managing loading states and errors.

PARAMETERS
    state - The current state of all orders, defaulting to { orders: [] }
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    ALL_ORDER_REQUEST
        Sets the loading state to true when fetching all orders.

    ALL_ORDER_SUCCESS
        Updates the state with the fetched orders and sets loading to false upon success.

    ALL_ORDER_FAIL
        Sets loading to false and includes the error message if fetching all orders fails.

    CLEAR_ERRORS
        Clears any existing errors from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const allOrdersReducer= (state = {orders:[]}, action)=>{
    switch(action.type){
        case "ALL_ORDER_REQUEST":
            return {
                isLoading:true,
            }
        case "ALL_ORDER_SUCCESS":
            return {
                isLoading:false,
                orders:action.payload,
            }

        case "ALL_ORDER_FAIL":
            return{
                isLoading:false,
                error:action.payload,
            }
        case "CLEAR_ERRORS":
            return{
                ...state,
                error:null,
            }

        default:
            return state;
    }

}
/*
NAME
    ordersReducer - Reducer for managing state related to order updates and deletions (admin actions)

SYNOPSIS
    ordersReducer(state, action)

DESCRIPTION
    This reducer handles state updates related to order updates and deletions by an admin.
    It manages loading states, success flags, and errors based on the action type and payload.

PARAMETERS
    state - The current state of order updates and deletions, defaulting to { orders: [] }
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state based on the action type

ACTION TYPES
    UPDATE_ORDER_REQUEST
    DELETE_ORDER_REQUEST
        Sets the loading state to true when an order update or deletion request is made.

    UPDATE_ORDER_SUCCESS
        Updates the state with the success message of the order update and sets loading to false.

    DELETE_ORDER_SUCCESS
        Updates the state with the success message of the order deletion and sets loading to false.

    UPDATE_ORDER_RESET
        Resets the `isUpdated` flag to false after an order update operation.

    DELETE_ORDER_RESET
        Resets the `isDeleted` flag to false after an order deletion operation.

    UPDATE_ORDER_FAIL
    DELETE_ORDER_FAIL
        Sets loading to false and includes the error message if the order update or deletion fails.

    CLEAR_ERRORS
        Clears any existing errors from the state.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/
export const ordersReducer= (state = {orders:[]}, action)=>{
    switch(action.type){
        case "UPDATE_ORDER_REQUEST":
        case "DELETE_ORDER_REQUEST":
            return {
                ...state,
                isLoading:true,
            }
        case "UPDATE_ORDER_SUCCESS":
            return {
                ...state,
                isLoading:false,
                isUpdated:action.payload
            }
        case "DELETE_ORDER_SUCCESS":
            return {
                ...state,
                isLoading:false,
                isDeleted:action.payload
            }
        case "UPDATE_ORDER_RESET":

            return{
                ...state,
                isUpdated:false,
            }

        case "DELETE_ORDER_RESET":

            return{
                ...state,
                isDeleted:false,
            }

        case "UPDATE_ORDER_FAIL":
        case "DELETE_ORDER_FAIL":
            return{
                ...state,
                isLoading:false,
                error:action.payload,
            }
        case "CLEAR_ERRORS":
            return{
                ...state,
                error:null,
            }

        default:
            return state;
    }

}