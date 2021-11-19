import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const deleteInventoryStart = () => ({
    type: 'DELETE_INVENTORY_START',
})

const deleteInventoryFail = (payload) => ({
    type: 'DELETE_INVENTORY_FAIL',
    payload
})

const deleteInventorySuccess = (payload) => ({
    type: 'DELETE_INVENTORY_SUCCESS',
    payload
})

export const deleteInventoryCleanup = () => ({
    type: 'DELETE_INVENTORY_CLEANUP'
})

export const deleteInventory = (payload) => async dispatch => {
    dispatch(deleteInventoryStart())

    try {
        const reqBody = {
            path: 'inventories/' + payload,
            method: 'DELETE',
        }
        const result = await AxiosCall(reqBody);

        dispatch(deleteInventorySuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(deleteInventoryFail(err))
    }
}