const { Schema, model } = require('mongoose')

const inventorySchema = new Schema({
    name: String,
    quantity: {
        type: Number,
        min: 0,
        default: 1,
    },
    price: {
        type: Number,
        min: 0,
    },
})

module.exports = model('Invetory', inventorySchema)
