# Payzee - A Solana Payments App

Payzee is a decentralized payments application built on the **Solana blockchain**. It allows users to **create wallets, sign transactions, and manage payments** seamlessly. The backend is powered by **Node.js, Express, and @solana/web3.js**, while the frontend provides an intuitive user interface for interacting with the blockchain.

## Features

- **User Authentication**: Sign in & sign out functionality.
- **Wallet Management**: Users can create and manage their Solana wallets.
- **Transaction Handling**: Secure transaction signing using `@solana/web3.js`.
- **Dashboard**: Provides an overview of user wallets and transactions.
- **Tutorials Page**: Educates users on using Solana and the app.

## Application Flow

Below is the overall architecture and flow of the Payzee app:

![Application Flow](/flowchart.png)

## Tech Stack

### Frontend:

- React.js
- Tailwind CSS (for styling)

### Backend:

- Node.js & Express.js
- @solana/web3.js (Solana blockchain integration)
- MongoDB to store meta data

## Installation & Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-repo/payzee.git
   cd payzee
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file and add:

   ```env
   MONGODB_URL =your_database_url
   SECRET=your_secret_key
   ```

4. **Run Backend Server:**

   ```sh
   cd server
   node index.js
   ```

5. **Run Frontend:**
   ```sh
   cd client
   npm run dev
   ```

## API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/user/signup`     | User Signup          |
| POST   | `/api/user/signin`     | User Login           |
| POST   | `/api/account/create`  | Create Solana Wallet |
| GET    | `/api/account/balance` | Fetch User Wallet    |
| POST   | `/api/transaction/`    | Send Transaction     |

## Future Enhancements

- Add options to create tokens
- Multi-wallet support
- Implement tokenization of real world assets
- Integrate with Solana Pay for seamless payments

## Contributing

Feel free to fork this repository, create issues, or submit pull requests to improve the project.

## License

This project is licensed under the **MIT License**.
