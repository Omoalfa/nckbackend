const Inventories = require('../models/Inventory')

const createInventory = async (req, res) => {
    const { name, quantity, price } = req.body;

    try {
        const inventory = new Inventories({ name, quantity, price });

        await inventory.save()

        return res.status(201).json({
            message: 'Inventory was successfully created',
            data: { inventory },
            success: true,
            status: 201
        })
    } catch (error) {
        return res.status(501).json({
            message: 'Failed to create',
            success: false,
            error,
            status: 501
        })
    }
}

const addInventoryToCart = async (req, res) => {
    const { _id, quantity } = req.body;
    const user = req.user;

    try {
        const inventory = await Inventories.findOne({ _id });


        if (!inventory) {
            return res.status(404).json({
                message: 'Item not found',
                data: null,
                success: false,
                status: 404
            })
        }

        if (inventory.quantity < quantity || inventory.quantity - quantity < 0) {
            return res.status(404).json({
                message: 'Insufficient stock',
                data: null,
                success: false,
                status: 404
            })
        }

        const cartItems = user.cart;

        cartItems.map(item => {
            if (item.inventory === _id) return true
            return false
        })

        if (cartItems.includes(true)) {
            user.cart.map((item) => {
                if (item.inventory === _id) {
                    inventory.quatity = inventory.quatity - (quantity - item.quantity)
                    item.quatity = quantity;
                    return item
                }
                return item
            })
        } else {
            inventory.quantity = inventory.quantity - quantity
            user.cart = [ ...user.cart, {
                inventory: _id, quantity
            } ]
        }

        await inventory.save()
        await user.save()

        return res.status(201).json({
            message: 'User cart updated successfully',
            data: { cart: user.cart },
            success: true,
            status: 201
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            error,
            success: false,
            status: 501
        })
    }
}

// const removeInventoryFromCart = async (req, res) => {
//     const { _id, quantity } = req.body;
//     const user = req.user;

//     try {

//     }
// }

const deleteCart = async (req, res) => {
    const user = req.user

    try {
        user.cart = [];

        await user.save()

        return res.status(200).json({
            message: 'User cart cleared successfully',
            data: null,
            success: true,
            status: 200
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            status: 501,
            error,
            success: false
        })
    }
}

const restockInventory = async (req, res) => {
    const { quantity } = req.body;
    const { _id } = req.params;
    console.log(quantity)

    try {
        const inventory = await Inventories.findOne({ _id });

        inventory.quantity += quantity;

        await inventory.save();

        console.log(inventory.quantity)

        return res.status(200).json({
            message: 'User inventory updated successfully',
            data: { inventory },
            success: true,
            status: 200
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            error,
            success: false,
            status: 501
        })
    }
}

const deleteInventory = async (req, res) => {
    const { _id } = req.params;

    try {
        await Inventories.findOneAndDelete({ _id });

        return res.status(200).json({
            message: 'User inventory deleted successfully',
            data: null,
            success: true,
            status: 200
        })
    } catch (error) {
        return res.status(501).json({
            error,
            message: 'something went wrong',
            success: false,
            status: 501
        })
    }
}

const readInventory = async (req, res) => {
    const { _id } = req.params

    try {
        const inventory = await Inventories.findOne({ _id });

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'inventory not found',
                data: null,
                status: 404
            })
        }

        return res.status(200).json({
            message: 'inventory fetched successfully',
            data: inventory,
            success: true,
            status: 200
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            status: 501,
            error,
            success: false,
        })
    }
}

const readInventories = async (req, res) => {
    try {
        const documents = await Inventories.find();
        
        return res.status(200).json({
            message: 'Inventories successully fetched',
            data: documents,
            success: true,
            status: 200
        })
    } catch (error) {
        return res.status(501).json({
            message: 'something went wrong',
            error,
            success: false,
            status: 501
        })
    }
}

module.exports = {
    createInventory, readInventories, deleteInventory, addInventoryToCart, restockInventory, readInventory, deleteCart
}