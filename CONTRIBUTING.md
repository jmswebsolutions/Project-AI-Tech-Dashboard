# Contributing to AI & Tech Dashboard

Thank you for your interest in contributing to the AI & Tech Dashboard! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Project-AI-Tech-Dashboard.git
   cd Project-AI-Tech-Dashboard
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/jmswebsolutions/Project-AI-Tech-Dashboard.git
   ```

---

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Run Linter

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── home/           # Home page specific components
│   ├── Header.tsx      # Header component
│   ├── NewsCard.tsx    # News card component
│   └── ...
├── pages/              # Page components
│   └── Home.tsx        # Home page
├── hooks/              # Custom React hooks
│   ├── useNews.ts      # Data fetching hook
│   ├── useFavorites.ts # Favorites management
│   └── ...
├── services/           # API services
│   └── newsApi.ts      # Hacker News API
├── utils/              # Utility functions
│   ├── storyFilters.ts # Story filtering logic
│   └── emptyState.ts   # Empty state logic
├── constants/          # Constants
│   └── categories.ts   # Category labels
├── types/              # TypeScript types
│   └── Story.ts        # Story type definition
└── styles/             # Global styles
    └── index.css       # Design system
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types for props and return values
- Avoid `any` type when possible
- Use interfaces for object shapes
- Use type aliases for unions and primitives

### React

- Use functional components with hooks
- Follow the Single Responsibility Principle
- Keep components small and focused
- Use custom hooks for reusable logic
- Avoid prop drilling when possible

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Use trailing commas in multi-line arrays/objects
- Keep lines under 100 characters

### Naming Conventions

- **Components**: PascalCase (`NewsCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useNews.ts`)
- **Utils**: camelCase (`storyFilters.ts`)
- **Constants**: camelCase (`categories.ts`)
- **CSS Classes**: camelCase (`styles.container`)

---

## Component Guidelines

### Creating New Components

1. Create component file in appropriate directory
2. Create corresponding CSS Module file
3. Define TypeScript interfaces for props
4. Implement component logic
5. Add accessibility attributes (ARIA, semantic HTML)
6. Test component functionality

### Component Structure

```tsx
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // prop definitions
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // component logic
  
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

### Accessibility

- Use semantic HTML elements
- Add ARIA labels where necessary
- Ensure keyboard navigation support
- Add focus indicators
- Maintain color contrast ratios (WCAG AA)
- Use radio groups for mutually exclusive options
- Use fieldsets and legends for related form controls

---

## Testing

### Running Tests

```bash
npm run test
```

### Writing Tests

- Write unit tests for utility functions
- Write component tests for UI components
- Test user interactions
- Test edge cases and error states
- Maintain good test coverage

---

## Submitting Changes

### Branch Naming

Use descriptive branch names:
- `feature/feature-name`
- `fix/bug-description`
- `docs/documentation-update`
- `refactor/code-refactoring`

### Commit Messages

Follow conventional commits format:
- `feat: add new feature`
- `fix: fix bug description`
- `docs: update documentation`
- `refactor: refactor code`
- `style: formatting changes`
- `test: add/update tests`
- `chore: maintenance tasks`

### Pull Request Process

1. Update your branch with the latest from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Commit your changes with clear messages

3. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```

4. Create a pull request on GitHub

5. Describe your changes in the PR description

6. Wait for code review and address feedback

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Accessibility considered
- [ ] Responsive design tested
- [ ] Changes are minimal and focused

---

## Reporting Issues

### Bug Reports

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser and version
- Operating system

### Feature Requests

When requesting features, include:
- Clear description of the feature
- Use case for the feature
- Potential implementation approach
- Examples if applicable

---

## Questions?

If you have questions about contributing:
- Open an issue on GitHub
- Check existing documentation
- Review the codebase for examples

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Accept feedback gracefully
- Focus on what is best for the community
- Show empathy towards other community members

Thank you for contributing to the AI & Tech Dashboard!
