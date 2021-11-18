const {Router} = require('express')
const userControllers = require('../../../controllers/user')
const auth = require('../../../middleware/auth')

const route = Router()

route.post('/', userControllers.createUser)
route.post('/login', userControllers.login)
route.get('/me', auth.verifyToken, userControllers.getMe)

module.exports = route