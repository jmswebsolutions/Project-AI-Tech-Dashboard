# Architecture Documentation

This document describes the architecture of the AI & Tech Dashboard application.

## Architecture Overview

The AI & Tech Dashboard follows a **layered architecture** with clear separation of concerns and unidirectional dependencies.

### Layer Responsibilities

**Presentation Layer** (`src/components/`, `src/pages/`)
- **Responsibility**: UI rendering and user interactions
- **What it does**: Display data, handle user input, manage visual state
- **What it does NOT do**: Direct API calls, business logic, data transformation
- **Dependencies**: Depends on Data Layer only

**Data Layer** (`src/hooks/`, `src/api/`)
- **Responsibility**: Data fetching, state management, and business logic
- **What it does**: Encapsulate React Query logic, manage localStorage, coordinate data flow, handle HTTP requests
- **What it does NOT do**: UI rendering, direct DOM manipulation
- **Dependencies**: No dependencies on other layers

### Dependency Graph

```
Presentation Layer → Data Layer
```

The architecture follows the principle that higher layers can depend on lower layers, but not vice versa. This ensures:
- Clear separation of concerns
- Testability in isolation
- Maintainability through reduced coupling

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

## Data Layer

### API Module

The `api/newsApi` module provides a clean interface to the Hacker News API:
- `getStoriesByCategory(category)`: Fetches story IDs by category
- `getStory(id)`: Fetches individual story details
- `getComments(ids)`: Fetches comment threads

This module only handles HTTP requests. Caching, retry logic, and state management are handled by React Query in the hooks layer.

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

This pattern separates concerns between logic and presentation, making components more reusable and testable.

### Composition Pattern

Complex components built from smaller, reusable components:
- FilterBar = CategorySelector + FavoritesToggle
- ContentArea = ResultsInfo + NewsGrid + State Components

This follows the principle of composing complex UIs from simple, focused components.

---

## Summary

The AI & Tech Dashboard architecture emphasizes:

1. **Layered Architecture**: Clear separation between Presentation and Data layers
2. **Unidirectional Dependencies**: Presentation depends on Data, but not vice versa
3. **Separation of Concerns**: Each layer has a single, well-defined responsibility
4. **Composition**: Complex UI built from simple components
5. **Maintainability**: Clear boundaries and reduced coupling
