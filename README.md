# 🚀 AI & Tech Dashboard

A modern and responsive dashboard that displays the top technology and AI stories from **Hacker News in real time**. Built with React, TypeScript, and best UX/UI practices.

## 🌐 Live Demo

👉 **Access the production project:**  
https://jmswebsolutions.com.br/Project-AI-Tech-Dashboard/

## 📋 What This Project Does

This dashboard **aggregates and displays articles, discussions, and news** about technology and artificial intelligence directly from the [Hacker News API](https://news.ycombinator.com/api). The application allows:

- ✅ **View real-time stories** - Top 30 stories from Hacker News
- 🔍 **Filter and search** - Search stories by title
- ⭐ **Favorites** - Save stories with one click and filter only favorites (persists in browser)
- 📊 **Complete metadata** - Points, comments, author, date
- 🔗 **Direct links** - Read the original article or comment on HN
- 📱 **Responsive design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Optimized performance** - Smart caching with React Query

## 🎨 Layout & Interface

```
┌─────────────────────────────────────────┐
│  ⚡ AI & Tech Dashboard      [Live]     │  ← Sticky header
├─────────────────────────────────────────┤
│ What's happening in tech & AI           │
│ [Search stories...............]         │  ← Hero + Search
├─────────────────────────────────────────┤
│ Showing 12 stories matching "AI"        │  ← Toolbar
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ Story 01 │  │ Story 02 │  │ Sto..│ │
│  │ Title... │  │ Title... │  │ ...  │ │
│  │ 456 ▲    │  │ 234 ▲    │  │ ...  │ │
│  │ 123 💬   │  │ 456 💬   │  │      │ │
│  └──────────┘  └──────────┘  └──────┘ │  ← Card Grid
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ Story 04 │  │ Story 05 │  │ Sto..│ │
│  │ ...      │  │ ...      │  │ ...  │ │
│  └──────────┘  └──────────┘  └──────┘ │
│                                         │
├─────────────────────────────────────────┤
│ © 2026 AI & Tech Dashboard              │  ← Footer
│ Powered by Hacker News API              │
└─────────────────────────────────────────┘
```

## 📚 What I Learned in This Project

### 1. **Modular Component Architecture**
- Structuring React projects with reusable components
- Clear separation of concerns (components, hooks, services)
- CSS Modules to avoid style conflicts

### 2. **React Query (TanStack Query)**
- Elegant API state management
- Automatic caching with `staleTime` and `gcTime`
- Automatic retry on error
- On-demand data refetch

```typescript
const { data: stories, isLoading, error, refetch } = useQuery({
  queryKey: ['topStories'],
  queryFn: loadStoriesFromAPI,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### 3. **Consistent Design System**
- Using CSS variables for consistency
- Unified color palette (blue, cyan, green)
- Standardized spacing, typography, and border-radius
- Reusable animations and transitions

### 4. **Modern UX/UI**
- Well-defined visual states (loading, error, empty)
- Skeleton screens with shimmer animation
- Micro-interactions and visual feedback
- Accessibility (ARIA labels, HTML semantics)

### 5. **TypeScript**
- Type safety throughout the project
- Interfaces for API data
- Type-safe props in React components

### 6. **API Integration**
- HTTP calls with Fetch API
- Robust error handling
- Data filtering and processing in the application

### 7. **Mobile-First Responsiveness**
- Flexible layouts with Flexbox and Grid
- Media queries for different breakpoints
- Component adaptation for mobile

### 8. **Performance & Optimizations**
- Lazy loading of components
- Memoization where needed
- HTTP request caching
- Efficient bundling with Vite

## ✨ Key Features

### 🔥 Real-Time Stories
- Automatically fetches the top 30 stories from Hacker News
- Updates every 5 minutes (configurable)
- Automatically filters invalid stories

### 🔍 Search and Filter
- Real-time title search (no debounce needed)
- Search field with quick clear (X button)
- **All** / **Favorites** filter in toolbar
- Shows result count

### ⭐ Favorites (v2.0)
- Star button on each card to save/remove
- Dedicated filter to view only favorite stories
- Counter in header and toolbar
- Automatic persistence via `localStorage`
- Specific empty states (no favorites, outside top 30, search no match)

### 📊 Complete News Card
Each story displays:
- **Ranking** - Position among top 30
- **Title** - Clickable to go to article
- **Points** (▲) - Community votes
- **Comments** (💬) - Number of discussions
- **Author** - Who submitted
- **Date** - When published
- **Domain** - Source origin
- **Action buttons**:
  - "Read Article" - Link to original article
  - "Discuss" - Link to HN comments

### 🎨 Visual States
1. **Loading** - Skeletons with shimmer animation
2. **Success** - Grid of cards with stories
3. **Empty** - Friendly message when no story matches
4. **Error** - Message with "Try Again" button

### 📱 Responsive Design
- **Desktop** - 3-4 column grid, first card highlighted
- **Tablet** - 2-3 column grid
- **Mobile** - 1 column grid, touch-optimized

### ♿ Accessibility
- Semantic labels on inputs
- ARIA attributes on buttons
- Adequate color contrast
- Visible focus states
- Keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Query** - State management & API caching
- **React Router DOM** - Routing
- **CSS Modules** - Scoped styling

### Build & Tooling
- **Vite** - Fast build tool
- **ESLint** - Code quality
- **Node.js** - Runtime

### API
- **Hacker News API** - Data source
- **Fetch API** - HTTP requests

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Clone the project
git clone <repo-url>
cd project-ai-tech-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The project will be available at `http://localhost:5173`

### Production Build

```bash
# Compile TypeScript and build
npm run build

# Preview build locally
npm run preview
```

### Lint and Quality

```bash
# Check lint errors
npm run lint
```

## 📁 Project Structure

```
src/
├── components/              # Reusable components
│   ├── Header.tsx           # Header with logo
│   ├── SearchBar.tsx        # Search bar
│   ├── NewsCard.tsx         # News card
│   ├── LoadingState.tsx     # Loading states
│   ├── EmptyState.tsx       # Empty state
│   ├── ErrorState.tsx       # Error state
│   └── *.module.css         # Modular styles
│
├── pages/                   # Application pages
│   └── Home.tsx            # Main page
│
├── hooks/                   # Custom Hooks
│   ├── useNews.ts          # Hook to load stories
│   └── useFavorites.ts     # Hook for favorites (localStorage)
│
├── services/               # Services (API)
│   └── newsApi.ts          # HN API functions
│
├── types/                  # TypeScript definitions
│   └── Story.ts            # Story interface
│
├── styles/                 # Global styles
│   └── index.css           # Design System
│
├── App.tsx                 # Root component
└── main.tsx               # Entry point
```

### Component Hierarchy

```
App
├── QueryClientProvider
└── Router
    └── Home
        ├── Header
        ├── Hero
        │   ├── SearchBar
        │   └── Title + description
        ├── Toolbar (filter info)
        └── Main
            ├── LoadingState
            ├── EmptyState
            ├── ErrorState
            └── Grid
                └── NewsCard[] × N
        └── Footer
```

## 🎨 Design System

### Color Palette
```
Primary:      #3b82f6 (Vibrant blue)
Secondary:    #06b6d4 (Cyan)
Success:      #10b981 (Green)
Warning:      #f59e0b (Amber)
Error:        #ef4444 (Red)
Background:   #0a0e27 (Dark blue)
Text:         #f8fafc (Ice white)
```

### Available CSS Variables
```css
/* Backgrounds */
--bg-primary, --bg-secondary, --bg-tertiary, --bg-hover

/* Text */
--text-primary, --text-secondary, --text-tertiary, --text-muted

/* Borders */
--border-primary, --border-secondary

/* Spacing */
--space-xs, --space-sm, --space-md, --space-lg, --space-xl, --space-2xl

/* Border Radius */
--radius-sm, --radius-md, --radius-lg, --radius-xl

/* Transitions */
--transition-fast, --transition-base, --transition-slow

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
```

### Animations
- `fadeIn` - Smooth fade in
- `slideInUp` - Slide up with fade
- `pulse` - Continuous pulsation (for badges)
- `shimmer` - Loading skeleton animation

## 📊 Loaded Data

The project automatically fetches:

```json
{
  "id": 12345678,
  "title": "How to Use AI to Increase Productivity",
  "by": "username",
  "score": 456,
  "time": 1686100000,
  "url": "https://example.com/article",
  "descendants": 123
}
```

**Source**: [Hacker News API](https://news.ycombinator.com/api)

## 🔄 Data Flow

```
1. App.tsx mounts QueryClientProvider
2. Home.tsx renders and calls useNews()
3. useNews() executes query in React Query
4. newsApi.getTopStories() → Array of IDs
5. Promise.all(getStory(id)) → Array of Stories
6. Returns { stories, loading, error, refetch }
7. Home filters stories by search
8. Renders NewsCard for each story
```

## 🎯 Key Learnings

| Concept | What I Learned |
|----------|---------------|
| **React Query** | How to manage API state and cache |
| **CSS Modules** | Avoid conflicts with scoped styles |
| **Design System** | Consistency with CSS variables |
| **TypeScript** | Type safety throughout the code |
| **Components** | How to structure reusable components |
| **UX/UI** | Visual states and micro-interactions |
| **Performance** | Caching, lazy loading, optimizations |
| **Accessibility** | ARIA, HTML semantics, focus states |

## 🚀 Future Improvements

- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] PWA features (offline, install)
- [ ] Dark/Light mode toggle
- [x] Favorites/bookmarks
- [ ] Filter categories (jobs, polls, etc)
- [ ] Analytics (Sentry, Mixpanel)
- [ ] Infinite scroll
- [ ] Customizable theme

## 📜 License

This project is open source and available under the MIT license.

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

---

**Built with ❤️ in 2026 - React + TypeScript + Vite + React Query**

For more information:
- 📖 [Architecture Documentation](./ARCHITECTURE.md)
- 📝 [Refactoring Details](./REFACTOR.md)
- 🔗 [Hacker News API](https://news.ycombinator.com/api)
