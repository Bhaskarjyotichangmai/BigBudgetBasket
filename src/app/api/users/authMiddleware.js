const jwt = require('jsonwebtoken');
const generateSecretkey=require('./generateSecretkey');

const secretKey = generateSecretkey();

const authMiddleware = (req, res, next) => {

  
    
    const token = req.headers.authorization;
    console.log('Token format:',token);

    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        
        const decoded = jwt.verify(token, secretKey);

        
        req.userId = decoded.userId;
        
        res.locals.tokenPayload = decoded;

        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
