const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration - Allow all GitHub Pages origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://arturprzybylo.github.io',
      'https://arturprzybyloo.github.io', // Fixed typo - double 'o'
      'https://arturprzybylo.github.io/TestingForge',
      'https://arturprzybyloo.github.io/TestingForge'
    ];
    
    // Check if origin is allowed or contains github.io
    if (allowedOrigins.includes(origin) || origin.includes('github.io')) {
      console.log(`✅ CORS allowed origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url} from origin: ${req.headers.origin || 'no-origin'}`);
  console.log(`🔍 Referer: ${req.headers.referer || 'no-referer'}`);
  next();
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qa-learning-platform');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/submissions', require('./routes/submissions'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'QA Learning Platform API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 