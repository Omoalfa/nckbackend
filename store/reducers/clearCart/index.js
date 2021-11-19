import { clearCart as initialState } from '../../initialStates'

const clearCart = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CLEAR_CART_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'CLEAR_CART_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'CLEAR_CART_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'CLEAR_CART_SUCCESS': 
            return {
                ...state,
                data: payload,
                isLoading: false,
                isSuccessful: true,
            }
        default:
            return state;
    }
}

export default clearCart;