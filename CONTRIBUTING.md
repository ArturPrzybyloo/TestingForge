# 🤝 Contributing to Testing Forge

Thank you for your interest in contributing to Testing Forge! We welcome contributions from the community and are excited to see what you can bring to our QA learning platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## 🤲 Code of Conduct

This project adheres to a Code of Conduct that we expect all contributors to follow. Please read it before contributing.

### Our Standards

- **Be respectful** and inclusive in all interactions
- **Be constructive** when giving feedback
- **Focus on what's best** for the community and learning platform
- **Show empathy** towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- MongoDB (local or Atlas)
- Basic knowledge of React, TypeScript, and Node.js

### Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/TestingForge.git
cd TestingForge
```

2. **Set up backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

3. **Set up frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

## 🛠️ How to Contribute

### Types of Contributions

- 🐛 **Bug fixes** - Fix issues and improve stability
- ✨ **New features** - Add new challenges, features, or improvements
- 📚 **Documentation** - Improve docs, add tutorials, or write guides
- 🎨 **UI/UX improvements** - Enhance user experience and design
- 🔧 **Performance optimizations** - Make the platform faster and more efficient
- 🌍 **Translations** - Add support for new languages
- 🧪 **Testing** - Add or improve test coverage

### Areas We Need Help With

- **New Testing Challenges** - Create realistic testing scenarios
- **Automation Playground Modules** - Add new practice scenarios
- **Mobile Responsiveness** - Improve mobile experience
- **Accessibility** - Make the platform more accessible
- **Performance** - Optimize loading times and user experience
- **Documentation** - Write guides and tutorials

## 📖 Development Guidelines

### Frontend (React/TypeScript)

- Use **TypeScript** for type safety
- Follow **React Hooks** patterns
- Use **Tailwind CSS** for styling
- Implement **responsive design** (mobile-first)
- Add **proper error handling**
- Include **accessibility attributes**

### Backend (Node.js/Express)

- Use **async/await** for asynchronous operations
- Implement **proper error handling**
- Add **input validation**
- Follow **RESTful API** conventions
- Include **authentication checks** where needed
- Write **clear API documentation**

### Code Style

- Use **ESLint** and **Prettier** for code formatting
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Use **meaningful variable names**
- Keep **functions small** and focused

### Testing

- Write **unit tests** for new features
- Add **integration tests** for API endpoints
- Test **responsive design** on different devices
- Verify **accessibility** with screen readers

## 📝 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Follow commit message conventions**
5. **Submit pull request** with clear description

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(challenges): add new API testing challenge
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Browser/environment** information
- **Screenshots** if applicable
- **Error messages** or console logs

### Suggesting Features

For feature requests, please include:

- **Clear description** of the feature
- **Use case** and benefits
- **Possible implementation** approach
- **Alternative solutions** considered

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation needs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

## 🎯 Specific Contribution Areas

### Adding New Challenges

1. **Create challenge component** in `frontend/src/challenges/`
2. **Add challenge data** to `challenges.ts`
3. **Implement validation logic**
4. **Add translations** for multiple languages
5. **Test thoroughly** across browsers

### Improving Translations

1. **Edit translation files** in `frontend/src/i18n.ts`
2. **Ensure consistency** across languages
3. **Test UI** with different languages
4. **Consider text length** variations

### Performance Improvements

1. **Identify bottlenecks** using profiling tools
2. **Optimize bundle size** and loading times
3. **Implement lazy loading** where appropriate
4. **Add performance metrics**

## 🌟 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **Special mentions** in community updates

## 💬 Community

### Getting Help

- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs and request features
- **Discord** - Real-time chat with the community
- **Email** - Direct contact for sensitive matters

### Communication Guidelines

- **Be patient** - Maintainers are volunteers
- **Be specific** - Provide clear information
- **Be respectful** - Treat everyone with kindness
- **Search first** - Check existing issues and discussions

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🙏 Thank You

Every contribution, no matter how small, helps make Testing Forge better for the entire QA community. Thank you for taking the time to contribute!

---

**Happy Contributing! 🎉** 