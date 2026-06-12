# 🚀 AI & Tech Dashboard

Um dashboard moderno e responsivo que exibe as principais histórias de tecnologia e IA do **Hacker News em tempo real**. Desenvolvido com React, TypeScript e as melhores práticas de UX/UI.

## 🌐 Live Demo

👉 **Acesse o projeto em produção:**  
https://jmswebsolutions.com.br/Projeto-AI-Tech-Dashboard/

## 📋 O Que o Projeto Faz

Este dashboard **agrega e exibe artigos, discussões e notícias** sobre tecnologia e inteligência artificial diretamente da [Hacker News API](https://news.ycombinator.com/api). A aplicação permite:

- ✅ **Visualizar histórias em tempo real** - Top 30 histórias do Hacker News
- 🔍 **Filtrar e buscar** - Procure histórias por título
- ⭐ **Favoritos** - Salve histórias com um clique e filtre só os favoritos (persiste no navegador)
- 📊 **Metadados completos** - Pontos, comentários, autor, data
- 🔗 **Links diretos** - Leia o artigo original ou comente no HN
- 📱 **Design responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- ⚡ **Performance otimizada** - Cache inteligente com React Query

## 🎨 Layout & Interface

```
┌─────────────────────────────────────────┐
│  ⚡ AI & Tech Dashboard      [Live]     │  ← Header sticky
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
│  └──────────┘  └──────────┘  └──────┘ │  ← Grid de Cards
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

## 📚 O Que Aprendi Neste Projeto

### 1. **Arquitetura de Componentes Modulares**
- Estruturação de projetos React com componentes reutilizáveis
- Separação clara de responsabilidades (componentes, hooks, services)
- CSS Modules para evitar conflitos de estilo

### 2. **React Query (TanStack Query)**
- Gerenciamento de estado da API de forma elegante
- Caching automático com `staleTime` e `gcTime`
- Retry automático em caso de erro
- Refetch de dados sob demanda

```typescript
const { data: stories, isLoading, error, refetch } = useQuery({
  queryKey: ['topStories'],
  queryFn: loadStoriesFromAPI,
  staleTime: 5 * 60 * 1000, // 5 minutos
});
```

### 3. **Design System Consistente**
- Uso de variáveis CSS para manter consistência
- Paleta de cores unificada (azul, ciano, verde)
- Espaçamento, tipografia e border-radius padronizados
- Animações e transições reutilizáveis

### 4. **UX/UI Moderna**
- Estados visuais bem definidos (loading, error, empty)
- Skeleton screens com shimmer animation
- Microinterações e feedback visual
- Acessibilidade (ARIA labels, semântica HTML)

### 5. **TypeScript**
- Tipagem segura em todo o projeto
- Interfaces para dados da API
- Type-safe props em componentes React

### 6. **API Integration**
- Chamadas HTTP com Fetch API
- Tratamento robusto de erros
- Filtros e processamento de dados na aplicação

### 7. **Responsividade Mobile-First**
- Layouts flexíveis com Flexbox e Grid
- Media queries para diferentes breakpoints
- Adaptação de componentes para mobile

### 8. **Performance & Otimizações**
- Lazy loading de componentes
- Memoização onde necessário
- Cache de requisições HTTP
- Bundling eficiente com Vite

## ✨ Features Principais

### 🔥 Histórias em Tempo Real
- Busca automaticamente as 30 principais histórias do Hacker News
- Atualiza a cada 5 minutos (configurável)
- Filtra histórias inválidas automaticamente

### 🔍 Busca e Filtro
- Busca por título em tempo real (sem debounce necessário)
- Campo de busca com limpeza rápida (botão X)
- Filtro **All** / **Favoritos** na toolbar
- Mostra quantidade de resultados

### ⭐ Favoritos (v2.0)
- Botão de estrela em cada card para salvar/remover
- Filtro dedicado para ver só histórias favoritas
- Contador no header e na toolbar
- Persistência automática via `localStorage`
- Empty states específicos (sem favoritos, fora do top 30, busca sem match)

### 📊 Card de Notícia Completo
Cada histórico exibe:
- **Ranking** - Posição entre top 30
- **Título** - Clicável para ir ao artigo
- **Pontos** (▲) - Votos na comunidade
- **Comentários** (💬) - Número de discussões
- **Autor** - Quem submeteu
- **Data** - Quando foi publicado
- **Domínio** - Origem da fonte
- **Botões de ação**:
  - "Read Article" - Link para artigo original
  - "Discuss" - Link para comentários no HN

### 🎨 Estados Visuais
1. **Loading** - Skeletons com animação shimmer
2. **Success** - Grid de cards com histórias
3. **Empty** - Mensagem amigável quando nenhuma história combina
4. **Error** - Mensagem com botão "Try Again"

### 📱 Design Responsivo
- **Desktop** - Grid 3-4 colunas, primeiro card em destaque
- **Tablet** - Grid 2-3 colunas
- **Mobile** - Grid 1 coluna, otimizado para touch

### ♿ Acessibilidade
- Labels semânticos em inputs
- ARIA attributes em botões
- Contraste de cores adequado
- Focus states visíveis
- Navegação por teclado

## 🛠️ Stack Técnico

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
- **Hacker News API** - Fonte de dados
- **Fetch API** - HTTP requests

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar o projeto
git clone <repo-url>
cd projeto-ai-tech-dashboard

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Compilar TypeScript e fazer build
npm run build

# Visualizar build localmente
npm run preview
```

### Lint e Qualidade

```bash
# Verificar erros de lint
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── Header.tsx           # Cabeçalho com logo
│   ├── SearchBar.tsx        # Barra de busca
│   ├── NewsCard.tsx         # Card de notícia
│   ├── LoadingState.tsx     # Estados de carregamento
│   ├── EmptyState.tsx       # Estado vazio
│   ├── ErrorState.tsx       # Estado de erro
│   └── *.module.css         # Estilos modulares
│
├── pages/                   # Páginas da aplicação
│   └── Home.tsx            # Página principal
│
├── hooks/                   # Custom Hooks
│   ├── useNews.ts          # Hook para carregar histórias
│   └── useFavorites.ts     # Hook para favoritos (localStorage)
│
├── services/               # Serviços (API)
│   └── newsApi.ts          # Funções de API do HN
│
├── types/                  # Definições TypeScript
│   └── Story.ts            # Interface de Story
│
├── styles/                 # Estilos globais
│   └── index.css           # Design System
│
├── App.tsx                 # Root component
└── main.tsx               # Entry point
```

### Hierarquia de Componentes

```
App
├── QueryClientProvider
└── Router
    └── Home
        ├── Header
        ├── Hero
        │   ├── SearchBar
        │   └── Título + descrição
        ├── Toolbar (info de filtros)
        └── Main
            ├── LoadingState
            ├── EmptyState
            ├── ErrorState
            └── Grid
                └── NewsCard[] × N
        └── Footer
```

## 🎨 Design System

### Paleta de Cores
```
Primary:      #3b82f6 (Azul vibrante)
Secondary:    #06b6d4 (Ciano)
Success:      #10b981 (Verde)
Warning:      #f59e0b (Âmbar)
Error:        #ef4444 (Vermelho)
Background:   #0a0e27 (Azul escuro)
Text:         #f8fafc (Branco gelo)
```

### Variáveis CSS Disponíveis
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

### Animações
- `fadeIn` - Fade in suave
- `slideInUp` - Desliza para cima com fade
- `pulse` - Pulsação contínua (para badges)
- `shimmer` - Loading skeleton animation

## 📊 Dados Carregados

O projeto busca automaticamente:

```json
{
  "id": 12345678,
  "title": "Como Usar AI para Aumentar Produtividade",
  "by": "username",
  "score": 456,
  "time": 1686100000,
  "url": "https://example.com/article",
  "descendants": 123
}
```

**Origem**: [Hacker News API](https://news.ycombinator.com/api)

## 🔄 Fluxo de Dados

```
1. App.tsx monta QueryClientProvider
2. Home.tsx renderiza e chama useNews()
3. useNews() executa query no React Query
4. newsApi.getTopStories() → Array de IDs
5. Promise.all(getStory(id)) → Array de Stories
6. Retorna { stories, loading, error, refetch }
7. Home filtra stories pelo search
8. Renderiza NewsCard para cada história
```

## 🎯 Principais Aprendizados

| Conceito | O Que Aprendi |
|----------|---------------|
| **React Query** | Como gerenciar estado de API e cache |
| **CSS Modules** | Evitar conflitos com estilos scoped |
| **Design System** | Consistência com variáveis CSS |
| **TypeScript** | Segurança de tipos em todo o code |
| **Componentes** | Como estruturar componentes reutilizáveis |
| **UX/UI** | Estados visuais e microinterações |
| **Performance** | Caching, lazy loading, otimizações |
| **Acessibilidade** | ARIA, semântica HTML, focus states |

## 🚀 Melhorias Futuras

- [ ] Testes unitários com Vitest
- [ ] Testes E2E com Playwright
- [ ] PWA features (offline, install)
- [ ] Dark/Light mode toggle
- [x] Favoritos/bookmarks
- [ ] Categorias de filtro (jobs, polls, etc)
- [ ] Analytics (Sentry, Mixpanel)
- [ ] Infinite scroll
- [ ] Tema customizável

## 📜 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🙌 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ em 2026 - React + TypeScript + Vite + React Query**

Para mais informações:
- 📖 [Documentação de Arquitetura](./ARCHITECTURE.md)
- 📝 [Detalhes da Refatoração](./REFACTOR.md)
- 🔗 [Hacker News API](https://news.ycombinator.com/api)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
