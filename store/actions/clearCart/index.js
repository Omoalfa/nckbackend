import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const clearCartStart = () => ({
    type: 'CLEAR_CART_START',
})

const clearCartFail = (payload) => ({
    type: 'CLEAR_CART_FAIL',
    payload
})

const clearCartSuccess = (payload) => ({
    type: 'CLEAR_CART_SUCCESS',
    payload
})

export const clearCartCleanup = () => ({
    type: 'CLEAR_CART_CLEANUP'
})

export const clearCart = (payload) => async dispatch => {
    dispatch(clearCartStart())

    try {
        const reqBody = {
            path: 'inventories/cart',
            method: 'DELETE',
        }
        const result = await AxiosCall(reqBody);

        dispatch(clearCartSuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(clearCartFail(err))
    }
}