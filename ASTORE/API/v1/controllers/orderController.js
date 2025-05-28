const { pool } = require("../data/db");

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM orders");
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM orders WHERE order_id = ?", [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create order
const createOrder = async (req, res) => {
    try {
        const { user_id, created_at } = req.body;
        if (!user_id || !created_at) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const [results] = await pool.execute(
            "INSERT INTO orders (user_id, created_at) VALUES (?, ?)",
            [user_id, created_at]
        );
        res.status(201).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { user_id, created_at } = req.body;
        if (!user_id || !created_at) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const [results] = await pool.execute(
            "UPDATE orders SET user_id = ?, created_at = ? WHERE order_id = ?",
            [user_id, created_at, req.params.id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const [results] = await pool.execute("DELETE FROM orders WHERE order_id = ?", [req.params.id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
