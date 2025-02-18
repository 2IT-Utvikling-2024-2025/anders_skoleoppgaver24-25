const express = require("express");
const productRoutes = require("./v1/routes/productRoutes");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Correct the route path
app.use("/api/v1/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
