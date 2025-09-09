const documentationSections = [
	{
		id: 'getting-started',
		title: 'Getting Started',
		content: `
      <h2>Getting Started with Payzee</h2>
      <p>Welcome to Payzee, the simple and secure way to accept cryptocurrency payments powered by the Solana blockchain. This guide will walk you through the process of setting up your merchant account and integrating Payzee into your application.</p>
      
      <h3>Prerequisites</h3>
      <p>Before you begin, ensure you have:</p>
      <ul>
        <li>A business or project that can accept cryptocurrency payments</li>
        <li>A website or application where you want to integrate payments</li>
        <li>Basic knowledge of web development and APIs</li>
        <li>A Solana wallet for receiving payments (Phantom, Solflare, etc.)</li>
      </ul>
      
      <h3>Step-by-Step Setup Process</h3>
      
      <h4>1. Create a Merchant Account</h4>
      <p>Start by signing up for a Payzee merchant account:</p>
      <ol>
        <li>Visit the <a href="/auth">authentication page</a> to create your account</li>
        <li>Provide your business information and email address</li>
        <li>Verify your email address through the confirmation email</li>
        <li>Complete your merchant profile with business details</li>
      </ol>
      
      <h4>2. Create Your First Project</h4>
      <p>Projects in Payzee represent individual applications or services where you want to accept payments:</p>
      <ol>
        <li>Log in to your merchant dashboard</li>
        <li>Navigate to the Projects section</li>
        <li>Click "Create Project" and provide a name for your project</li>
        <li>Set up a webhook URL for transaction notifications (optional but recommended)</li>
        <li>Save your project to generate a project ID</li>
      </ol>
      
      <h4>3. Generate API Credentials</h4>
      <p>API keys are required to authenticate your requests to the Payzee API:</p>
      <ol>
        <li>Go to the API Keys section in your dashboard</li>
        <li>Click "Generate New API Keys"</li>
        <li>Save your API Key and API Secret in a secure location</li>
        <li>Never share your API Secret or commit it to version control</li>
      </ol>
      
      <h4>4. Integrate Payment Flow</h4>
      <p>Add Payzee payment functionality to your application:</p>
      <ol>
        <li>Use your API credentials to create payment transactions</li>
        <li>Redirect customers to the Payzee payment page</li>
        <li>Handle webhooks to receive transaction status updates</li>
        <li>Update your application based on transaction results</li>
      </ol>
      
      <h4>5. Test Your Integration</h4>
      <p>Before going live, thoroughly test your integration:</p>
      <ol>
        <li>Create test transactions using small amounts</li>
        <li>Verify webhook delivery and handling</li>
        <li>Test both successful and failed transaction scenarios</li>
        <li>Ensure your application handles all edge cases</li>
      </ol>
      
      <h4>6. Go Live</h4>
      <p>Once testing is complete, you're ready to accept real payments:</p>
      <ol>
        <li>Update your API endpoints to use the production environment</li>
        <li>Ensure your webhook handler is production-ready</li>
        <li>Monitor transactions through your dashboard</li>
        <li>Provide customer support for payment-related inquiries</li>
      </ol>
      
      <div class="docs-note">
        <p><strong>Tip:</strong> Keep your API credentials secure and never expose them in client-side code. Always use them only in server-side code to prevent unauthorized access.</p>
      </div>
    `,
	},
	{
		id: 'overview',
		title: 'Platform Overview',
		content: `
      <h2>Payzee Platform Overview</h2>
      <p>Payzee is a comprehensive cryptocurrency payment gateway built on the Solana blockchain, designed to make accepting digital currency payments simple, fast, and secure for merchants of all sizes.</p>
      
      <h3>Core Architecture</h3>
      <p>Payzee operates on a three-tier architecture that ensures security, scalability, and reliability:</p>
      <ul>
        <li><strong>Frontend Layer:</strong> User interfaces for merchants and customers</li>
        <li><strong>API Layer:</strong> RESTful APIs for transaction processing and merchant management</li>
        <li><strong>Blockchain Layer:</strong> Direct integration with Solana for fast, low-cost transactions</li>
      </ul>
      
      <h3>Key Features and Benefits</h3>
      
      <h4>Ultra-Low Fees</h4>
      <p>Payzee charges only 0.5% per transaction, significantly lower than traditional payment processors and even other cryptocurrency gateways. This is made possible by Solana's extremely low transaction costs.</p>
      <ul>
        <li>Transparent pricing with no hidden fees</li>
        <li>Volume discounts available for high-volume merchants</li>
        <li>No setup fees or monthly minimums</li>
        <li>Settlement directly to your wallet with no intermediaries</li>
      </ul>
      
      <h4>Lightning-Fast Transactions</h4>
      <p>Leveraging Solana's high-performance blockchain, transactions settle in seconds rather than minutes or hours:</p>
      <ul>
        <li>400ms block times on Solana ensure rapid confirmation</li>
        <li>Typical transaction finality in under 2 seconds</li>
        <li>No need for multiple confirmations like other blockchains</li>
        <li>Real-time transaction status updates via webhooks</li>
      </ul>
      
      <h4>Military-Grade Security</h4>
      <p>Security is at the core of Payzee's design, implementing multiple layers of protection:</p>
      <ul>
        <li>End-to-end encryption for all data transmission</li>
        <li>Multi-signature wallets for enhanced fund security</li>
        <li>Regular third-party security audits</li>
        <li>PCI DSS compliance for payment processing</li>
        <li>Two-factor authentication for all merchant accounts</li>
      </ul>
      
      <h4>Easy Integration</h4>
      <p>Getting started with Payzee is straightforward with comprehensive documentation and SDKs:</p>
      <ul>
        <li>Simple REST API with clear documentation</li>
        <li>Client libraries for popular programming languages</li>
        <li>Pre-built plugins for e-commerce platforms</li>
        <li>Comprehensive webhook system for real-time updates</li>
        <li>Sandbox environment for testing</li>
      </ul>
      
      <h4>Advanced Analytics</h4>
      <p>Gain valuable insights into your business with our powerful analytics dashboard:</p>
      <ul>
        <li>Real-time transaction monitoring</li>
        <li>Revenue tracking and forecasting</li>
        <li>Customer behavior analysis</li>
        <li>Custom reporting capabilities</li>
        <li>Export functionality for accounting software</li>
      </ul>
      
      <h4>24/7 Support</h4>
      <p>Our dedicated support team is available to help you succeed:</p>
      <ul>
        <li>Email support with 24-hour response time</li>
        <li>Comprehensive documentation and guides</li>
        <li>Community forum for peer support</li>
        <li>Priority support for enterprise customers</li>
        <li>Regular webinars and training sessions</li>
      </ul>
      
      <h3>Supported Cryptocurrencies</h3>
      <p>Currently, Payzee supports transactions in SOL (Solana's native token) with plans to expand to other SPL tokens and cryptocurrencies:</p>
      <ul>
        <li>SOL - Solana native token</li>
        <li>USDC - USD Coin on Solana</li>
        <li>Future support for additional SPL tokens</li>
      </ul>
      
      <h3>Target Use Cases</h3>
      <p>Payzee is ideal for a variety of business models:</p>
      <ul>
        <li>E-commerce stores accepting digital payments</li>
        <li>Subscription services with recurring payments</li>
        <li>Online marketplaces with multiple sellers</li>
        <li>Digital content creators and platforms</li>
        <li>Gaming platforms and in-app purchases</li>
        <li>Freelancers and service providers</li>
      </ul>
    `,
	},
	{
		id: 'integration-guide',
		title: 'Integration Guide',
		content: `
      <h2>Complete Integration Guide</h2>
      <p>This comprehensive guide will walk you through integrating Payzee into your application, from initial setup to handling webhooks and edge cases.</p>
      
      <h3>Authentication System</h3>
      <p>All API requests to Payzee must be authenticated using your API key and secret. These credentials should be treated as sensitive information and stored securely.</p>
      
      <h4>Authentication Headers</h4>
      <p>Include these headers with every API request:</p>
      <ul>
        <li><code>x-api-key</code>: Your merchant API key</li>
        <li><code>x-api-secret</code>: Your merchant API secret</li>
        <li><code>Content-Type</code>: <code>application/json</code></li>
      </ul>
      
      <h4>Authentication Example</h4>
      <pre><code class="language-javascript">// Example API request with authentication
const response = await fetch('https://api.payzee.com/v1/transaction', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY',
    'x-api-secret': 'YOUR_API_SECRET'
  },
  body: JSON.stringify({
    amount: 100000000, // 1 SOL in lamports
    currency: 'SOL',
    redirectUrl: 'https://yourwebsite.com/success',
    webhookUrl: 'https://yourwebsite.com/webhook'
  })
});</code></pre>
      
      <h3>Creating Payment Transactions</h3>
      <p>The core functionality of Payzee is creating payment transactions that redirect customers to a secure payment page.</p>
      
      <h4>Transaction Parameters</h4>
      <p>When creating a transaction, you can specify several parameters:</p>
      <ul>
        <li><code>amount</code> (required): The payment amount in the smallest currency unit (lamports for SOL)</li>
        <li><code>currency</code> (required): The currency code (currently SOL or USDC)</li>
        <li><code>redirectUrl</code> (required): URL to redirect customers after payment</li>
        <li><code>webhookUrl</code> (optional): URL for transaction status notifications</li>
        <li><code>metadata</code> (optional): Custom data to associate with the transaction</li>
        <li><code>description</code> (optional): Description of the payment for customer</li>
      </ul>
      
      <h4>Complete Transaction Example</h4>
      <pre><code class="language-javascript">const transactionData = {
  // Required fields
  amount: 100000000,        // 1 SOL in lamports (1 SOL = 1,000,000,000 lamports)
  currency: 'SOL',          // Currency code
  redirectUrl: 'https://yourwebsite.com/payment-success',  // Success redirect
  
  // Optional fields
  webhookUrl: 'https://yourwebsite.com/webhook',   // Webhook notifications
  description: 'Premium Plan Subscription',        // Payment description
  metadata: {               // Custom data
    orderId: 'order_12345',
    customerId: 'customer_abc',
    plan: 'premium'
  }
};

fetch('https://api.payzee.com/v1/transaction', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY',
    'x-api-secret': 'YOUR_API_SECRET'
  },
  body: JSON.stringify(transactionData)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    // Redirect user to payment page
    window.location.href = data.paymentUrl;
  } else {
    // Handle error
    console.error('Transaction creation failed:', data.message);
  }
})
.catch(error => {
  console.error('Network error:', error);
});</code></pre>
      
      <h4>Amount Calculation</h4>
      <p>Ensure you're using the correct units for amounts:</p>
      <ul>
        <li>SOL: 1 SOL = 1,000,000,000 lamports</li>
        <li>USDC: 1 USDC = 1,000,000 units</li>
      </ul>
      <pre><code class="language-javascript">// Converting SOL to lamports
const solAmount = 1.5; // 1.5 SOL
const lamports = Math.round(solAmount * 1000000000); // 1,500,000,000 lamports

// Converting USDC to units
const usdcAmount = 25.99; // $25.99 USDC
const units = Math.round(usdcAmount * 1000000); // 25,990,000 units</code></pre>
      
      <div class="docs-warning">
        <p><strong>Security Warning:</strong> Never expose your API keys in client-side code. Always create transactions server-side to prevent unauthorized access to your merchant account.</p>
      </div>
      
      <h3>Handling Webhooks</h3>
      <p>Webhooks provide real-time notifications about transaction status changes, enabling you to automate fulfillment and improve customer experience.</p>
      
      <h4>Webhook Events</h4>
      <p>Payzee sends webhooks for the following transaction events:</p>
      <ul>
        <li><code>transaction.created</code>: Transaction initiated but not yet paid</li>
        <li><code>transaction.paid</code>: Payment successfully received</li>
        <li><code>transaction.failed</code>: Payment failed or cancelled</li>
        <li><code>transaction.expired</code>: Payment window expired without payment</li>
      </ul>
      
      <h4>Webhook Payload Structure</h4>
      <pre><code class="language-json">{
  "id": "wh_123456789",
  "event": "transaction.paid",
  "created": "2023-01-01T12:00:30Z",
  "data": {
    "transaction": {
      "id": "txn_123456789",
      "amount": 100000000,
      "currency": "SOL",
      "status": "paid",
      "description": "Premium Plan Subscription",
      "metadata": {
        "orderId": "order_12345",
        "customerId": "customer_abc",
        "plan": "premium"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "paidAt": "2023-01-01T12:00:30Z"
    }
  }
}</code></pre>
      
      <h4>Webhook Handler Implementation</h4>
      <pre><code class="language-javascript">// Example webhook handler using Express.js
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = req.body;
  
  // Verify webhook signature for security
  if (verifyWebhookSignature(payload, signature)) {
    const event = JSON.parse(payload);
    
    // Process different event types
    switch(event.event) {
      case 'transaction.paid':
        // Fulfill order or activate service
        fulfillOrder(event.data.transaction);
        break;
      case 'transaction.failed':
        // Handle failed transaction
        handleFailedTransaction(event.data.transaction);
        break;
      case 'transaction.expired':
        // Handle expired transaction
        handleExpiredTransaction(event.data.transaction);
        break;
    }
    
    // Acknowledge receipt
    res.status(200).send('OK');
  } else {
    // Invalid signature
    res.status(401).send('Unauthorized');
  }
});

function verifyWebhookSignature(payload, signature) {
  // Implementation depends on your security requirements
  // See Security Best Practices section for details
  return true; // Placeholder
}

function fulfillOrder(transaction) {
  // Update your database
  // Send confirmation email
  // Activate service or ship product
  console.log('Fulfilling order:', transaction.metadata.orderId);
}

function handleFailedTransaction(transaction) {
  // Log failure for review
  // Notify customer if appropriate
  console.log('Transaction failed:', transaction.id);
}

function handleExpiredTransaction(transaction) {
  // Clean up temporary records
  // Optionally notify customer
  console.log('Transaction expired:', transaction.id);
}</code></pre>
      
      <h4>Webhook Best Practices</h4>
      <ul>
        <li>Always verify webhook signatures to ensure authenticity</li>
        <li>Use HTTPS endpoints for security</li>
        <li>Respond quickly (within 30 seconds) to acknowledge receipt</li>
        <li>Implement idempotency to handle duplicate notifications</li>
        <li>Log all webhook events for debugging and auditing</li>
        <li>Handle network errors gracefully with retry logic</li>
      </ul>
    `,
	},
	{
		id: 'api-reference',
		title: 'API Reference',
		content: `
      <h2>Complete API Reference</h2>
      <p>This comprehensive reference documents all available Payzee API endpoints, parameters, and response formats.</p>
      
      <h3>Authentication</h3>
      <p>All API requests require authentication using your API key and secret.</p>
      
      <h4>Headers</h4>
      <ul>
        <li><code>x-api-key</code> (required): Your merchant API key</li>
        <li><code>x-api-secret</code> (required): Your merchant API secret</li>
        <li><code>Content-Type</code> (required): <code>application/json</code></li>
      </ul>
      
      <h4>Base URL</h4>
      <p><code>https://api.payzee.com/v1</code></p>
      
      <h4>Rate Limits</h4>
      <p>API requests are rate-limited to prevent abuse:</p>
      <ul>
        <li>100 requests per minute per API key</li>
        <li>Automatic IP-based rate limiting</li>
        <li>429 status code returned when rate limit exceeded</li>
      </ul>
      
      <h3>Endpoints</h3>
      
      <h4>Create Transaction</h4>
      <p><code>POST /transaction</code></p>
      <p>Creates a new payment transaction and returns a payment URL.</p>
      
      <h5>Request Body</h5>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>amount</code></td>
            <td>integer</td>
            <td>Yes</td>
            <td>Amount in smallest currency unit (lamports for SOL)</td>
          </tr>
          <tr>
            <td><code>currency</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>Currency code (SOL, USDC)</td>
          </tr>
          <tr>
            <td><code>redirectUrl</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>URL to redirect after payment</td>
          </tr>
          <tr>
            <td><code>webhookUrl</code></td>
            <td>string</td>
            <td>No</td>
            <td>URL for transaction status notifications</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td>string</td>
            <td>No</td>
            <td>Description of payment for customer</td>
          </tr>
          <tr>
            <td><code>metadata</code></td>
            <td>object</td>
            <td>No</td>
            <td>Custom data associated with transaction</td>
          </tr>
        </tbody>
      </table>
      
      <h5>Request Example</h5>
      <pre><code class="language-json">{
  "amount": 100000000,
  "currency": "SOL",
  "redirectUrl": "https://yourwebsite.com/success",
  "webhookUrl": "https://yourwebsite.com/webhook",
  "description": "Premium Plan Subscription",
  "metadata": {
    "orderId": "12345",
    "customerId": "customer_abc"
  }
}</code></pre>
      
      <h5>Success Response</h5>
      <pre><code class="language-json">{
  "success": true,
  "transactionId": "txn_123456789",
  "paymentUrl": "https://payzee.com/pay/txn_123456789"
}</code></pre>
      
      <h5>Error Response</h5>
      <pre><code class="language-json">{
  "success": false,
  "message": "Invalid amount parameter"
}</code></pre>
      
      <h4>Get Transaction</h4>
      <p><code>GET /transaction/{transactionId}</code></p>
      <p>Retrieves detailed information about a specific transaction.</p>
      
      <h5>Path Parameters</h5>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>transactionId</code></td>
            <td>string</td>
            <td>Yes</td>
            <td>ID of the transaction to retrieve</td>
          </tr>
        </tbody>
      </table>
      
      <h5>Success Response</h5>
      <pre><code class="language-json">{
  "success": true,
  "transaction": {
    "id": "txn_123456789",
    "amount": 100000000,
    "currency": "SOL",
    "status": "paid",
    "description": "Premium Plan Subscription",
    "metadata": {
      "orderId": "12345",
      "customerId": "customer_abc"
    },
    "createdAt": "2023-01-01T12:00:00Z",
    "paidAt": "2023-01-01T12:00:30Z",
    "redirectUrl": "https://yourwebsite.com/success",
    "webhookUrl": "https://yourwebsite.com/webhook"
  }
}</code></pre>
      
      <h5>Error Response</h5>
      <pre><code class="language-json">{
  "success": false,
  "message": "Transaction not found"
}</code></pre>
      
      <h3>Webhook Events</h3>
      
      <h4>Transaction Created</h4>
      <p>Sent when a transaction is created but not yet paid.</p>
      <pre><code class="language-json">{
  "id": "wh_123456789",
  "event": "transaction.created",
  "created": "2023-01-01T12:00:00Z",
  "data": {
    "transaction": {
      "id": "txn_123456789",
      "amount": 100000000,
      "currency": "SOL",
      "status": "created",
      "description": "Premium Plan Subscription",
      "metadata": {
        "orderId": "12345",
        "customerId": "customer_abc"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "redirectUrl": "https://yourwebsite.com/success",
      "webhookUrl": "https://yourwebsite.com/webhook"
    }
  }
}</code></pre>
      
      <h4>Transaction Paid</h4>
      <p>Sent when a payment is successfully received.</p>
      <pre><code class="language-json">{
  "id": "wh_123456790",
  "event": "transaction.paid",
  "created": "2023-01-01T12:00:30Z",
  "data": {
    "transaction": {
      "id": "txn_123456789",
      "amount": 100000000,
      "currency": "SOL",
      "status": "paid",
      "description": "Premium Plan Subscription",
      "metadata": {
        "orderId": "12345",
        "customerId": "customer_abc"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "paidAt": "2023-01-01T12:00:30Z",
      "redirectUrl": "https://yourwebsite.com/success",
      "webhookUrl": "https://yourwebsite.com/webhook"
    }
  }
}</code></pre>
      
      <h4>Transaction Failed</h4>
      <p>Sent when a payment fails or is cancelled.</p>
      <pre><code class="language-json">{
  "id": "wh_123456791",
  "event": "transaction.failed",
  "created": "2023-01-01T12:05:00Z",
  "data": {
    "transaction": {
      "id": "txn_123456789",
      "amount": 100000000,
      "currency": "SOL",
      "status": "failed",
      "description": "Premium Plan Subscription",
      "metadata": {
        "orderId": "12345",
        "customerId": "customer_abc"
      },
      "createdAt": "2023-01-01T12:00:00Z",
      "failedAt": "2023-01-01T12:05:00Z",
      "redirectUrl": "https://yourwebsite.com/success",
      "webhookUrl": "https://yourwebsite.com/webhook"
    }
  }
}</code></pre>
    `,
	},
	{
		id: 'security',
		title: 'Security Best Practices',
		content: `
      <h2>Security Best Practices</h2>
      <p>Security is paramount when handling financial transactions. This guide covers essential security practices to protect your Payzee integration and your customers' data.</p>
      
      <h3>API Key Management</h3>
      <p>API keys are the foundation of your integration's security. Proper management is crucial.</p>
      
      <h4>Storage and Handling</h4>
      <ul>
        <li><strong>Never commit API keys to version control systems</strong> like Git</li>
        <li>Store keys in environment variables or secure vaults</li>
        <li>Use different keys for development, staging, and production</li>
        <li>Restrict access to keys on a need-to-know basis</li>
        <li>Regularly audit who has access to your API keys</li>
      </ul>
      
      <h4>Key Rotation</h4>
      <ul>
        <li>Rotate API keys regularly (every 90 days recommended)</li>
        <li>Immediately regenerate keys if you suspect a compromise</li>
        <li>Implement a process for secure key distribution</li>
        <li>Keep a record of key generation dates and purposes</li>
      </ul>
      
      <h4>Access Control</h4>
      <ul>
        <li>Limit API key permissions to only what's necessary</li>
        <li>Use separate keys for different applications or services</li>
        <li>Monitor API key usage through logs and analytics</li>
        <li>Disable unused or unnecessary API keys</li>
      </ul>
      
      <h3>Webhook Validation</h3>
      <p>Webhooks provide real-time transaction updates but must be secured to prevent malicious activity.</p>
      
      <h4>Signature Verification</h4>
      <p>Payzee signs all webhook requests with a cryptographic signature:</p>
      <ul>
        <li>Check for the <code>x-webhook-signature</code> header in requests</li>
        <li>Verify the signature using your API secret</li>
        <li>Reject requests with invalid signatures</li>
        <li>Log signature verification failures for investigation</li>
      </ul>
      
      <h4>Implementation Example</h4>
      <pre><code class="language-javascript">const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  // Create expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  // Compare signatures securely
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Usage in webhook handler
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = req.body;
  const secret = process.env.PAYZEE_API_SECRET;
  
  if (verifyWebhookSignature(payload, signature, secret)) {
    // Process valid webhook
    const event = JSON.parse(payload);
    handleWebhookEvent(event);
    res.status(200).send('OK');
  } else {
    // Reject invalid webhook
    res.status(401).send('Unauthorized');
  }
});</code></pre>
      
      <h4>Additional Security Measures</h4>
      <ul>
        <li>Only accept webhooks from verified Payzee IP addresses</li>
        <li>Implement rate limiting for webhook endpoints</li>
        <li>Use HTTPS with valid SSL certificates</li>
        <li>Log all webhook requests for auditing</li>
        <li>Handle duplicate notifications with idempotency</li>
      </ul>
      
      <h3>Transaction Verification</h3>
      <p>Never rely solely on client-side confirmation for financial transactions.</p>
      
      <h4>Server-Side Validation</h4>
      <ul>
        <li>Always verify transaction status through webhooks or API calls</li>
        <li>Check transaction amounts match expected values</li>
        <li>Validate transaction metadata to prevent tampering</li>
        <li>Implement timeout handling for pending transactions</li>
      </ul>
      
      <h4>Double-Check Process</h4>
      <pre><code class="language-javascript">async function verifyTransaction(transactionId) {
  try {
    const response = await fetch(\`https://api.payzee.com/v1/transaction/\${transactionId}\`, {
      headers: {
        'x-api-key': process.env.PAYZEE_API_KEY,
        'x-api-secret': process.env.PAYZEE_API_SECRET
      }
    });
    
    const data = await response.json();
    
    if (data.success && data.transaction.status === 'paid') {
      // Additional validation
      if (data.transaction.amount >= expectedAmount) {
        return data.transaction;
      } else {
        throw new Error('Transaction amount mismatch');
      }
    } else {
      throw new Error('Transaction not paid');
    }
  } catch (error) {
    console.error('Transaction verification failed:', error);
    throw error;
  }
}

// Usage after webhook notification
app.post('/webhook', /* ... */, async (req, res) => {
  const event = JSON.parse(req.body);
  
  if (event.event === 'transaction.paid') {
    try {
      const transaction = await verifyTransaction(event.data.transaction.id);
      // Process verified transaction
      fulfillOrder(transaction);
      res.status(200).send('OK');
    } catch (error) {
      // Log verification failure
      console.error('Verification failed:', error);
      res.status(400).send('Verification failed');
    }
  }
});</code></pre>
      
      <h3>Data Protection</h3>
      <p>Protect sensitive customer and transaction data.</p>
      
      <h4>Encryption</h4>
      <ul>
        <li>Encrypt sensitive data at rest and in transit</li>
        <li>Use TLS 1.2 or higher for all connections</li>
        <li>Implement field-level encryption for PII</li>
        <li>Regularly update SSL certificates</li>
      </ul>
      
      <h4>Data Minimization</h4>
      <ul>
        <li>Only collect data necessary for transactions</li>
        <li>Remove or anonymize data when no longer needed</li>
        <li>Implement data retention policies</li>
        <li>Regularly audit data storage practices</li>
      </ul>
      
      <div class="docs-warning">
        <p><strong>Security Notice:</strong> Failure to implement proper security measures can result in financial losses, data breaches, and regulatory penalties. Always validate transactions server-side and never trust client-side confirmations alone.</p>
      </div>
    `,
	},
	{
		id: 'troubleshooting',
		title: 'Troubleshooting Guide',
		content: `
      <h2>Troubleshooting Guide</h2>
      <p>This guide helps you identify and resolve common issues with Payzee integration.</p>
      
      <h3>Common Authentication Issues</h3>
      
      <h4>Invalid API Key or Secret</h4>
      <p><strong>Problem:</strong> API requests return 401 Unauthorized errors</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify your API key and secret are correct</li>
        <li>Check that you haven't accidentally swapped key and secret</li>
        <li>Ensure there are no extra spaces or characters</li>
        <li>Confirm you're using the correct environment (test vs production)</li>
        <li>Check if your keys have been rotated recently</li>
      </ul>
      
      <h4>Missing Headers</h4>
      <p><strong>Problem:</strong> API requests return 400 Bad Request errors</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Ensure all required headers are included</li>
        <li>Verify <code>Content-Type: application/json</code> is set</li>
        <li>Check header names are spelled correctly</li>
        <li>Confirm headers are properly formatted</li>
      </ul>
      
      <h3>Transaction Creation Problems</h3>
      
      <h4>Invalid Amount</h4>
      <p><strong>Problem:</strong> Transaction creation fails with "Invalid amount" error</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Ensure amount is a positive integer</li>
        <li>Verify you're using the correct unit (lamports for SOL)</li>
        <li>Check that the amount is within acceptable limits</li>
        <li>Confirm the amount parameter is not null or undefined</li>
      </ul>
      <pre><code class="language-javascript">// Correct amount format
const correctAmount = 100000000; // 1 SOL in lamports

// Incorrect amount formats
const incorrectAmount1 = "100000000"; // String instead of number
const incorrectAmount2 = 1.5; // Decimal instead of integer
const incorrectAmount3 = -100000000; // Negative amount</code></pre>
      
      <h4>Invalid Redirect URL</h4>
      <p><strong>Problem:</strong> Transaction creation fails with "Invalid redirect URL" error</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Ensure the URL is properly formatted with protocol (https://)</li>
        <li>Verify the domain is accessible from the public internet</li>
        <li>Check that the URL is not blocked by firewalls</li>
        <li>Confirm the URL path is valid</li>
      </ul>
      
      <h4>Missing Required Parameters</h4>
      <p><strong>Problem:</strong> Transaction creation fails with "Missing required parameter" error</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify all required parameters are included</li>
        <li>Check for typos in parameter names</li>
        <li>Ensure parameters are not null or empty strings</li>
        <li>Confirm nested objects like metadata are properly formatted</li>
      </ul>
      
      <h3>Webhook Delivery Issues</h3>
      
      <h4>Webhook Not Received</h4>
      <p><strong>Problem:</strong> Webhooks are not being delivered to your endpoint</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify your webhook URL is accessible from the public internet</li>
        <li>Check that your server is running and accepting connections</li>
        <li>Ensure your endpoint responds with HTTP 200 to valid webhooks</li>
        <li>Review webhook logs in your merchant dashboard</li>
        <li>Check for firewall or security group restrictions</li>
      </ul>
      
      <h4>Webhook Verification Fails</h4>
      <p><strong>Problem:</strong> Webhook signature verification fails</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify you're using the correct API secret for signature verification</li>
        <li>Ensure you're using the raw request body for signature calculation</li>
        <li>Check that your signature verification implementation is correct</li>
        <li>Confirm you're using the right hashing algorithm (SHA-256 HMAC)</li>
      </ul>
      
      <h4>Webhook Timeout</h4>
      <p><strong>Problem:</strong> Webhooks are timing out or returning errors</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Optimize your webhook handler to respond within 30 seconds</li>
        <li>Move long-running processes to background jobs</li>
        <li>Implement proper error handling and logging</li>
        <li>Ensure your server has adequate resources</li>
      </ul>
      
      <h3>Payment Page Issues</h3>
      
      <h4>Payment Page Not Loading</h4>
      <p><strong>Problem:</strong> Customers see errors when trying to pay</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify the transaction ID in the payment URL is valid</li>
        <li>Check that the transaction hasn't expired</li>
        <li>Ensure the transaction status is "created" (not paid or failed)</li>
        <li>Contact support if the issue persists</li>
      </ul>
      
      <h4>Payment Fails Unexpectedly</h4>
      <p><strong>Problem:</strong> Payments fail during the customer checkout process</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify the customer's wallet has sufficient balance</li>
        <li>Check that the wallet supports the transaction currency</li>
        <li>Ensure the customer's wallet is connected and unlocked</li>
        <li>Advise customers to check their network connection</li>
      </ul>
      
      <h3>Development and Testing</h3>
      
      <h4>Sandbox Environment Issues</h4>
      <p><strong>Problem:</strong> Test transactions behave differently than expected</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Ensure you're using the correct sandbox API endpoints</li>
        <li>Verify you're using test API credentials</li>
        <li>Check that your test wallet has sufficient test tokens</li>
        <li>Confirm test transactions are being created correctly</li>
      </ul>
      
      <h4>Rate Limiting</h4>
      <p><strong>Problem:</strong> API requests return 429 Too Many Requests errors</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Implement exponential backoff for retry logic</li>
        <li>Batch requests when possible</li>
        <li>Cache responses to reduce API calls</li>
        <li>Contact support for higher rate limits if needed</li>
      </ul>
      
      <h3>Advanced Debugging</h3>
      
      <h4>Logging Best Practices</h4>
      <ul>
        <li>Log all API requests and responses (excluding sensitive data)</li>
        <li>Include timestamps and correlation IDs in logs</li>
        <li>Log webhook receipt and processing status</li>
        <li>Store logs securely for compliance and debugging</li>
      </ul>
      
      <h4>Using the Dashboard</h4>
      <ul>
        <li>Check transaction history for status information</li>
        <li>Review webhook delivery logs for debugging</li>
        <li>Monitor API usage and rate limits</li>
        <li>Use project settings to verify configurations</li>
      </ul>
      
      <h3>Support Resources</h3>
      
      <h4>When to Contact Support</h4>
      <p>Contact our support team for:</p>
      <ul>
        <li>Persistent technical issues not resolved by this guide</li>
        <li>Account-related problems</li>
        <li>Security concerns or suspected compromises</li>
        <li>Feature requests or feedback</li>
        <li>Billing inquiries</li>
      </ul>
      
      <h4>Contact Information</h4>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:support@payzee.com">support@payzee.com</a></li>
        <li><strong>Response Time:</strong> Within 24 hours for all inquiries</li>
        <li><strong>Emergency:</strong> For critical security issues, contact security@payzee.com</li>
      </ul>
      
      <h4>Community Resources</h4>
      <ul>
        <li>GitHub repository with example integrations</li>
        <li>Developer community forum</li>
        <li>Regular webinars and training sessions</li>
        <li>Comprehensive API documentation</li>
      </ul>
      
      <div class="docs-note">
        <p><strong>Pro Tip:</strong> Enable detailed logging in your webhook handler during development to help diagnose issues. Always sanitize logs to remove sensitive information before storing or sharing.</p>
      </div>
    `,
	},
];

export default documentationSections;
