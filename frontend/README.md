# 🎨 Testing Forge - Frontend

React TypeScript frontend for the Testing Forge QA Learning Platform with modern UI and responsive design.

## 🚀 Features

- 🎯 **Interactive Challenges** - 18+ hands-on testing scenarios
- 🎮 **Automation Playground** - Practice test automation scenarios
- 📚 **Learning Modules** - Structured DevTools courses
- 🏆 **Progress Tracking** - Dashboard with points and achievements
- 🌍 **Multi-language** - English and Polish support
- 📱 **Responsive Design** - Mobile-first approach
- 🔐 **Authentication** - JWT-based login system
- 🎨 **Modern UI** - Tailwind CSS with beautiful components

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **i18next** - Internationalization
- **Axios** - HTTP client for API calls

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables (optional)**
```bash
# Create .env file for custom API URL
echo "REACT_APP_API_URL=http://localhost:3002/api" > .env
```

4. **Start development server**
```bash
npm start
```

The app will be running at `http://localhost:3000`

## 🎯 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── challenges/           # Challenge components
│   ├── Challenge1Caesar.tsx
│   ├── Challenge2Order.tsx
│   └── ...
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── forum/          # Community components
│   ├── BackButton.tsx
│   └── Logo.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom hooks
│   └── useFlagSubmission.ts
├── layouts/            # Layout components
│   ├── AdminLayout.tsx
│   └── MainLayout.tsx
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── tester-challenges/ # Tester challenges
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   └── ...
├── services/           # API services
│   └── api.ts
├── styles/             # CSS files
│   └── challenges.css
├── utils/              # Utility functions
│   └── testerProgress.ts
├── App.tsx             # Main app component
├── i18n.ts            # Internationalization config
└── index.tsx          # App entry point
```

## 🎨 Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        // ... custom colors
      }
    }
  }
}
```

### Custom CSS
Additional styles are in `src/styles/challenges.css` for challenge-specific styling.

## 🌍 Internationalization

The app supports multiple languages using i18next:

```typescript
// Adding new translations
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Testing Forge",
      // ... more translations
    }
  },
  pl: {
    translation: {
      "welcome": "Witaj w Testing Forge",
      // ... more translations
    }
  }
}
```

### Supported Languages
- 🇺🇸 English (default)
- 🇵🇱 Polish

## 🔐 Authentication

The app uses JWT-based authentication with React Context:

```typescript
// Using auth context
const { user, login, logout, isAuthenticated } = useAuth();
```

### Protected Routes
- `/challenges` - Requires authentication
- `/learn` - Requires authentication
- `/dashboard` - Requires authentication
- `/automation-playground` - Requires authentication

## 🎯 Challenge System

### Challenge Types
- **UI Testing** - Element inspection, form validation
- **API Testing** - Network requests, response validation
- **DevTools** - Browser developer tools usage
- **Automation** - Test automation scenarios

### Adding New Challenges

1. **Create challenge component**
```typescript
// src/challenges/ChallengeNewExample.tsx
export const ChallengeNewExample: React.FC = () => {
  // Challenge implementation
};
```

2. **Add to challenges list**
```typescript
// src/challenges/challenges.ts
export const challenges = [
  // ... existing challenges
  {
    id: 'new-example',
    title: 'New Example Challenge',
    // ... challenge config
  }
];
```

3. **Add translations**
```typescript
// src/i18n.ts
const resources = {
  en: {
    translation: {
      "challenges.new-example.title": "New Example Challenge",
      // ... more translations
    }
  }
};
```

## 📱 Responsive Design

The app is built with mobile-first approach:

- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Key responsive features:
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized font sizes and spacing

## 🔧 API Integration

The frontend communicates with the backend API:

```typescript
// src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://testingforge.onrender.com/api';

export const api = {
  auth: {
    login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
    register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
    // ... more auth methods
  },
  challenges: {
    getAll: () => axios.get(`${API_BASE_URL}/challenges`),
    // ... more challenge methods
  }
};
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Strategy
- **Unit Tests** - Component testing with React Testing Library
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end user flows

## 🚀 Deployment

### GitHub Pages Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to GitHub Pages**
```bash
npm run deploy
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://testingforge.onrender.com/api` |
| `PUBLIC_URL` | Public URL for GitHub Pages | `/TestingForge` |

## 🎨 UI Components

### Key Components
- **MainLayout** - Main app layout with navigation
- **ProtectedRoute** - Route protection wrapper
- **BackButton** - Navigation back button
- **Logo** - App logo component

### Design System
- **Colors** - Consistent color palette
- **Typography** - Responsive font sizes
- **Spacing** - Consistent margin and padding
- **Components** - Reusable UI components

## 🤝 Contributing

Please read the main [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Frontend-Specific Guidelines

1. **TypeScript** - Use proper typing for all components
2. **Components** - Keep components small and focused
3. **Styling** - Use Tailwind CSS utilities
4. **Accessibility** - Include proper ARIA attributes
5. **Testing** - Write tests for new components
6. **Responsive** - Ensure mobile compatibility

## 📞 Support

For frontend-specific issues:
- 🐛 [Report Issues](https://github.com/ArturPrzybyloo/TestingForge/issues)
- 💬 [Discussions](https://github.com/ArturPrzybyloo/TestingForge/discussions)
- 📧 Email: frontend@testingforge.com

---

**Part of the Testing Forge QA Learning Platform** 🧪 