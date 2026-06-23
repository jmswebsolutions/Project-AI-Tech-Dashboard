import { useEffect } from 'react';

interface KeyboardShortcutsOptions {
  onNavigateDown?: () => void;
  onNavigateUp?: () => void;
  onToggleFavorite?: () => void;
  onToggleTheme?: () => void;
  onFocusSearch?: () => void;
}

export function useKeyboardShortcuts({
  onNavigateDown,
  onNavigateUp,
  onToggleFavorite,
  onToggleTheme,
  onFocusSearch,
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // j or ArrowDown - navigate down
      if ((e.key === 'j' || e.key === 'ArrowDown') && onNavigateDown) {
        e.preventDefault();
        onNavigateDown();
      }

      // k or ArrowUp - navigate up
      if ((e.key === 'k' || e.key === 'ArrowUp') && onNavigateUp) {
        e.preventDefault();
        onNavigateUp();
      }

      // f - toggle favorite
      if (e.key === 'f' && onToggleFavorite) {
        e.preventDefault();
        onToggleFavorite();
      }

      // t - toggle theme
      if (e.key === 't' && onToggleTheme) {
        e.preventDefault();
        onToggleTheme();
      }

      // / - focus search
      if (e.key === '/' && onFocusSearch) {
        e.preventDefault();
        onFocusSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigateDown, onNavigateUp, onToggleFavorite, onToggleTheme, onFocusSearch]);
}
