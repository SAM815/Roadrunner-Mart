/*
NAME
    cartReducer - Reducer function for managing cart state

SYNOPSIS
    cartReducer(state, action)

DESCRIPTION
    This function handles state updates related to the shopping cart.
    It takes the current state and an action as arguments and returns the updated state based on the action type.
    The initial state includes an empty cartItems array and an empty shippingInfo object.

PARAMETERS
    state - The current state of the cart, defaulting to { cartItems: [], shippingInfo: {} }
    action - The action object that contains a type and optional payload to determine how to update the state

RETURNS
    The updated state of the cart based on the action type

ACTION TYPES
    ADD_TO_CART
        Adds an item to the cart. If the item already exists in the cart, it updates the existing item.
    
    REMOVE_FROM_CART
        Removes an item from the cart based on the item's post ID.
    
    SAVE_SHIPPING_INFO
        Updates the shipping information in the state with the provided payload.

DEFAULT
    Returns the current state if the action type does not match any of the defined cases.
*/

export const cartReducer = (state = {cartItems:[], shippingInfo:{}}, action)=>{
    switch(action.type)
    {

        case "ADD_TO_CART":
            const item = action.payload;

            const doesItemExist = state.cartItems.find(
            (i)=>i.post ===item.post
            );

            if (doesItemExist){
                return {
                    ...state,
                    cartItems:state.cartItems.map((i)=>{
                        return i.post === doesItemExist.post ? item:i
                    }),
                }

            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item],
                }
            } 
        
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems:state.cartItems.filter((i)=>i.post!== action.payload),
            }

        case "SAVE_SHIPPING_INFO":
            return {
                ...state,
                shippingInfo:action.payload,
            }
        default:
            return state;

      
    }
}