import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const addToCartStart = () => ({
    type: 'ADD_CART_START',
})

const addToCartFail = (payload) => ({
    type: 'ADD_CART_FAIL',
    payload
})

const addToCartSuccess = (payload) => ({
    type: 'ADD_CART_SUCCESS',
    payload
})

export const addToCartCleanup = () => ({
    type: 'ADD_CART_CLEANUP'
})

export const addToCart = (payload) => async dispatch => {
    dispatch(addToCartStart())

    try {
        const reqBody = {
            path: 'inventories/cart',
            method: 'POST',
            data: payload
        }
        const result = await AxiosCall(reqBody);

        dispatch(addToCartSuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(addToCartFail(err))
    }
}