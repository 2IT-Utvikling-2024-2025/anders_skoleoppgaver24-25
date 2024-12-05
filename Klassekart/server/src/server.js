const express = require('express')
const app = require('./app');
const port = 3000;
const jsonfile = require("../src/Infrastructure/data/StudentsData.json");
 
 
app.get('/', (req, res) => {
    res.send(jsonfile)
  })
 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
 