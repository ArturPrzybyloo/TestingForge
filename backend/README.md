# QA Learning Platform - Backend

Backend API for the QA Learning Platform built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Challenge management system
- Flag submission and validation
- Progress tracking and leaderboard
- Admin panel for challenge management

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
cp .env.example .env
```

4. Update `.env` file with your configuration:
```bash
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

5. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Challenges
- `GET /api/challenges` - Get all challenges
- `GET /api/challenges/:id` - Get single challenge
- `POST /api/challenges` - Create challenge (Admin only)
- `PUT /api/challenges/:id` - Update challenge (Admin only)
- `DELETE /api/challenges/:id` - Delete challenge (Admin only)

### Submissions
- `POST /api/submissions` - Submit flag for challenge
- `GET /api/submissions/my-progress` - Get user progress
- `GET /api/submissions/leaderboard` - Get leaderboard

## Deployment on Render

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your secret key
   - `NODE_ENV=production`
3. Deploy!

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/qa-learning-platform` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration | `30d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

## Database Models

### User
- username, email, password
- isAdmin, role
- progress (completedChallenges, totalPoints, level)

### Challenge
- id, title, description
- category, difficulty, points
- flag, hints, tags
- isActive, completionCount

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request 