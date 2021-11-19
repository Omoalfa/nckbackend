const {Router} = require('express')
const auth = require('../../../middleware/auth')
const inventoryControllers = require('../../../controllers/inventory')

const route = Router()

route.post('/', auth.isAdmin, inventoryControllers.createInventory)
route.post('/cart', auth.verifyToken, inventoryControllers.addInventoryToCart)
route.delete('/cart', auth.verifyToken, inventoryControllers.deleteCart)
route.patch('/restock/:_id', auth.isAdmin, inventoryControllers.restockInventory)
route.get('/:_id', auth.verifyToken, inventoryControllers.readInventory)
route.get('/', auth.verifyToken, inventoryControllers.readInventories)
route.delete('/:_id', auth.isAdmin, inventoryControllers.deleteInventory)


module.exports = route