const Order = require("../models/Order");
const Post = require("../models/Post");
const mongoose = require('mongoose');

//Create a new order

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

//get single order

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


//get logged in user order


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

//get all orders - admin

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
//==========================

//finale updateStock
// const updateStock = async (id, quantity) => {

//     const product = await Post.findById(id);

//     product.Stock -= quantity;

//     await product.save();

// }
//---------------------------

async function updateStock (id, amount) {
    const product = await Post.findById(id)
   

    product.quantity -= amount

    await product.save();
}

//current update status --admin

exports.updateOrder = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
  
      if (order.orderStatus === "Delivered") {
        return res.status(400).json({
          success: false,
          message: "You have already delivered this order",
        });
      }
  
      // Use Promise.all to ensure all updateStock operations complete before continuing
      await Promise.all(
        order.orderItems.map(async (o) => {
          await updateStock(o.product, o.amount);
        })
      );
  
      order.orderStatus = req.body.status;
  
      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }
  
      await order.save();
  
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

// //Final update order status - admin

// exports.updateOrderStatus = async (req, res) => {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//         return res.status(404).json({
//             success: false,
//             message: "Order not found with this ID"
//         })
//     }

//     if (order.orderStatus === "Delivered") {
//         return res.status(404).json({
//             success: false,
//             message: "You have delivered this order"
//         })
//     }

//     if (req.body.status === "Shipped") {
//         order.orderItems.forEach(async o => {
//             await updateStock(o.product, o.quantity);
//         })
//     }

//     order.orderStatus = req.body.status;

//     if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//     }

//     await order.save();

//     res.status(200).json({
//         success: true,
//         message: "Order Status Updated"
//     })
// }

// delete order status --admin

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

