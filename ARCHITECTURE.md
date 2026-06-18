# Architecture Documentation

This document describes the architecture of the AI & Tech Dashboard application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Data Layer](#data-layer)
- [Design Patterns](#design-patterns)
- [Performance Strategies](#performance-strategies)

---

## Architecture Overview

The AI & Tech Dashboard follows a **component-based architecture** with clear separation of concerns:

- **Presentation Layer**: React components handle UI rendering and user interactions
- **Data Layer**: Custom hooks encapsulate data fetching and state management
- **Service Layer**: API services handle external data sources
- **Persistence Layer**: localStorage for client-side persistence

The application uses **React Query** for server state management and **React hooks** for local state management, following the principle of colocation where logic lives close to where it's used.

---

## Component Architecture

### Component Hierarchy

```
App
└── Home
    ├── Header
    ├── Hero Section
    │   └── SearchBar
    ├── FilterBar
    │   ├── CategorySelector
    │   └── FavoritesToggle
    ├── ContentArea
    │   ├── ResultsInfo
    │   ├── LoadingState
    │   ├── ErrorState
    │   ├── EmptyState
    │   └── NewsGrid
    │       └── NewsCard[]
    └── Footer
```

### Component Responsibilities

**Home Component** (Container Component)
- Manages local state: category, search, view filter
- Orchestrates data fetching through hooks
- Coordinates child components
- Handles user interactions and state updates

**Header Component** (Presentational Component)
- Displays app branding and navigation
- Manages theme toggle
- Shows favorites count

**ContentArea Component** (Container Component)
- Manages loading, error, and empty states
- Coordinates ResultsInfo and NewsGrid
- Handles state transitions

**NewsCard Component** (Presentational Component)
- Displays individual story information
- Handles favorite toggle
- Manages comment thread expansion
- Handles share functionality

---

## State Management

### Local State

Managed with React's `useState` hook:
- **Category**: Current selected story category
- **Search**: Current search query
- **View Filter**: Current view filter (all/favorites)
- **Comments**: Comment thread expansion state

### Server State

Managed with **React Query**:
- **Stories Data**: Fetched from Hacker News API
- **Caching**: Automatic caching and stale-while-revalidate
- **Pagination**: Infinite query for paginated data
- **Error Handling**: Automatic retry and error state

### Client State Persistence

Managed with **localStorage**:
- **Favorites**: User's favorite story IDs
- **Theme**: User's theme preference (light/dark)

---

## Data Layer

### API Service

The `newsApi` service provides a clean interface to the Hacker News API:
- `getStoriesByCategory(category)`: Fetches story IDs by category
- `getStory(id)`: Fetches individual story details
- `getComments(ids)`: Fetches comment threads

### Custom Hooks

**useNews Hook**
- Encapsulates React Query logic for fetching stories
- Manages loading, error, and pagination states
- Provides refetch functionality
- Returns: stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage

**useFavorites Hook**
- Manages favorites in localStorage
- Provides toggle, check, and count functionality
- Returns: favorites, toggleFavorite, isFavorite, favoriteCount

**useTheme Hook**
- Manages theme in localStorage
- Applies theme to document
- Returns: theme, toggleTheme

**useInfiniteScroll Hook**
- Uses Intersection Observer API
- Detects when user scrolls to bottom
- Triggers page fetch
- Returns: sentinelRef

---

## Design Patterns

### Container/Presentational Pattern

- **Container Components**: Manage state and business logic (Home, ContentArea)
- **Presentational Components**: Receive props and render UI (NewsCard, Header, SearchBar)

### Custom Hooks Pattern

Business logic extracted into reusable custom hooks:
- Data fetching logic in `useNews`
- Persistence logic in `useFavorites` and `useTheme`
- UI logic in `useInfiniteScroll`

### Composition Pattern

Complex components built from smaller, reusable components:
- FilterBar = CategorySelector + FavoritesToggle
- ContentArea = ResultsInfo + NewsGrid + State Components

### Colocation Pattern

Related files grouped together:
- Component files with their CSS modules
- Home-specific logic in components/home/
- Hooks in dedicated hooks/ directory

---

## Performance Strategies

### Code Splitting

Dynamic imports for heavy features:
- Comments loaded on-demand with `import()`
- Reduces initial bundle size

### Infinite Scroll

Pagination with Intersection Observer:
- Loads stories as user scrolls
- Reduces initial data fetch
- Improves perceived performance

### Caching

React Query caching:
- Automatic caching of API responses
- Stale-while-revalidate strategy
- Reduces unnecessary API calls

### CSS Modules

Scoped CSS:
- No global CSS conflicts
- Better tree-shaking
- Smaller CSS bundles

---

## Accessibility

### Semantic HTML

- Proper use of HTML5 elements (header, main, footer, article)
- Fieldset and legend for form groups
- Labels for form inputs

### Keyboard Navigation

- Skip links for keyboard users
- Focus indicators on interactive elements
- Logical tab order

### ARIA Attributes

Minimal use of ARIA, preferring semantic HTML:
- `aria-pressed` for toggle buttons
- `aria-expanded` for collapsible sections
- Removed redundant `aria-label` where visible text exists

---

## Type Safety

### TypeScript

100% TypeScript coverage:
- Type definitions for all components
- Type definitions for API responses
- Type definitions for hooks
- Type definitions for utilities

---

## Summary

The AI & Tech Dashboard architecture emphasizes:

1. **Separation of Concerns**: Clear boundaries between presentation, data, and business logic
2. **Colocation**: Related code grouped together
3. **Composition**: Complex UI built from simple components
4. **Performance**: Code splitting, caching, and lazy loading
5. **Accessibility**: Semantic HTML and keyboard navigation
6. **Type Safety**: Full TypeScript coverage
7. **Maintainability**: Small, focused components and hooks
