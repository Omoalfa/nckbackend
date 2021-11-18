const { Schema, model, SchemaTypes } = require('mongoose');
require('mongoose-type-email')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    email: {
        type: SchemaTypes.Email,
        required: true,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',    
    },
    cart: [
        {
            inventory: {
                type: Schema.Types.ObjectId,
                ref: 'Inventory'
            },
            quantity: {
                type: Number,
                min: 0,
            }
        }
    ]
})

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = model('Users', userSchema)