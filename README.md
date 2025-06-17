# 🧪 Testing Forge - QA Learning Platform

<div align="center">

![Testing Forge Logo](https://img.shields.io/badge/Testing-Forge-green?style=for-the-badge&logo=react)

**Interactive platform for mastering software testing skills with AI-powered challenges**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square)](https://arturprzybylo.github.io/TestingForge/)
[![Backend API](https://img.shields.io/badge/Backend-API-green?style=flat-square)](https://testingforge.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Live Platform](https://arturprzybylo.github.io/TestingForge/) • [📚 Documentation](#documentation) • [🚀 Getting Started](#getting-started)

</div>

## 📖 About

Testing Forge is a comprehensive learning platform designed for QA professionals and aspiring testers. It combines interactive challenges, real-world scenarios, and modern testing tools to help users master software testing skills.

### ✨ Key Features

- 🎯 **18+ Interactive Challenges** - Hands-on testing scenarios covering UI, API, DevTools, and more
- 🤖 **AI-Powered Learning** - Intelligent feedback and personalized guidance
- 🎮 **Automation Playground** - Practice test automation with real scenarios
- 📚 **Learning Paths** - Structured courses from beginner to advanced
- 🏆 **Progress Tracking** - Detailed dashboards, points system, and achievements
- 👥 **Community Features** - Connect with fellow testers and share experiences
- 🌍 **Multi-language Support** - Available in English and Polish
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Heroicons** for icons
- **i18next** for internationalization

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Deployment
- **Frontend**: GitHub Pages
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/ArturPrzybyloo/TestingForge.git
cd TestingForge
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start backend server
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Start development server
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3002

### Environment Variables

#### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/qa-learning-platform
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3002
NODE_ENV=development
```

#### Frontend (optional)
```bash
REACT_APP_API_URL=http://localhost:3002/api
```

## 🎯 Challenge Categories

### 🖥️ UI Testing
- Element inspection and interaction
- Form validation and edge cases
- CSS debugging and layout issues
- Accessibility auditing

### 🔌 API Testing
- REST endpoint validation
- Request/response analysis
- Authentication testing
- Network timing analysis

### 🌐 Browser DevTools
- Console debugging
- Network monitoring
- Element highlighting
- Local storage manipulation

### 🔧 Automation Practice
- Drag & drop operations
- File upload/download
- Dynamic content handling
- Cross-browser compatibility

## 📱 Features Overview

### For Learners
- **Interactive Challenges**: Solve real-world testing scenarios
- **Skill Progression**: Track your learning journey with points and levels
- **Automation Playground**: Practice with Selenium, Playwright, and Cypress scenarios
- **DevTools Mastery**: Learn browser developer tools effectively

### For Educators
- **Challenge Management**: Create and manage testing scenarios
- **Progress Analytics**: Monitor student progress and engagement
- **Community Building**: Foster collaboration among learners

### For Professionals
- **Skill Validation**: Demonstrate testing expertise
- **Continuous Learning**: Stay updated with latest testing techniques
- **Portfolio Building**: Showcase completed challenges and achievements

## 🌐 Deployment

### Backend (Render)
1. Connect GitHub repository to Render
2. Configure environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET` 
   - `NODE_ENV=production`
3. Deploy from `backend` directory

### Frontend (GitHub Pages)
1. Push changes to GitHub
2. Enable GitHub Pages in repository settings
3. Select source branch for deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Community** for excellent documentation and tools
- **MongoDB** for robust database solutions
- **Render** for reliable hosting services
- **GitHub** for version control and Pages hosting
- **Heroicons** for beautiful icon set
- **Tailwind CSS** for utility-first CSS framework

## 📞 Support

- 📧 Email: support@testingforge.com
- 💬 Community: [Join our Discord](https://discord.gg/testingforge)
- 🐛 Issues: [GitHub Issues](https://github.com/ArturPrzybyloo/TestingForge/issues)
- 📖 Docs: [Documentation](https://docs.testingforge.com)

---

<div align="center">

**Made with ❤️ for the QA Community**

⭐ Star this repo if you find it helpful!

</div> 