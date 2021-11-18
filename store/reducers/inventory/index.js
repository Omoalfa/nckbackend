import { inventory as initialState } from '../../initialStates'

const inventory = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_INVENTORY_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_INVENTORY_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'GET_INVENTORY_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'GET_INVENTORY_SUCCESS': 
            return {
                ...state,
                data: payload,
                isLoading: false,
                isSuccessful: true
            }
        default:
            return state;
    }
}

export default inventory;