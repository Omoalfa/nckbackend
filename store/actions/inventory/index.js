import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const getInventoryStart = () => ({
    type: 'GET_INVENTORY_START',
})

const getInventoryFail = (payload) => ({
    type: 'GET_INVENTORY_FAIL',
    payload
})

const getInventorySuccess = (payload) => ({
    type: 'GET_INVENTORY_SUCCESS',
    payload
})

export const getInventoryCleanup = () => ({
    type: 'GET_INVENTORY_CLEANUP'
})

export const getInventory = (payload) => async dispatch => {
    dispatch(getInventoryStart())

    try {
        const reqBody = {
            path: 'inventories/' + payload,
            method: 'GET',
        }
        const result = await AxiosCall(reqBody);

        dispatch(getInventorySuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(getInventoryFail(err))
    }
}