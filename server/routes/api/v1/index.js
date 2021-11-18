const {Router} = require('express')
const userRoutes = require('./user')
const inventoryRoutes = require('./inventory')

const route = Router()

route.use('/auth', userRoutes)
route.use('/inventories', inventoryRoutes)


module.exports = route