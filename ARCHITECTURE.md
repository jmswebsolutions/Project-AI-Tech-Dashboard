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
│   │   └── ErrorState.module.css
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Home.module.css
│   │
│   ├── hooks/
│   │   └── useNews.ts ⭐ Usa React Query
│   │
│   ├── services/
│   │   └── newsApi.ts
│   │
│   ├── types/
│   │   └── Story.ts
│   │
│   ├── styles/
│   │   └── index.css ⭐ Design System Global
│   │
│   ├── App.tsx ⭐ Com QueryClient & Router
│   ├── main.tsx
│   ├── index.css (legado)
│   └── assets/
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── README.md
└── REFACTOR.md ⭐ Documentação da refatoração
```

## 🎯 Arquitetura da Aplicação

```
App (QueryClientProvider + Router)
  ├── Home Page
  │   ├── Header
  │   ├── Hero Section + SearchBar
  │   ├── Toolbar (info de filtros)
  │   └── Main Content (Grid de Cards)
  │       ├── LoadingState (skeleton)
  │       ├── EmptyState (sem resultados)
  │       ├── ErrorState (erro com retry)
  │       └── NewsCard[] (lista de histórias)
  └── Footer
```

## 🔄 Fluxo de Dados

```
useNews Hook (React Query)
  ├── getTopStories() → IDs [1, 2, 3, ...]
  ├── getStory(id) × 30 → Promise.all()
  └── Return: { stories, loading, error, refetch }

Home Component
  ├── State: search (local)
  ├── Filter stories by title
  └── Render based on state (loading/error/empty/grid)
```

## 📊 Design System

**CSS Variables** (`styles/index.css`):
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--accent-primary`, `--accent-secondary`, etc
- `--space-xs` to `--space-2xl`
- `--radius-sm` to `--radius-xl`
- `--transition-fast`, `--transition-base`, `--transition-slow`

**Animações**:
- `fadeIn` - Fade in suave
- `slideInUp` - Slide up com fade
- `pulse` - Pulsação contínua
- `shimmer` - Loading skeleton animation

## ✨ Recursos Principais

- ⚡ **Performance**: React Query com caching
- 🎨 **Estilos**: CSS Modules + Design System
- 📱 **Responsivo**: Mobile, tablet, desktop
- ♿ **Acessível**: ARIA labels, semântica HTML
- 🔧 **Tipado**: TypeScript 100%
- 🚀 **Moderno**: React 19, Vite
