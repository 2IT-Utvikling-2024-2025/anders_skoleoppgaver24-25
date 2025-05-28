const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemsRoutes = require("./routes/orderitemsRoutes");
const dashRoutes = require("./routes/dashRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orderitems", orderItemsRoutes);
app.use("/api/v1/dashboard", dashRoutes);

// Root
app.get("/", (req, res) => {
    res.send("Welcome to the Astore API");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
