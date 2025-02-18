const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./v1/data/login');


app.use(express.json());
app.use(cors());


const phoneRoutes = require('./v1/routes/phoneRoutes');


app.use('/api/v1', phoneRoutes);
app.use('/api/v1', userRoutes);



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
