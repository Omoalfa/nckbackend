import { deleteInventory as initialState } from '../../initialStates'

const deleteInventory = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'DELETE_INVENTORY_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'DELETE_INVENTORY_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'DELETE_INVENTORY_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'DELETE_INVENTORY_SUCCESS': 
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

export default deleteInventory;