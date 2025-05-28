const { pool } = require("../data/db");

// Get all order items
const getAllOrderItems = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM orderitems");
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get items by order ID
const getItemsByOrderId = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM orderitems WHERE order_id = ?", [req.params.order_id]);
        if (results.length === 0) {
            return res.status(404).json({ success: false, error: "No items found for this order" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create new order item
const createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        if (!order_id || !product_id || !quantity || price === undefined) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const [results] = await pool.execute(
            "INSERT INTO orderitems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
            [order_id, product_id, quantity, price]
        );
        res.status(201).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update order item
const updateOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        if (!order_id || !product_id || !quantity || price === undefined) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const [results] = await pool.execute(
            "UPDATE orderitems SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE orderitems_id = ?",
            [order_id, product_id, quantity, price, req.params.id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Order item not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete order item
const deleteOrderItem = async (req, res) => {
    try {
        const [results] = await pool.execute("DELETE FROM orderitems WHERE orderitems_id = ?", [req.params.id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Order item not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllOrderItems,
    getItemsByOrderId,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
};
