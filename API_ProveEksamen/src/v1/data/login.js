const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, 'users.json');


const getUsers = () => {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
};


const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};


router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Brukernavn er allerede i bruk' });
  }

  
  users.push({ username, password });
  saveUsers(users);
  res.status(201).json({ message: 'Bruker registrert' });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Ugyldig brukernavn eller passord' });
  }

  res.status(200).json({ message: 'Innlogging vellykket' });
});

module.exports = router;
