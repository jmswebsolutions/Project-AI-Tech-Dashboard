import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { useTheme } from './hooks/useTheme';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  useTheme(); // Initialize theme to apply CSS variables globally

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;