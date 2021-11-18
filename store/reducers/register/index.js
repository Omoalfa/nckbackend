import { register as initialState } from '../../initialStates'

const register = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'REGISTER_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'REGISTER_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'REGISTER_SUCCESS': 
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

export default register;