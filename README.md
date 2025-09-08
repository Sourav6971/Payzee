# Payzee - Solana Payment Gateway

A secure, scalable payment gateway for Solana blockchain transactions.

## Features

- Merchant registration and authentication
- Project management for merchants
- Automatic transaction verification
- Support for proxy payments
- Webhook notifications 

## API Endpoints

### Authentication

- `POST /api/v1/user/signup` - Register a new merchant
- `POST /api/v1/user/signin` - Authenticate a merchant

### Merchant Operations

- `POST /api/v1/user/project` - Create a new project
- `GET /api/v1/user/project` - List all projects or get a specific project
- `PUT /api/v1/user/` - Generate new API keys

### Transaction Processing

- `POST /api/v1/transaction` - Initiate a new transaction

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the server: `npm start`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret for JWT token signing
- `API_SALT` - Salt for API key hashing
- `DATABASE_URL` - PostgreSQL database connection string
- `MODE` - Application mode (DEV or PROD)
- `APP_URL` - Application URL for redirects
- `SOLANA_CLUSTER` - Solana cluster (devnet, testnet, mainnet-beta)

## Future Enhancements

- Webhook notifications for transaction status updates
- Dashboard for merchants to view transaction history
- Support for multiple Solana wallets
- Advanced analytics and reporting
- Multi-currency support(not yet implemented)
- Rate limiting and DDoS protection
