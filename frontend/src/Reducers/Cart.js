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