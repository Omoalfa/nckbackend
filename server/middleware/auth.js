const jwt = require('jsonwebtoken');
const Users = require('../models/User');

require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const auth = req.headers.authorization
    let token


    if (auth && auth.startsWith('Bearer')) {
        token = auth.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({
            message: 'unauthorized',
            data: null,
            status: 401
        })
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Users.findOne({ email })
        
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        if (error.message) {
            return res.status(401).json({
                message: error.message,
                data: null,
                status: 401
            })
        }
        return res.status(501).json({
            message: 'something went wrong',
            data: null,
            status: 501
        })
    }
}

const isAdmin = async (req, res) => {
    const auth = req.headers.authorization
    let token

    if (auth && auth.startsWith('Bearer')) {
        token = auth.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({
            message: 'unauthorized',
            data: null,
            status: 401
        })
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Users.findOne({ email })
        
        if (user.role !== 'admin') {
            res.status(403).json({
                message: 'unauthorized',
                data: null,
                success: false,
                status: 403
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        if (error.message) {
            return res.status(401).json({
                message: error.message,
                data: null,
                status: 401
            })
        }
        return res.status(501).json({
            message: 'something went wrong',
            data: null,
            status: 501
        })
    }
}

module.exports = { verifyToken, isAdmin }
