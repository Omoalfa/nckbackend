import { getMe as initialState } from '../../initialStates'

const getMe = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_ME_START': 
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_ME_FAIL':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case 'GET_ME_CLEANUP':
            return {
                ...state,
                data: null,
                error: null,
                isSuccessful: false
            }
        case 'GET_ME_SUCCESS': 
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

export default getMe;