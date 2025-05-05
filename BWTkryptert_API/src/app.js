const express = require('express');
const cors = require('cors');

const authRoutes = require('./v1/routes/authRoutes');

const dashRoutes = require('./v1/routes/dashRoutes');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashRoutes);

//Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
})