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
│   │   ├── useNews.ts ⭐ Usa React Query
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
└── ARCHITECTURE.md ⭐ Documentação da arquitetura
```

## 🎯 Arquitetura da Aplicação

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
  │       ├── EmptyState (sem resultados)
  │       ├── ErrorState (erro com retry)
  │       └── NewsGrid
  │           └── NewsCard[] (lista de histórias)
  └── Footer
```

## 🏗️ Princípios de Design

### Separação de Responsabilidades
- **Hooks**: Lógica de dados e efeitos colaterais (useNews, useFavorites, useInfiniteScroll, useTheme)
- **Utils**: Funções puras de negócio (storyFilters, emptyState)
- **Components**: Apresentação e interação UI
- **Constants**: Valores estáticos e configurações (categories)

### Componentes Modulares
- **CategorySelector**: Seleção de categorias com radio group semântico
- **FavoritesToggle**: Toggle para favoritos com switch UI
- **FilterBar**: Combina CategorySelector e FavoritesToggle
- **ResultsInfo**: Exibe informações sobre resultados filtrados
- **NewsGrid**: Grade de notícias com scroll infinito
- **ContentArea**: Área principal de conteúdo com estados (loading, error, empty)

## 🔄 Fluxo de Dados

```
useNews Hook (React Query)
  ├── getStoriesByCategory(category) → IDs [1, 2, 3, ...]
  ├── getStory(id) × 30 → Promise.all()
  └── Return: { stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage }

useInfiniteScroll Hook
  ├── Intersection Observer API
  ├── Detecta quando sentinel element é visível
  └── Chama fetchNextPage() quando necessário

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

**Animações**:
- `fadeIn` - Fade in suave
- `slideInUp` - Slide up com fade
- `pulse` - Pulsação contínua
- `shimmer` - Loading skeleton animation

## ✨ Recursos Principais

- ⚡ **Performance**: React Query com caching e scroll infinito
- 🎨 **Estilos**: CSS Modules + Design System
- 📱 **Responsivo**: Mobile, tablet, desktop
- ♿ **Acessível**: Radio groups semânticos, fieldsets, focus indicators, ARIA labels
- 🔧 **Tipado**: TypeScript 100%
- 🚀 **Moderno**: React 19, Vite
- 🏗️ **Modular**: Componentes pequenos e reutilizáveis
- 🔄 **Scroll Infinito**: Intersection Observer API
