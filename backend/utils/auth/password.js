const bcrypt = require("bcryptjs");

/**
 * Hash a password with bcrypt
 * @param {string} password - Plain text password
 * @param {number} rounds - Number of bcrypt rounds (default: 12)
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password, rounds = 12) {
	return await bcrypt.hash(password, rounds);
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} Whether passwords match
 */
async function comparePassword(password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
	hashPassword,
	comparePassword,
};