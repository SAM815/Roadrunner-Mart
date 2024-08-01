const Order = require("../models/Order");
const Post = require("../models/Post");
const mongoose = require('mongoose');

/*
newOrder()

NAME
    newOrder

SYNOPSIS
    newOrder(req, res, next);

DESCRIPTION
    This function creates a new order in the database.
    It extracts order details from the request body and the user ID from the request object.
    After successfully creating the order, it sends a JSON response with the order details.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing order details and user information.
    res - The response object used to send back the JSON response.
    next - The next middleware function in the stack.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/

exports.newOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        console.log("Creating order with the data entered(controller: newOrder)",req.body);
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        })
        console.log("The order is (controller(newOrder))")
        console.log(order);
        console.log("order placed");
        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }

}

/*
getSingleOrder()

NAME
    getSingleOrder

SYNOPSIS
    getSingleOrder(req, res);

DESCRIPTION
    This function retrieves a single order from the database by its ID.
    It populates the user field with the user's name and email.
    If the order is found, it sends a JSON response with the order details.
    If the order is not found, it sends a JSON response indicating the failure.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the order ID.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")    ;

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


/*
myOrders()

NAME
    myOrders

SYNOPSIS
    myOrders(req, res);

DESCRIPTION
    This function retrieves all orders made by the logged-in user.
    It uses the user ID from the request object to find the orders.
    If orders are found, it sends a JSON response with the orders.
    If no orders are found, it sends a JSON response indicating the failure.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the user information.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/


exports.myOrders = async (req, res) => {
    try {
        console.log("exports.myOrders called");
        console.log("exports.myOrders req,user", req.user._id);
      
      
  
      const orders = await Order.find({ user: req.user._id});
  
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "No orders found for this user",
        });
      }
  
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error in myOrders",
        error: error.message,
      });
    }
  };

/*
getAllOrders()

NAME
    getAllOrders

SYNOPSIS
    getAllOrders(req, res);

DESCRIPTION
    This function retrieves all orders from the database.
    It calculates the total amount from all orders.
    It sends a JSON response with the total amount and the orders.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success of the operation with the total amount and orders.
*/

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();
    let totalAmount = 0;
    
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
}
/*
updateStock()

NAME
    updateStock

SYNOPSIS
    updateStock(id, amount);

DESCRIPTION
    This function updates the stock quantity of a product.
    It finds the product by its ID and decreases the quantity by the specified amount.
    After updating, it saves the product back to the database.

PARAMETERS
    id - The ID of the product to update.
    amount - The amount by which to decrease the product's quantity.

RETURNS
    This function does not return a value.
*/
const updateStock = async (id, amount) => {

    const product = await Post.findById(id);

    product.quantity -= amount;

    await product.save();

}
// //---------------------------



/*
updateOrder()

NAME
    updateOrder

SYNOPSIS
    updateOrder(req, res);

DESCRIPTION
    This function updates the status of an order by its ID.
    If the order is already delivered, it sends a JSON response indicating the failure.
    If the status is "Shipped", it updates the stock for each order item.
    It updates the order status and, if delivered, sets the delivered date.
    It saves the updated order back to the database.
    Finally, it sends a JSON response indicating the success of the operation.

PARAMETERS
    req - The request object containing the order ID and new status.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/

exports.updateOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this ID"
        })
    }

    if (order.orderStatus === "Delivered") {
        return res.status(404).json({
            success: false,
            message: "You have delivered this order"
        })
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async o => {
            await updateStock(o.product, o.amount);
        })
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order Status Updated"
    })
}

/*
deleteOrder()

NAME
    deleteOrder

SYNOPSIS
    deleteOrder(req, res);

DESCRIPTION
    This function deletes an order by its ID.
    If the order is not found, it sends a JSON response indicating the failure.
    After successfully deleting the order, it sends a JSON response indicating the success of the operation.

PARAMETERS
    req - The request object containing the order ID.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response indicating the success or failure of the operation.
*/

exports.deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this ID"
        })
    }
    await order.deleteOne();


    res.status(200).json({
        success: true,
        message: "Order Deleted!"
    })

}

