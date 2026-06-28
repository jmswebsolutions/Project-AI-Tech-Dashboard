import { useState, useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

const FAVORITES_STORAGE_KEY = 'ai_tech_dashboard_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    // Carrega favoritos do localStorage ao inicializar
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return new Set(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        return new Set();
      }
    }
    return new Set();
  });

  // Sincroniza com localStorage sempre que favoritos mudam
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
      } catch (error) {
        console.error('Erro ao salvar favoritos:', error);
      }
    }
  }, [favorites]);

  const toggleFavorite = (storyId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      const isAdding = !newFavorites.has(storyId);
      
      if (isAdding) {
        newFavorites.add(storyId);
      } else {
        newFavorites.delete(storyId);
      }

      // Track analytics event
      try {
        mixpanel.track('Story Favorited', {
          storyId,
          action: isAdding ? 'added' : 'removed',
          totalFavorites: newFavorites.size,
        });
      } catch (error) {
        // Silently fail if Mixpanel is not configured
      }

      return newFavorites;
    });
  };

  const isFavorite = (storyId: number) => favorites.has(storyId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.size,
  };
}
