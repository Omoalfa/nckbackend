import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const restockInventoryStart = () => ({
    type: 'RESTOCK_INVENTORY_START',
})

const restockInventoryFail = (payload) => ({
    type: 'RESTOCK_INVENTORY_FAIL',
    payload
})

const restockInventorySuccess = (payload) => ({
    type: 'RESTOCK_INVENTORY_SUCCESS',
    payload
})

export const restockInventoryCleanup = () => ({
    type: 'RESTOCK_INVENTORY_CLEANUP'
})

export const restockInventory = (payload) => async dispatch => {
    dispatch(restockInventoryStart())

    try {
        const reqBody = {
            path: 'inventories/restock/' + payload.restockId,
            method: 'PATCH',
            data: payload
        }
        const result = await AxiosCall(reqBody);

        dispatch(restockInventorySuccess(result.data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(restockInventoryFail(err))
    }
}