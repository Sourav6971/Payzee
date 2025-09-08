const { prisma, disconnect } = require('./client');
const { 
	createMerchant, 
	findMerchant, 
	findMerchantById, 
	updateMerchant 
} = require('./merchant');
const { 
	createProject, 
	findProjectById, 
	findProjects 
} = require('./project');
const { 
	createTransaction,
	findAuthorizedMerchant,
	updateTransaction,
	getTransactionById,
	updateTransactionStatus,
	updateTransactionWithTxId,
} = require('./transaction');

module.exports = {
	// Client
	prisma,
	disconnect,
	
	// Merchant
	createMerchant,
	findMerchant,
	findMerchantById,
	updateMerchant,
	
	// Project
	createProject,
	findProjectById,
	findProjects,
	
	// Transaction
	createTransaction,
	findAuthorizedMerchant,
	updateTransaction,
	getTransactionById,
	updateTransactionStatus,
	updateTransactionWithTxId,
};