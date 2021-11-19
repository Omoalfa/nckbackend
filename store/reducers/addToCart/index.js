import { addToCart as initialState } from '../../initialStates'

const addToCart = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_CART_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'ADD_CART_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'ADD_CART_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'ADD_CART_SUCCESS': 
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

export default addToCart;