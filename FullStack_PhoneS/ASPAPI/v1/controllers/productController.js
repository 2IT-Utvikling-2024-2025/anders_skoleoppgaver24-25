const express = require("express");

const { pool } = require('../data/db');

const getAllProducts = async(req, res) => {
    try {

        // Query the database
        const [results] = await pool.execute('SELECT * FROM product');

        // Return the results
        res.status(200).json({ sucess: true, data: results });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
};

const getProductByName = async(req, res) => {
    try {

        // Query the database
        const [results] = await pool.execute(
            'SELECT * FROM product WHERE name = ?',
            [req.params.name]);

        // Return the results
        res.status(200).json({ sucess: true, data: results });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
};

const createProduct = async(req, res) => {
    try {

        // Query the database
        const [results] = await pool.execute(
            'INSERT INTO product (name, price) VALUES (?, ?)',
            [req.body.name, req.body.price]);

        // Return the results
        res.status(200).json({ sucess: true, data: results });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
};

const updateProduct = async(req, res) => {
    try {

        // Query the database
        const [results] = await pool.execute(
            'UPDATE product SET name = ?, price = ? WHERE product_id = ?',
            [req.body.name, req.body.price, req.params.id]);

        // Check if the product was updated
        if (results.affectedRows === 0) {
            return res.status(404).json({ sucess: false, error: "Product not found" });
        }

        // Return the results
        res.status(200).json({ sucess: true, data: results });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
};

const deleteProduct = async(req, res) => {
    try {

        // Query the database
        const [results] = await pool.execute(
            'DELETE FROM product WHERE product_id = ?',
            [req.params.id]);

        // Check if the product was deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ sucess: false, error: "Product not found" });
        }

        // Return the results
        res.status(200).json({ sucess: true, data: results });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
};