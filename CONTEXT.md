# Project Context for AI Assistants

## Project Overview

**AI & Tech Dashboard** - A React-based dashboard that displays top technology and AI stories from Hacker News in real-time.

**Tech Stack:**
- React 19 + TypeScript
- React Query (TanStack Query) for API state management
- Vite for build tooling
- CSS Modules for styling
- Hacker News API as data source

## Architecture

**Folder Structure:**
```
src/
├── api/              # API clients (Hacker News API)
├── components/       # React components
├── constants/        # Constants and configuration
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── App.tsx          # Root component
```

**Key Responsibilities:**
- **api/**: External API communication (Hacker News API)
- **components/**: UI components (presentational and container)
- **hooks/**: Business logic (data fetching, state management)
- **pages/**: Page-level composition and routing
- **types/**: TypeScript interfaces and types

## Data Flow

1. User selects category → `useNews` hook fetches data via `api/newsApi`
2. React Query caches responses (5min stale time)
3. Components render filtered stories
4. Favorites persisted in localStorage

## Key Patterns

- **Container/Presentational**: Components split into logic (Home, ContentArea) and UI (NewsCard, Header)
- **Custom Hooks**: Business logic extracted to reusable hooks (useNews, useFavorites, useTheme)
- **Colocation**: Related files grouped together
- **Type Safety**: Full TypeScript coverage

## Important Notes

- **API folder renamed**: Previously called `services/`, now `api/` for clarity
- **No backend**: All client-side, uses Hacker News public API
- **Performance**: Infinite scroll, React Query caching, code splitting
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation

## Current State

- ✅ Basic functionality complete
- ✅ Favorites system with localStorage
- ✅ Category filtering (top, new, best, ask, show, jobs)
- ✅ Search functionality
- ✅ Infinite scroll pagination
- ✅ Dark theme support

## When Making Changes

1. **Maintain type safety**: All new code should be TypeScript
2. **Follow patterns**: Use existing component/hook patterns
3. **Keep it simple**: Prefer minimal changes over complex solutions
4. **Test thoroughly**: Verify changes work across different states
5. **Update docs**: Keep ARCHITECTURE.md and README.md in sync

## Common Tasks

- **Add new API endpoint**: Add function in `api/newsApi.ts`
- **Add new component**: Create in appropriate `components/` subfolder
- **Add new hook**: Create in `hooks/` folder
- **Update types**: Modify interfaces in `types/` folder
