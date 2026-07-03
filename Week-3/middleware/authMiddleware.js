const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check if the token is passed in the Authorization header as a Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (e.g. "Bearer eyJhbGciOiJIUz...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database and attach to the request object (excluding the password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };
