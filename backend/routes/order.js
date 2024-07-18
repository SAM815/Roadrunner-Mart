const express = require("express");
const router = express.Router();
const { newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,

  updateOrder } = require("../controllers/order");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

router.route("/orders/me")
  .get((req, res, next) => {
    console.log("Reached /orders/me route");
    next();
  }, isAuthenticated, myOrders);

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/orders/:id").get(isAuthenticated, getSingleOrder);
 
router.route("/admin/orders").get(isAuthenticated, authorizedRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder);


module.exports = router;
