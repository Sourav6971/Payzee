# Payzee Dashboard

The Payzee Dashboard is the central hub for merchants to manage their payment gateway integration. It provides a comprehensive interface for managing projects, API keys, transactions, and analytics.

## Dashboard Components

### 1. Overview (/dashboard)

The main dashboard view that provides:

- Quick access to all dashboard sections
- Recent projects overview
- Quick action buttons
- Getting started guide

### 2. Projects (/dashboard/projects)

Manage your payment projects:

- Create new projects with unique names and webhook URLs
- View existing projects with creation dates
- Copy project IDs for integration
- View transactions for each project

### 3. API Keys (/dashboard/api-keys)

Generate and manage API credentials:

- Generate new API key/secret pairs
- View usage instructions for API keys
- Security best practices information

### 4. Transactions (/dashboard/transactions)

Monitor and create transactions:

- View transaction history
- Filter transactions by project
- Create new transactions (demo functionality)
- View transaction details including status and IDs

### 5. Analytics (/dashboard/analytics)

View payment analytics and reports:

- Transaction volume metrics
- Success rate statistics
- Project performance data
- Recent activity timeline

## Navigation

The dashboard features two navigation options:

- **Mobile**: Horizontal top navigation bar
- **Desktop**: Vertical sidebar navigation

## Integration with Backend

The dashboard components communicate with the Payzee backend API:

- Authentication via JWT tokens stored in localStorage
- API requests made through the ApiContext
- Real-time data fetching for projects and transactions

## Security Considerations

- All API requests are authenticated with JWT tokens
- API keys are only shown once upon generation
- Sensitive data is never logged or stored in plain text
- Users are prompted for confirmation before destructive actions

## Future Enhancements

Planned improvements for the dashboard:

- Real-time transaction data fetching
- Project editing and deletion functionality
- Advanced analytics with customizable date ranges
- Export functionality for reports
- Notification system for transaction updates
