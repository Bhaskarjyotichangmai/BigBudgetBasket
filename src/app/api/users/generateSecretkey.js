const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Function to generate a random secret key
const generateSecretkey = () => {
    return crypto.randomBytes(32).toString('hex'); // Generates a 32-byte hexadecimal string
};

module.exports = generateSecretkey;