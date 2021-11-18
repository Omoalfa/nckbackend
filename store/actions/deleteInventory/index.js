import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const deleteInventoryStart = () => ({
    type: 'DELET_INVENTORY_START',
})

const deleteInventoryFail = (payload) => ({
    type: 'DELET_INVENTORY_FAIL',
    payload
})

const deleteInventorySuccess = (payload) => ({
    type: 'DELET_INVENTORY_SUCCESS',
    payload
})

export const deleteInventoryCleanup = () => ({
    type: 'DELET_INVENTORY_CLEANUP'
})

export const deleteInventory = () => async dispatch => {
    dispatch(deleteInventoryStart())

    try {
        const reqBody = {
            path: 'users/me',
            method: 'GET',
        }
        const result = await AxiosCall(reqBody);

        dispatch(deleteInventorySuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(deleteInventoryFail(err))
    }
}