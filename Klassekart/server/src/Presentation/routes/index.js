const express = require('express');

// Import routes
const studentRoutes = require('./studentRoutes');
const sclassRoutes = require('./sclassRoutes');

// Create router
const router = express.Router();

// Add routes
router.use('/students', studentRoutes);
router.use('/classes', sclassRoutes);

module.exports = router;
