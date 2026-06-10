import { useQuery } from '@tanstack/react-query';
import { getStory, getTopStories } from '../services/newsApi';
import type { Story } from '../types/Story';

export function useNews() {
  const {
    data: stories = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<Story[], Error>({
    queryKey: ['topStories'],
    queryFn: async () => {
      try {
        const ids = await getTopStories();
        const top30Ids = ids.slice(0, 30);

        const storiesData = await Promise.all(
          top30Ids.map((id) => getStory(id))
        );

        return storiesData.filter(
          (story) => story.title && (story.url || story.id)
        );
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to load stories'
        );
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    stories,
    loading,
    error: error?.message || '',
    refetch,
  };
}