const mongoose = require('mongoose');
const User = require('./models/User');
const Challenge = require('./models/Challenge');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qa-learning-platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Challenge.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@qa-platform.com',
      password: 'admin123',
      isAdmin: true,
      role: 'admin'
    });
    console.log('Created admin user');

    // Create sample challenges
    const challenges = [
      {
        id: 'missing-button',
        title: 'Missing Submit Button',
        description: 'Find the missing submit button on this form. The button should be visible and clickable.',
        category: 'accessibility',
        difficulty: 'easy',
        points: 10,
        flag: 'BUTTON_MISSING',
        hints: ['Look for display:none or visibility:hidden styles', 'Check if the button element exists in the DOM'],
        tags: ['ui', 'form', 'button']
      },
      {
        id: 'broken-api',
        title: 'API Authentication Error',
        description: 'This API endpoint is returning 401 errors. Find what\'s wrong with the authentication.',
        category: 'functionality',
        difficulty: 'medium',
        points: 25,
        flag: 'INVALID_TOKEN',
        hints: ['Check the Authorization header format', 'Verify the token is being sent correctly'],
        tags: ['api', 'auth', 'security']
      },
      {
        id: 'slow-page',
        title: 'Performance Issue',
        description: 'This page loads very slowly. Identify the performance bottleneck.',
        category: 'performance',
        difficulty: 'medium',
        points: 30,
        flag: 'LARGE_IMAGE',
        hints: ['Check network tab for slow requests', 'Look for unoptimized images or scripts'],
        tags: ['performance', 'optimization', 'images']
      },
      {
        id: 'xss-vulnerability',
        title: 'XSS Vulnerability',
        description: 'Find and exploit the Cross-Site Scripting vulnerability in the search form.',
        category: 'security',
        difficulty: 'hard',
        points: 50,
        flag: 'XSS_FOUND',
        hints: ['Try injecting scripts in input fields', 'Look for unescaped user input'],
        tags: ['security', 'xss', 'vulnerability']
      },
      {
        id: 'color-contrast',
        title: 'Poor Color Contrast',
        description: 'The text on this page has poor color contrast. Identify the WCAG violation.',
        category: 'accessibility',
        difficulty: 'easy',
        points: 15,
        flag: 'LOW_CONTRAST',
        hints: ['Use browser developer tools to check contrast ratios', 'Look for text that\'s hard to read'],
        tags: ['accessibility', 'wcag', 'contrast']
      },
      {
        id: 'mobile-responsive',
        title: 'Mobile Responsiveness Issue',
        description: 'This page doesn\'t display correctly on mobile devices. Find the responsive design flaw.',
        category: 'usability',
        difficulty: 'medium',
        points: 20,
        flag: 'NO_VIEWPORT',
        hints: ['Check viewport meta tag', 'Test on different screen sizes'],
        tags: ['mobile', 'responsive', 'css']
      }
    ];

    await Challenge.insertMany(challenges);
    console.log('Created sample challenges');

    console.log('\n=== Database Seeded Successfully ===');
    console.log(`Admin User: admin@qa-platform.com / admin123`);
    console.log(`Created ${challenges.length} challenges`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 