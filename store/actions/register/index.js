import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const registerStart = () => ({
    type: 'REGISTER_START',
})

const registerFail = (payload) => ({
    type: 'REGISTER_FAIL',
    payload
})

const registerSuccess = (payload) => ({
    type: 'REGISTER_SUCCESS',
    payload
})

export const registerCleanup = () => ({
    type: 'REGISTER_CLEANUP'
})

export const register = (payload) => async dispatch => {
    dispatch(registerStart())

    try {
        const reqBody = {
            path: 'auth',
            method: 'POST',
            data: payload
        }
        const result = await AxiosCall(reqBody);

        dispatch(registerSuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(registerFail(err))
    }
}