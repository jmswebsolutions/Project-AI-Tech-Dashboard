type ViewFilter = 'all' | 'favorites';

export interface EmptyStateProps {
  title: string;
  description: string;
}

export function getEmptyState(
  view: ViewFilter,
  search: string,
  favoriteCount: number
): EmptyStateProps {
  if (view === 'favorites') {
    if (favoriteCount === 0) {
      return {
        title: 'No favorites yet',
        description: 'Click the star on any story to save it here',
      };
    }
    if (search) {
      return {
        title: 'No favorites match',
        description: 'Try adjusting your search term',
      };
    }
    return {
      title: 'No favorites in current list',
      description: "Your saved stories aren't in the top 30 right now. Switch to All to browse.",
    };
  }

  if (search) {
    return {
      title: 'No stories match',
      description: 'Try adjusting your search term',
    };
  }

  return {
    title: 'No stories found',
    description: 'Please try again later',
  };
}
