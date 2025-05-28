const express = require("express");
const {
    getAllOrderItems,
    getItemsByOrderId,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require("../controllers/orderitemsController");

const router = express.Router();

router.get("/", getAllOrderItems);
router.get("/:order_id", getItemsByOrderId);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
