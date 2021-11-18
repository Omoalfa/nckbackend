import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const createInventoryStart = () => ({
    type: 'CREATE_INVENTORY_START',
})

const createInventoryFail = (payload) => ({
    type: 'CREATE_INVENTORY_FAIL',
    payload
})

const createInventorySuccess = (payload) => ({
    type: 'CREATE_INVENTORY_SUCCESS',
    payload
})

export const createInventoryCleanup = () => ({
    type: 'CREATE_INVENTORY_CLEANUP'
})

export const createInventory = (payload) => async dispatch => {
    dispatch(createInventoryStart())

    try {
        const reqBody = {
            path: 'inventories',
            method: 'POST',
            data: payload
        }
        const result = await AxiosCall(reqBody);

        dispatch(createInventorySuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(createInventoryFail(err))
    }
}