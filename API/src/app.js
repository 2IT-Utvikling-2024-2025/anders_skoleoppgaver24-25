const express = require('express');
const animalRoutes = require('./v1/routes/animalRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/animalRoutes', animalRoutes);
app.get('/api/v1/animalRoutes',)

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

