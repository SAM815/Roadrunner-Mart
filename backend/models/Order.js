const mongoose = require("mongoose");
/*
Order Schema

NAME
    Order Schema

SYNOPSIS
    const orderSchema = new mongoose.Schema({...});

DESCRIPTION
    This schema defines the structure for an Order document in the MongoDB database.
    It contains fields for shipping information, ordered items, user details, payment information,
    pricing, order status, and timestamps.

FIELDS
    shippingInfo - Contains details about the shipping address and contact information.
        address - Shipping address (required).
        city - City of the shipping address (required).
        state - State of the shipping address (required).
        country - Country of the shipping address (required).
        pinCode - Postal code of the shipping address (required).
        phoneNo - Contact phone number (required).

    orderItems - Array of items included in the order.
        name - Name of the item (required).
        price - Price of the item (required).
        amount - Quantity of the item (required).
        image - URL of the item's image (required).
        post - Reference to the Post document related to the item (required).

    user - Reference to the User document who placed the order (required).

    paymentInfo - Information about the payment for the order.
        id - Payment identifier (required).
        status - Payment status (required).

    paidAt - Date when the order was paid (required).

    itemsPrice - Total price of the items in the order (default: 0, required).

    taxPrice - Tax applied to the order (default: 0, required).

    shippingPrice - Cost of shipping (default: 0, required).

    totalPrice - Total price of the order including items, tax, and shipping (default: 0, required).

    orderStatus - Current status of the order (default: "Processing", required).

    deliveredAt - Date when the order was delivered (optional).

    createdAt - Date when the order was created (default: current date and time).

EXPORTS
    The schema is used to create the Order model, which is exported for use in other parts of the application.
*/


const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            post: {
                type: mongoose.Schema.ObjectId,
                ref: "Post",
                required: true,
            },
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },

    paidAt: {
        type: Date,
        required: true,
    },

    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },

    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("Order", orderSchema);

