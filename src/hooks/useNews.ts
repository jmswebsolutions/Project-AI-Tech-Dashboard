import { useInfiniteQuery } from '@tanstack/react-query';
import { getStory, getStoriesByCategory, type StoryCategory } from '../services/newsApi';

const STORIES_PER_PAGE = 30;

export function useNews(category: StoryCategory = 'top') {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', category],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      try {
        const ids = await getStoriesByCategory(category);
        const startIndex = pageParam * STORIES_PER_PAGE;
        const endIndex = startIndex + STORIES_PER_PAGE;
        const pageIds = ids.slice(startIndex, endIndex);

        const storiesData = await Promise.all(
          pageIds.map((id) => getStory(id))
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < STORIES_PER_PAGE) return undefined;
      return allPages.length;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const stories = data?.pages.flat() || [];

  return {
    stories,
    loading,
    error: error?.message || '',
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}