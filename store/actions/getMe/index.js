import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const getMeStart = () => ({
    type: 'GET_ME_START',
})

const getMeFail = (payload) => ({
    type: 'GET_ME_FAIL',
    payload
})

const getMeSuccess = (payload) => ({
    type: 'GET_ME_SUCCESS',
    payload
})

export const getMeCleanup = () => ({
    type: 'GET_ME_CLEANUP'
})

export const getMe = () => async dispatch => {
    dispatch(getMeStart())

    try {
        const reqBody = {
            path: 'auth/me',
            method: 'GET',
        }
        const result = await AxiosCall(reqBody);

        console.log(result)

        dispatch(getMeSuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(getMeFail(err))
    }
}