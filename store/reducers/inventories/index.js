import { inventories as initialState } from '../../initialStates'

const inventories = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_INVENTORIES_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_INVENTORIES_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'GET_INVENTORIES_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false,
            }
        case 'GET_INVENTORIES_SUCCESS': 
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

export default inventories;