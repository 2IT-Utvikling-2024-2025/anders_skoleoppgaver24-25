const { pool } = require("../data/db");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM product");
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get product by name
const getProductByName = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM product WHERE name = ?", [req.params.name]);
        if (results.length === 0) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, type, brand, stock, image_url, price } = req.body;

        if (!name || !type || !brand || stock === undefined || !image_url || price === undefined) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const [results] = await pool.execute(
            "INSERT INTO product (name, type, brand, stock, image_url, price) VALUES (?, ?, ?, ?, ?, ?)",
            [name, type, brand, stock, image_url, price]
        );

        res.status(201).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, type, brand, stock, image_url, price } = req.body;

        if (!name || !type || !brand || stock === undefined || !image_url || price === undefined) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const [results] = await pool.execute(
            "UPDATE product SET name = ?, type = ?, brand = ?, stock = ?, image_url = ?, price = ? WHERE product_id = ?",
            [name, type, brand, stock, image_url, price, req.params.id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const [results] = await pool.execute("DELETE FROM product WHERE product_id = ?", [req.params.id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
};
