import { restockInventory as initialState } from '../../initialStates'

const restockInventory = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'RESTOCK_INVENTORY_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'RESTOCK_INVENTORY_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'RESTOCK_INVENTORY_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false,
            }
        case 'RESTOCK_INVENTORY_SUCCESS': 
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

export default restockInventory;