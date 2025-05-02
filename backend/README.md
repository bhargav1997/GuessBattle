# GuessBattle Backend

This is the backend API for the GuessBattle game, a multiplayer number guessing game with casino/poker styling.

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js          # Main application file
├── .env                # Environment variables
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Key Features

1. **Authentication System**
   - JWT-based authentication
   - Email verification
   - Password reset functionality
   - Refresh tokens

2. **User Management**
   - User profiles
   - Role-based access control (user, admin, superadmin)

3. **Wallet & Chips System**
   - Buy chips with real money
   - Convert chips back to wallet (with admin approval)
   - Transaction history

4. **Game Table Engine**
   - Create and join game tables
   - Place guesses
   - Secure random number generation
   - Evaluate winners and distribute winnings

5. **Admin Panel**
   - User management
   - Game management
   - Transaction approval
   - Dashboard with statistics

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `PATCH /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/refresh-token` - Refresh access token

### User

- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update user profile
- `PATCH /api/users/change-password` - Change password
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/leaderboard` - Get leaderboard

### Wallet

- `POST /api/wallet/buy-chips` - Buy chips
- `POST /api/wallet/sell-chips` - Sell chips (convert to wallet)
- `GET /api/wallet/transactions` - Get transaction history

### Game

- `GET /api/games/active` - Get active game tables
- `GET /api/games/waiting` - Get waiting game tables
- `GET /api/games/:gameTableId` - Get game details
- `POST /api/games/create` - Create a new game table
- `POST /api/games/join` - Join a game table
- `POST /api/games/guess` - Place a guess
- `GET /api/games/history` - Get user's game history

### Admin

- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get user details
- `PATCH /api/admin/users/:userId` - Update user
- `GET /api/admin/games` - Get all game tables
- `GET /api/admin/games/:gameTableId` - Get game table details
- `GET /api/admin/transactions/pending` - Get pending transactions
- `GET /api/admin/logs` - Get admin logs
- `PATCH /api/wallet/approve-sell/:transactionId` - Approve chip sell request
- `PATCH /api/wallet/reject-sell/:transactionId` - Reject chip sell request
- `POST /api/games/:gameTableId/evaluate` - Evaluate game (admin only)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the development server: `npm run dev`

## Environment Variables

```
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Commission Rate
COMMISSION_RATE=5

# Stripe API Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Game Flow

1. User creates or joins a game table
2. When minimum players are reached, game starts
3. Players place their guesses (EXACT, CLOSE, EVEN/ODD, ABOVE_50/BELOW_50)
4. After 30 seconds, a random number is generated
5. Winners are evaluated based on their guesses
6. Commission is deducted from the pot
7. Winnings are distributed to winners
8. Game results are logged

## Security Measures

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting to prevent brute force attacks
- Input validation
- Role-based access control
- Secure random number generation
- Transaction logging
