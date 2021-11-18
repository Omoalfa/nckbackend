import { combineReducers } from 'redux';
import inventories from './inventories'
import login from './login'
import register from './register'
import getMe from './getMe'
import inventory from './inventory'
import createInventory from './createInventory'
import deleteInventory from './deleteInventory'
import restockInventory from './restockInventory'

const rootReducer = combineReducers({
    inventories,
    login,
    register,
    getMe,
    inventory,
    createInventory,
    deleteInventory,
    restockInventory
});


export default rootReducer;