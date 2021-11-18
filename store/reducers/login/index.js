import { login as initialState } from '../../initialStates';

const login = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'LOGIN_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'LOGIN_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'LOGIN_SUCCESS': 
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

export default login;