# Contributing to ChefIApp™

Thank you for your interest in contributing to ChefIApp! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (for backend testing)
- Code editor (VS Code recommended)

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/chefiapp-hospitality-intelligence.git
cd chefiapp-hospitality-intelligence

# Add upstream remote
git remote add upstream https://github.com/goldmonkey777/chefiapp-hospitality-intelligence.git
```

---

## 🛠️ Development Setup

### Initial Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your .env with Supabase credentials
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start development server
npm run dev
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

---

## 📝 Coding Standards

### TypeScript

- **Strict Mode:** Always enabled
- **Type Coverage:** 100% required for new code
- **Naming:** Use descriptive names, avoid abbreviations
- **Imports:** Group imports (external, internal, types)

```typescript
// ✅ Good
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../lib/types';

// ❌ Bad
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
```

### React Components

- **Functional Components:** Always use functional components with hooks
- **Component Structure:** Props → State → Effects → Handlers → Render
- **Naming:** PascalCase for components, camelCase for functions

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn-primary">
      {children}
    </button>
  );
};

// ❌ Bad
export function button(props: any) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### Styling

- **TailwindCSS:** Use utility classes, avoid custom CSS
- **Responsive:** Mobile-first approach
- **Dark Mode:** Support dark mode where applicable

```typescript
// ✅ Good
<div className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h2>
</div>

// ❌ Bad
<div style={{ width: '100%', padding: '16px', backgroundColor: 'white' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
</div>
```

### File Organization

```
src/
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.test.tsx
│   │   └── index.ts
│   └── ...
├── hooks/
│   ├── useHookName.ts
│   └── ...
├── pages/
│   ├── PageName.tsx
│   └── ...
└── lib/
    ├── utils.ts
    └── types.ts
```

---

## 📦 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Examples

```bash
# Feature
git commit -m "feat(auth): add Apple OAuth integration"

# Bug fix
git commit -m "fix(dashboard): resolve loading state issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(tasks): add task completion tracking

- Add completion timestamp
- Update XP calculation
- Add completion animation"
```

---

## 🔀 Pull Request Process

### Before Submitting

1. **Update your fork:**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following coding standards

4. **Write tests** for new features

5. **Update documentation** if needed

6. **Ensure tests pass:**
   ```bash
   npm run test
   ```

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
```

---

## 🧪 Testing Guidelines

### Writing Tests

- **Coverage:** Aim for 80%+ coverage on new code
- **Test Files:** Co-locate with components (`Component.test.tsx`)
- **Test Structure:** Arrange → Act → Assert

```typescript
// ✅ Good
describe('Button Component', () => {
  it('should call onClick when clicked', () => {
    // Arrange
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    
    // Act
    fireEvent.click(getByRole('button'));
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage
```

---

## 📚 Documentation

### Code Documentation

- **JSDoc:** Add JSDoc comments for public functions
- **README:** Update README for new features
- **Inline Comments:** Explain "why", not "what"

```typescript
// ✅ Good
/**
 * Calculates XP based on task completion and streak
 * @param taskXP - Base XP for the task
 * @param streak - Current streak count
 * @returns Total XP including streak bonus
 */
function calculateXP(taskXP: number, streak: number): number {
  // Streak bonus: 10% per day, max 50%
  const streakBonus = Math.min(streak * 0.1, 0.5);
  return taskXP * (1 + streakBonus);
}

// ❌ Bad
// This function calculates XP
function calcXP(xp: number, s: number): number {
  return xp * (1 + s * 0.1);
}
```

### Documentation Updates

When adding features, update:
- README.md (if applicable)
- Relevant docs in `docs/` folder
- Code comments
- Type definitions

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS 17.0]
- Browser: [e.g. Safari 17.0]
- Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem.
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want.

**Describe alternatives you've considered**
Alternative solutions or features.

**Additional context**
Add any other context or screenshots.
```

---

## 📞 Questions?

- **Documentation:** [docs/README.md](docs/README.md)
- **Issues:** [GitHub Issues](https://github.com/goldmonkey777/chefiapp-hospitality-intelligence/issues)
- **Discussions:** [GitHub Discussions](https://github.com/goldmonkey777/chefiapp-hospitality-intelligence/discussions)

---

**Thank you for contributing to ChefIApp! 🎉**

