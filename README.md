# Payzee Crypto Payment Gateway

A Solana-based crypto payment gateway that allows merchants to accept payments in SOL.

## Features

- Merchant registration and authentication
- Project creation with webhook URLs
- Payment initiation with unique Solana accounts
- Automatic payment detection
- Webhook notifications to merchants
- RESTful API for integration

## Architecture

1. **Merchant Signup**: Merchants register with their Solana public key
2. **Project Creation**: Merchants create projects with webhook URLs
3. **Payment Initiation**: Customers initiate payments through the merchant's project
4. **Account Generation**: System generates a unique Solana account for each payment
5. **Payment Processing**: System monitors Solana accounts for incoming payments
6. **Webhook Notification**: System notifies merchants via webhooks when payments are received

## API Endpoints

### Merchant Routes

- `POST /api/signup` - Register a new merchant
- `POST /api/signin` - Authenticate a merchant
- `POST /api/projects` - Create a new project
- `GET /api/projects/:merchantId` - Get all projects for a merchant

### Payment Routes

- `POST /api/payment` - Initiate a new payment
- `GET /pay/:transactionId` - Get payment details for customer
- `GET /api/transaction/:transactionId` - Get transaction status
- `POST /api/process/:transactionId` - Manually process a transaction
- `POST /api/process-queue` - Process transactions from queue

### Webhook Routes

- `POST /api/webhook/:projectId` - Receive webhook notifications

## Environment Variables

Create a `.env` file based on `.env.example`:

```
MODE="DEV"
PORT=3000

# Database
POSTGRES_URL="postgresql://user:password@localhost:5432/payzee?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"
REDIS_QUEUE_NAME="transactions"
REDIS_TTL=600

# Solana
SOLANA_CLUSTER="devnet"

# Frontend URL for redirect URLs
FRONTEND_URL="http://localhost:3000"

# Security
JWT_SECRET="your-super-secret-jwt-key"
```

## Database Schema

The payment gateway uses PostgreSQL with the following tables:

- **Merchant**: Stores merchant information
- **Project**: Stores merchant projects with webhook URLs
- **Transaction**: Stores payment transactions

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables
4. Run database migrations:
   ```
   npx prisma migrate dev
   ```
5. Generate Prisma client:
   ```
   npx prisma generate
   ```
6. Start the server:
   ```
   npm start
   ```

## Usage

1. Merchant signs up using `/api/signup`
2. Merchant creates a project using `/api/projects`
3. Customer initiates payment using `/api/payment`
4. System generates a unique Solana account for the payment
5. Customer sends SOL to the generated account
6. System monitors the account for incoming payments
7. When payment is detected, system updates transaction status and notifies merchant via webhook

## Webhook Notifications

Merchants receive webhook notifications when payments are processed. The webhook includes:

```json
{
  "event": "payment.success",
  "transactionId": "uuid",
  "amount": 1000000000,
  "fromKey": "sender_public_key",
  "toKey": "recipient_public_key",
  "timestamp": "2023-01-01T00:00:00Z"
}
```

## License

MIT