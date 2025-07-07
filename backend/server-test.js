const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for users (in real app this would be in database)
const mockUsers = [
  {
    _id: '1',
    username: 'admin',
    email: 'test@testing-forge.com',
    password: 'test1234', // In real app, this would be hashed
    isAdmin: true,
    completedChallenges: [1, 2],
    createdAt: new Date().toISOString()
  }
];

// Mock data for user progress
const userProgress = {};

// Mock data for challenges
const mockChallenges = [
  {
    _id: '1',
    id: 1,
    title: 'Caesar Cipher Decoder',
    description: 'Decode the hidden message using Caesar cipher',
    category: 'cryptography',
    difficulty: 'easy',
    isActive: true,
    points: 50,
    tags: ['cryptography', 'cipher', 'beginner'],
    hints: ['Try different shift values', 'Look for common English words'],
    completionCount: 42
  },
  {
    _id: '2',
    id: 2,
    title: 'Order System Bug',
    description: 'Find and report the bug in the order system',
    category: 'bug-hunting',
    difficulty: 'medium',
    isActive: true,
    points: 100,
    tags: ['bug-hunting', 'debugging', 'e-commerce'],
    hints: ['Check the cart calculation', 'Look at the checkout flow'],
    completionCount: 28
  },
  {
    _id: '3',
    id: 3,
    title: 'UI Bug Detective',
    description: 'Identify UI/UX issues in the interface',
    category: 'ui-testing',
    difficulty: 'easy',
    isActive: true,
    points: 75,
    tags: ['ui-testing', 'ux', 'visual-bugs'],
    hints: ['Check different screen sizes', 'Look for alignment issues'],
    completionCount: 35
  },
  {
    _id: '18',
    id: 18,
    title: 'Accessibility Audit',
    description: 'Perform an accessibility audit of the website',
    category: 'accessibility',
    difficulty: 'medium',
    isActive: true,
    points: 120,
    tags: ['accessibility', 'a11y', 'wcag'],
    hints: ['Use screen reader tools', 'Check keyboard navigation'],
    completionCount: 15
  }
];

// Helper function to generate mock JWT token
const generateMockToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };
  return `mock.${btoa(JSON.stringify(payload))}.signature`;
};

// Test routes without database
app.get('/', (req, res) => {
  res.json({ 
    message: 'QA Learning Platform API - Test Mode', 
    status: 'running',
    port: process.env.PORT || 5000,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!',
    endpoints: [
      'GET /',
      'GET /api/test',
      'GET /api/health',
      'GET /api/challenges',
      'GET /api/challenges/:id',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'POST /api/submissions',
      'GET /api/user/progress'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  });
});

// Mock challenges endpoints
app.get('/api/challenges', (req, res) => {
  const { category, difficulty, limit = 20, skip = 0 } = req.query;
  
  let filteredChallenges = mockChallenges.filter(challenge => challenge.isActive);
  
  if (category) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      challenge.category === category
    );
  }
  
  if (difficulty) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      challenge.difficulty === difficulty
    );
  }
  
  const startIndex = parseInt(skip);
  const endIndex = startIndex + parseInt(limit);
  const paginatedChallenges = filteredChallenges.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    count: paginatedChallenges.length,
    total: filteredChallenges.length,
    data: paginatedChallenges
  });
});

app.get('/api/challenges/:id', (req, res) => {
  const challenge = mockChallenges.find(c => c.id === parseInt(req.params.id));
  
  if (!challenge) {
    return res.status(404).json({ 
      success: false,
      message: 'Challenge not found' 
    });
  }
  
  res.json({
    success: true,
    data: challenge
  });
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username, email, and password are required'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email || u.username === username);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or username already exists'
    });
  }
  
  // Create new user
  const newUser = {
    _id: (mockUsers.length + 1).toString(),
    username,
    email,
    password, // In real app, hash this
    isAdmin: false,
    completedChallenges: [],
    createdAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  // Initialize user progress
  userProgress[newUser._id] = {
    completedChallenges: [],
    totalPoints: 0,
    achievements: []
  };
  
  const token = generateMockToken(newUser);
  
  res.status(201).json({
    success: true,
    token,
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Find user
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
  
  // Check password (in real app, compare hashed passwords)
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
  
  const token = generateMockToken(user);
  
  res.json({
    success: true,
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
});

// Get user profile (requires token)
app.get('/api/auth/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    const user = mockUsers.find(u => u._id === payload._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Mock submissions endpoint
app.post('/api/submissions', (req, res) => {
  const { challengeId, flag } = req.body;
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload._id;
    
    // Mock flag validation (in real app, this would be more sophisticated)
    const challenge = mockChallenges.find(c => c.id === parseInt(challengeId));
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Simple mock validation - correct if flag contains "flag" or is longer than 8 chars
    const isCorrect = flag && (flag.toLowerCase().includes('flag') || flag.length > 8);
    
    if (isCorrect) {
      // Initialize user progress if not exists
      if (!userProgress[userId]) {
        userProgress[userId] = {
          completedChallenges: [],
          totalPoints: 0,
          achievements: []
        };
      }
      
      // Check if already completed
      const alreadyCompleted = userProgress[userId].completedChallenges.includes(parseInt(challengeId));
      
      if (!alreadyCompleted) {
        userProgress[userId].completedChallenges.push(parseInt(challengeId));
        userProgress[userId].totalPoints += challenge.points;
        
        // Update user's completed challenges
        const user = mockUsers.find(u => u._id === userId);
        if (user && !user.completedChallenges.includes(parseInt(challengeId))) {
          user.completedChallenges.push(parseInt(challengeId));
        }
      }
    }
    
    res.json({
      success: true,
      correct: isCorrect,
      message: isCorrect ? 'Correct flag! Challenge completed!' : 'Incorrect flag, try again.',
      points: isCorrect && !userProgress[userId]?.completedChallenges.includes(parseInt(challengeId)) ? challenge.points : 0,
      alreadyCompleted: isCorrect && userProgress[userId]?.completedChallenges.includes(parseInt(challengeId))
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Get user progress
app.get('/api/user/progress', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload._id;
    
    const progress = userProgress[userId] || {
      completedChallenges: [],
      totalPoints: 0,
      achievements: []
    };
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`Challenges endpoint: http://localhost:${PORT}/api/challenges`);
});