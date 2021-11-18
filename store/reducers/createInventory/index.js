import { createInventory as initialState } from '../../initialStates'

const createInventory = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CREATE_INVENTORY_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'CREATE_INVENTORY_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'CREATE_INVENTORY_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false,
            }
        case 'CREATE_INVENTORY_SUCCESS': 
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

export default createInventory;