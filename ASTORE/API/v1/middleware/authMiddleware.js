const jwt = require('jsonwebtoken');

const SECRET_KEY = "hemmelig";

//Authenticate JWT Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { 
        return res.status(401).json({ error: 'Ingen token oppgitt' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Ugyldig eller utløpt token' });
        }
        req.user = user;
        next();
    });
}

//Authorize Roles 
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Ingen tilgang' });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRoles };