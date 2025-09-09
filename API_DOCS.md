# Payzee API Documentation

Payzee is a Solana payment gateway that allows merchants to accept payments in SOL and SPL tokens.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Most endpoints require authentication using JWT tokens. Obtain a token by signing in with valid credentials.

### Merchant Signup

Create a new merchant account.

**Endpoint**: `POST /user/signup`

**Request Body**:
```json
{
  "publicKey": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "message": "User created successfully!",
  "id": "string",
  "token": "string"
}
```

### Merchant Signin

Authenticate a merchant and obtain a JWT token.

**Endpoint**: `POST /user/signin`

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "message": "User signed in",
  "token": "string"
}
```

## Projects

Projects are used to organize transactions for different applications or services.

### Create Project

Create a new project for a merchant.

**Endpoint**: `POST /user/project`

**Headers**:
- `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "string",
  "webhookUrl": "string",
  "publicKey": "string (optional)"
}
```

**Response**:
```json
{
  "message": "Project created successfully",
  "project": {
    "id": "string",
    "name": "string",
    "publicKey": "string",
    "webhookUrl": "string",
    "merchant_id": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get Projects

Retrieve all projects for a merchant or a specific project.

**Endpoint**: `GET /user/project[?projectId=id]`

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
```json
{
  "message": "Project fetched successfully",
  "projects": [
    {
      "id": "string",
      "name": "string",
      "publicKey": "string",
      "webhookUrl": "string",
      "merchant_id": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Generate API Keys

Generate new API keys for a merchant.

**Endpoint**: `PUT /user/`

**Headers**:
- `Authorization: Bearer <token>`

**Response**:
```json
{
  "message": "API keys generated successfully",
  "apiKey": "string",
  "apiSecret": "string"
}
```

## Transactions

Process payments through the Payzee gateway.

### Create Transaction

Initiate a new payment transaction.

**Endpoint**: `POST /transaction`

**Headers**:
- `x-api-key: string`
- `x-api-secret: string`

**Request Body**:
```json
{
  "amount": "number",
  "projectId": "string",
  "mode": "string (optional)"
}
```

**Response**:
```json
{
  "message": "Transaction created successfully",
  "redirectUrl": "string",
  "transactionId": "string",
  "publicKey": "string"
}
```

### Get Transaction

Retrieve details of a specific transaction.

**Endpoint**: `GET /transaction/:id`

**Response**:
```json
{
  "message": "Transaction retrieved successfully",
  "transaction": {
    "id": "string",
    "amount": "number",
    "txId": "string",
    "status": "string",
    "mode": "string",
    "project_id": "string",
    "merchant_id": "string",
    "redirectUrl": "string",
    "solanaAccount": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Webhooks

Payzee can send webhook notifications to your server when transaction statuses change.

### Transaction Status Update

When a transaction status changes, Payzee will send a POST request to your project's webhook URL.

**Request Body**:
```json
{
  "eventType": "transaction.status.updated",
  "data": {
    "transactionId": "string",
    "status": "string",
    "txId": "string",
    "amount": "number"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Missing or invalid authentication
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `409`: Conflict - Resource already exists
- `500`: Internal Server Error - Something went wrong on our end

## Rate Limiting

API requests are rate limited to prevent abuse:
- 100 requests per 15 minutes per IP address

Exceeding the rate limit will result in a `429 Too Many Requests` response.

## Security

- All passwords are hashed using bcrypt with 12 rounds
- API keys are hashed with salted SHA-256
- JWT tokens expire after 24 hours
- All communications should be over HTTPS in production
- Public keys are verified before use