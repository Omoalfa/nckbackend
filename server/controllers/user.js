const Users = require('../models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new Users({
            name, email, password
        })

        console.log(user)

        await user.save()

        return res.status(201).json({
            message: 'User successfully created',
            success: true,
            status: 201,
            data: user
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            success: false,
            status: 501,
            error
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Credentials',
                data: null,
                success: false,
                status: 401
            })
        }

        const match = user.comparePassword(password)

        if (!match) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false,
                data: null,
                status: 401
            })
        }

        const token = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        
        console.log(token)

        return res.status(200).json({
            messge: 'User successfully logged in',
            data: { token },
            status: 200,
            success: true
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            error,
            status: 501,
            success: false
        })
    }
}

const getMe = (req, res) => {
    return res.status(200).json({
        message: 'successfully',
        data: req.user,
        success: true,
        status: 200
    })
}

module.exports = { login, createUser, getMe }