import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const loginStart = () => ({
    type: 'LOGIN_START',
})

const loginFail = (payload) => ({
    type: 'LOGIN_FAIL',
    payload
})

const loginSuccess = (payload) => ({
    type: 'LOGIN_SUCCESS',
    payload
})

export const loginCleanup = () => ({
    type: 'LOGIN_CLEANUP'
})

export const login = payload => async dispatch => {
    dispatch(loginStart())

    try {
        const reqBody = {
            path: 'auth/login',
            method: 'POST',
            data: payload
        }
        const result = await AxiosCall(reqBody);
        const { token } = result.data
        localStorage.setItem('authToken', token)
        dispatch(loginSuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(loginFail(err))
    }
}