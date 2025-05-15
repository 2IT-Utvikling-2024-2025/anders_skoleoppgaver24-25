const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());


app.use("/api/v1/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
