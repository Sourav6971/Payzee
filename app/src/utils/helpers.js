// Utility functions for common operations

/**
 * Format currency amounts
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'SOL')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'SOL') {
	if (currency === 'SOL') {
		return `${amount.toFixed(3)} ${currency}`;
	}
	return `${amount.toFixed(2)} ${currency}`;
}

/**
 * Format dates for display
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

/**
 * Truncate wallet addresses for display
 * @param {string} address - The wallet address to truncate
 * @param {number} startChars - Number of characters to show at start (default: 6)
 * @param {number} endChars - Number of characters to show at end (default: 4)
 * @returns {string} Truncated address
 */
export function truncateAddress(address, startChars = 6, endChars = 4) {
	if (!address || address.length <= startChars + endChars) {
		return address;
	}
	return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} Promise that resolves to true if successful
 */
export async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('Failed to copy text: ', error);
		return false;
	}
}

/**
 * Generate a random ID
 * @returns {string} Random ID string
 */
export function generateId() {
	return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}

/**
 * Throttle function to limit rate of function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export function validatePassword(password) {
	if (password.length < 8) {
		return {
			isValid: false,
			message: 'Password must be at least 8 characters long',
		};
	}

	if (!/[A-Z]/.test(password)) {
		return {
			isValid: false,
			message: 'Password must contain at least one uppercase letter',
		};
	}

	if (!/[a-z]/.test(password)) {
		return {
			isValid: false,
			message: 'Password must contain at least one lowercase letter',
		};
	}

	if (!/[0-9]/.test(password)) {
		return {
			isValid: false,
			message: 'Password must contain at least one number',
		};
	}

	return { isValid: true, message: 'Password is strong' };
}
