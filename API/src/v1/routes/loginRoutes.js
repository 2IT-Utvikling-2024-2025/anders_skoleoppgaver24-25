const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    if (!email.endsWith('@email.com')) {
        return res.status(400).json({ message: 'email must end with @email.com' });
    }

    if (password.length < 10) {
        return res.status(400).json({ message: 'Password must be at least 10 characters long' });
    }

    res.status(200).json({ message: 'Login successful!' });
});

module.exports = router;
