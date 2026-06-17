```
projeto-ai-tech-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.module.css
│   │   ├── NewsCard.tsx
│   │   ├── NewsCard.module.css
│   │   ├── LoadingState.tsx
│   │   ├── LoadingState.module.css
│   │   ├── EmptyState.tsx
│   │   ├── EmptyState.module.css
│   │   ├── ErrorState.tsx
│   │   ├── ErrorState.module.css
│   │   └── home/
│   │       ├── CategorySelector.tsx
│   │       ├── CategorySelector.module.css
│   │       ├── FavoritesToggle.tsx
│   │       ├── FavoritesToggle.module.css
│   │       ├── FilterBar.tsx
│   │       ├── FilterBar.module.css
│   │       ├── ResultsInfo.tsx
│   │       ├── ResultsInfo.module.css
│   │       ├── NewsGrid.tsx
│   │       ├── NewsGrid.module.css
│   │       ├── ContentArea.tsx
│   │       └── ContentArea.module.css
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Home.module.css
│   │
│   ├── hooks/
│   │   ├── useNews.ts ⭐ Uses React Query
│   │   ├── useFavorites.ts
│   │   ├── useTheme.ts
│   │   └── useInfiniteScroll.ts ⭐ Intersection Observer
│   │
│   ├── services/
│   │   └── newsApi.ts
│   │
│   ├── types/
│   │   └── Story.ts
│   │
│   ├── utils/
│   │   ├── storyFilters.ts
│   │   └── emptyState.ts
│   │
│   ├── constants/
│   │   └── categories.ts
│   │
│   ├── styles/
│   │   └── index.css ⭐ Global Design System
│   │
│   ├── App.tsx ⭐ With QueryClient & Router
│   ├── main.tsx
│   ├── index.css (legacy)
│   └── assets/
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── README.md
└── ARCHITECTURE.md ⭐ Architecture documentation
```

## 🎯 Application Architecture

```
App (QueryClientProvider + Router)
  ├── Home Page
  │   ├── Header
  │   ├── Hero Section + SearchBar
  │   ├── FilterBar
  │   │   ├── CategorySelector (radio group)
  │   │   └── FavoritesToggle (switch)
  │   └── ContentArea
  │       ├── ResultsInfo
  │       ├── LoadingState (skeleton)
  │       ├── EmptyState (no results)
  │       ├── ErrorState (error with retry)
  │       └── NewsGrid
  │           └── NewsCard[] (story list)
  └── Footer
```

## 🏗️ Design Principles

### Separation of Concerns
- **Hooks**: Data logic and side effects (useNews, useFavorites, useInfiniteScroll, useTheme)
- **Utils**: Pure business functions (storyFilters, emptyState)
- **Components**: UI presentation and interaction
- **Constants**: Static values and configurations (categories)

### Modular Components
- **CategorySelector**: Category selection with semantic radio group
- **FavoritesToggle**: Favorites toggle with switch UI
- **FilterBar**: Combines CategorySelector and FavoritesToggle
- **ResultsInfo**: Displays filtered results information
- **NewsGrid**: News grid with infinite scroll
- **ContentArea**: Main content area with states (loading, error, empty)

## 🔄 Data Flow

```
useNews Hook (React Query)
  ├── getStoriesByCategory(category) → IDs [1, 2, 3, ...]
  ├── getStory(id) × 30 → Promise.all()
  └── Return: { stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage }

useInfiniteScroll Hook
  ├── Intersection Observer API
  ├── Detects when sentinel element is visible
  └── Calls fetchNextPage() when needed

Home Component
  ├── State: category, search, view (local)
  ├── filterStories(stories, view, search, isFavorite) → filteredStories
  ├── useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage) → sentinelRef
  └── Render:
      ├── FilterBar (CategorySelector + FavoritesToggle)
      └── ContentArea
          ├── ResultsInfo
          ├── LoadingState / ErrorState / EmptyState
          └── NewsGrid (NewsCard[] + sentinel)
```

## 📊 Design System

**CSS Variables** (`styles/index.css`):
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--accent-primary`, `--accent-secondary`, etc
- `--space-xs` to `--space-2xl`
- `--radius-sm` to `--radius-xl`
- `--transition-fast`, `--transition-base`, `--transition-slow`

**Animations**:
- `fadeIn` - Smooth fade in
- `slideInUp` - Slide up with fade
- `pulse` - Continuous pulsation
- `shimmer` - Loading skeleton animation

## ✨ Key Features

- ⚡ **Performance**: React Query with caching and infinite scroll
- 🎨 **Styling**: CSS Modules + Design System
- 📱 **Responsive**: Mobile, tablet, desktop
- ♿ **Accessible**: Semantic radio groups, fieldsets, focus indicators, ARIA labels
- 🔧 **Typed**: TypeScript 100%
- 🚀 **Modern**: React 19, Vite
- 🏗️ **Modular**: Small and reusable components
- 🔄 **Infinite Scroll**: Intersection Observer API
