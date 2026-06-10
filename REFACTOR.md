# AI & Tech Dashboard - Refactored

Um dashboard moderno para visualizar as principais histórias de tecnologia e IA do Hacker News.

## 🚀 Melhorias Implementadas

### Estrutura do Projeto
- ✨ **Componentes Modulares**: Cada componente em seu próprio arquivo com CSS modular
- 📁 **Organização Clara**: 
  - `components/` - Componentes reutilizáveis
  - `pages/` - Páginas da aplicação
  - `hooks/` - Hooks customizados
  - `services/` - Chamadas à API
  - `types/` - Tipos TypeScript
  - `styles/` - Estilos globais

### Componentes
- **Header** - Cabeçalho com logo e badge "Live"
- **SearchBar** - Barra de busca com limpeza automática
- **NewsCard** - Card de notícia com metadados e ações
- **LoadingState** - Skeletons animados para carregamento
- **EmptyState** - Estado vazio com mensagem amigável
- **ErrorState** - Estado de erro com botão de retry

### UX/UI Melhorado
- 🎨 **Design System Consistente**: Variáveis CSS para cores, espaçamento e animações
- ⚡ **Animações Suaves**: Transições e efeitos visuais
- 📱 **Responsivo**: Mobile-first, adaptado para todos os tamanhos
- ♿ **Acessibilidade**: Labels semânticos e ARIA attributes
- 🌙 **Tema Escuro**: Paleta de cores profissional

### Performance
- 🔄 **React Query**: Cache inteligente e refetch automático
- 📦 **30 histórias**: Mais conteúdo que antes
- ⚙️ **Otimizações**: Lazy loading e memoização onde necessário

### Código
- 📝 **TypeScript**: Tipagem completa
- 🎯 **Componentes Puros**: Sem estado global complexo
- 🧹 **Limpo e Legível**: Seguindo boas práticas React

## 📦 Tecnologias

- **React 19** - UI library
- **TypeScript** - Type safety
- **React Query** - State management & caching
- **React Router DOM** - Routing
- **Vite** - Build tool
- **ESLint** - Code quality

## 🚀 Começar

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) para ver a aplicação.

## 📄 Build

```bash
npm run build
npm run preview
```

## 🎯 Características

- ✅ Listagem de histórias em tempo real
- ✅ Busca e filtro por título
- ✅ Metadados completos (pontos, comentários, autor, data)
- ✅ Links diretos para artigo e Hacker News
- ✅ Estados de carregamento, erro e vazio
- ✅ Design responsivo
- ✅ Animações suaves

## 📊 API

Dados fornecidos pelo [Hacker News API](https://news.ycombinator.com/api)

---

Desenvolvido com ❤️ em 2026
