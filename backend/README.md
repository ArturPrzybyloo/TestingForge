# 🔧 Testing Forge - Backend API

Backend API for the Testing Forge QA Learning Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- 🔐 **User Authentication** - JWT-based register/login system
- 🎯 **Challenge Management** - CRUD operations for testing challenges
- 📝 **Flag Submission** - Secure flag validation and scoring
- 📊 **Progress Tracking** - User progress and statistics
- 🏆 **Leaderboard** - Global rankings and achievements
- 👑 **Admin Panel** - Challenge and user management
- 🌐 **CORS Support** - Cross-origin requests for frontend integration
- 🔒 **Security** - Password hashing, input validation, and authentication middleware

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your `.env` file:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/qa-learning-platform
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=30d
PORT=3002
NODE_ENV=development
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will be running at `http://localhost:3002`

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:3002/api`
- **Production**: `https://testingforge.onrender.com/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Challenge Endpoints

#### Get All Challenges
```http
GET /api/challenges
Authorization: Bearer <jwt_token>
```

#### Get Single Challenge
```http
GET /api/challenges/:id
Authorization: Bearer <jwt_token>
```

#### Create Challenge (Admin Only)
```http
POST /api/challenges
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "id": "challenge-id",
  "title": "Challenge Title",
  "description": "Challenge description",
  "category": "UI Testing",
  "difficulty": "Medium",
  "points": 15,
  "flag": "FLAG{correct_answer}",
  "hints": ["Hint 1", "Hint 2"],
  "tags": ["tag1", "tag2"]
}
```

#### Update Challenge (Admin Only)
```http
PUT /api/challenges/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Delete Challenge (Admin Only)
```http
DELETE /api/challenges/:id
Authorization: Bearer <jwt_token>
```

### Submission Endpoints

#### Submit Flag
```http
POST /api/submissions
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "challengeId": "challenge-id",
  "flag": "FLAG{user_answer}"
}
```

#### Get User Progress
```http
GET /api/submissions/my-progress
Authorization: Bearer <jwt_token>
```

#### Get Leaderboard
```http
GET /api/submissions/leaderboard
Authorization: Bearer <jwt_token>
```

## 🗄️ Database Models

### User Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: false),
  role: String (default: 'user'),
  progress: {
    completedChallenges: [String],
    totalPoints: Number (default: 0),
    level: String (default: 'Beginner')
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Challenge Schema
```javascript
{
  id: String (required, unique),
  title: String (required),
  description: String (required),
  category: String (required),
  difficulty: String (required),
  points: Number (required),
  flag: String (required),
  hints: [String],
  tags: [String],
  isActive: Boolean (default: true),
  completionCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Render Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Render
   - Select the `backend` directory as the root

2. **Configure Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

3. **Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | - |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | ❌ | `30d` |
| `PORT` | Server port | ❌ | `3002` |
| `NODE_ENV` | Environment mode | ❌ | `development` |

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request data validation
- **CORS Configuration** - Secure cross-origin requests
- **Environment Variables** - Sensitive data protection
- **Admin Authorization** - Role-based access control

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Manual API Testing
```bash
# Test server health
curl http://localhost:3002/api/health

# Test authentication
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## 📈 Performance

- **Database Indexing** - Optimized queries
- **Middleware Optimization** - Efficient request handling
- **Error Handling** - Graceful error responses
- **Logging** - Request and error logging

## 🤝 Contributing

Please read the main [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on contributing to this project.

### Backend-Specific Guidelines

1. **API Design** - Follow RESTful conventions
2. **Error Handling** - Use consistent error responses
3. **Validation** - Validate all input data
4. **Security** - Follow security best practices
5. **Documentation** - Update API docs for changes

## 📞 Support

For backend-specific issues:
- 🐛 [Report Issues](https://github.com/ArturPrzybyloo/TestingForge/issues)
- 💬 [Discussions](https://github.com/ArturPrzybyloo/TestingForge/discussions)
- 📧 Email: backend@testingforge.com

---

**Part of the Testing Forge QA Learning Platform** 🧪 