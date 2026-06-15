# Architectural Decisions

This document records the architectural decisions made during the refactoring of the AI & Tech Dashboard project.

## Table of Contents

- [Data Fetching](#data-fetching)
- [State Management](#state-management)
- [Component Architecture](#component-architecture)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Performance](#performance)

---

## Data Fetching

### Decision: Use React Query for data fetching

**Status:** Accepted

**Context:**
- Need to fetch stories from Hacker News API
- Require caching and background refetching
- Need to handle loading and error states
- Want to avoid manual state management for API calls

**Decision:**
- Use React Query's `useInfiniteQuery` for paginated data fetching
- Implement custom `useNews` hook to encapsulate API logic
- Use React Query's built-in caching, retry, and stale-time features

**Consequences:**
- **Positive:** Automatic caching, background refetching, retry logic
- **Positive:** Reduced boilerplate code
- **Positive:** Better UX with loading states and error handling
- **Negative:** Additional dependency (React Query)

---

## State Management

### Decision: Use React hooks for local state

**Status:** Accepted

**Context:**
- Need to manage local state for search, category, and view filters
- Want to avoid complex state management libraries
- Prefer React's built-in state management

**Decision:**
- Use `useState` for local component state
- Create custom hooks for reusable state logic (`useFavorites`, `useTheme`, `useInfiniteScroll`)
- Keep state as close to where it's used as possible

**Consequences:**
- **Positive:** Simple and predictable state management
- **Positive:** No additional dependencies
- **Positive:** Easy to test and debug
- **Negative:** State can become scattered in larger applications

---

## Component Architecture

### Decision: Break down God Components into smaller components

**Status:** Accepted

**Context:**
- Home.tsx was becoming a God Component with too many responsibilities
- Difficult to maintain and test
- Violated Single Responsibility Principle

**Decision:**
- Extract CategorySelector for category selection
- Extract FavoritesToggle for favorites filtering
- Extract FilterBar to combine filter controls
- Extract ResultsInfo for displaying result counts
- Extract NewsGrid for the news card grid
- Extract ContentArea for main content area with states
- Create utils for business logic (storyFilters, emptyState)
- Create custom hooks for reusable logic (useInfiniteScroll)

**Consequences:**
- **Positive:** Each component has a single responsibility
- **Positive:** Easier to test and maintain
- **Positive:** Better code reusability
- **Negative:** More files to manage
- **Negative:** Increased initial development time

---

## Styling

### Decision: Use CSS Modules with Design System

**Status:** Accepted

**Context:**
- Need scoped styles to avoid conflicts
- Want consistent design across the application
- Prefer CSS over CSS-in-JS for performance

**Decision:**
- Use CSS Modules for component-specific styles
- Create a global Design System with CSS variables
- Use CSS variables for theming (light/dark mode)
- Maintain consistent spacing, colors, and typography

**Consequences:**
- **Positive:** Scoped styles prevent conflicts
- **Positive:** Consistent design across the application
- **Positive:** Easy theming with CSS variables
- **Positive:** Better performance than CSS-in-JS
- **Negative:** CSS Modules require build step
- **Negative:** More verbose class names

---

## Accessibility

### Decision: Use semantic HTML and ARIA attributes

**Status:** Accepted

**Context:**
- Need to ensure the application is accessible to all users
- Want to follow WCAG guidelines
- Require keyboard navigation support

**Decision:**
- Use semantic HTML elements (fieldset, legend, label)
- Replace button-based radio groups with actual radio inputs
- Add ARIA labels and roles where necessary
- Implement focus indicators for keyboard navigation
- Ensure color contrast meets WCAG AA standards

**Consequences:**
- **Positive:** Better accessibility for all users
- **Positive:** Improved SEO
- **Positive:** Better keyboard navigation
- **Negative:** More verbose HTML
- **Negative:** Additional testing required

---

## Performance

### Decision: Use Intersection Observer for infinite scroll

**Status:** Accepted

**Context:**
- Need to implement infinite scroll for news stories
- Want to avoid scroll event listeners for performance
- Require efficient detection of when to load more content

**Decision:**
- Use Intersection Observer API for scroll detection
- Create custom `useInfiniteScroll` hook to encapsulate logic
- Use sentinel element at the bottom of the list
- Only fetch next page when sentinel is visible

**Consequences:**
- **Positive:** Better performance than scroll event listeners
- **Positive:** Efficient scroll detection
- **Positive:** Reusable hook for other components
- **Negative:** Not supported in very old browsers (IE)

---

## UX Design

### Decision: Use segmented controls for category selection

**Status:** Accepted

**Context:**
- Need to provide category selection UI
- Want a modern, touch-friendly interface
- Require clear visual feedback for selected category

**Decision:**
- Use radio group styled as segmented control
- Implement CategorySelector component with semantic radio inputs
- Add visual feedback for selected state
- Ensure keyboard navigation support

**Consequences:**
- **Positive:** Modern, touch-friendly UI
- **Positive:** Semantic and accessible
- **Positive:** Clear visual feedback
- **Negative:** More complex CSS styling

---

### Decision: Use toggle switch for favorites filter

**Status:** Accepted

**Context:**
- Need to provide favorites filtering UI
- Want a clear on/off toggle
- Require intuitive interaction

**Decision:**
- Use checkbox styled as toggle switch
- Implement FavoritesToggle component
- Add visual feedback for on/off state
- Include favorites count in label

**Consequences:**
- **Positive:** Intuitive interaction
- **Positive:** Clear on/off state
- **Positive:** Semantic checkbox input
- **Negative:** More complex CSS styling

---

## Responsive Design

### Decision: Use CSS Grid for news card layout

**Status:** Accepted

**Context:**
- Need responsive grid layout for news cards
- Want automatic adjustment based on screen size
- Require consistent spacing

**Decision:**
- Use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))`
- Implement responsive breakpoints for mobile
- Maintain consistent spacing with CSS variables

**Consequences:**
- **Positive:** Automatic responsive layout
- **Positive:** Consistent spacing
- **Positive:** No JavaScript required for layout
- **Negative:** Limited browser support for very old browsers

---

## Summary

The architectural decisions made during this refactoring prioritize:

1. **Maintainability**: Breaking down components and separating concerns
2. **Accessibility**: Using semantic HTML and ARIA attributes
3. **Performance**: Using React Query caching and Intersection Observer
4. **User Experience**: Modern UI patterns and responsive design
5. **Developer Experience**: Custom hooks, utils, and clear component structure

These decisions create a solid foundation for future development and make the codebase easier to maintain and extend.
