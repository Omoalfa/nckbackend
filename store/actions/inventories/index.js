import AxiosCall from '../../../utils/axios'
import ErrorHandler from '../../../utils/error'

const getInventoriesStart = () => ({
    type: 'GET_INVENTORIES_START',
})

const getInventoriesFail = (payload) => ({
    type: 'GET_INVENTORIES_FAIL',
    payload
})

const getInventoriesSuccess = (payload) => ({
    type: 'GET_INVENTORIES_SUCCESS',
    payload
})

export const getInventoriesCleanup = () => ({
    type: 'GET_INVENTORIES_CLEANUP'
})

export const getInventories = (payload) => async dispatch => {
    dispatch(getInventoriesStart())

    try {
        const reqBody = {
            path: `inventories`,
            method: 'GET',
        }
        const {data} = await AxiosCall(reqBody);

        dispatch(getInventoriesSuccess(data))
    } catch (error) {
        const err = ErrorHandler(error)
        dispatch(getInventoriesFail(err))
    }
}