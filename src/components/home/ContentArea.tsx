import type { Story } from '../../types/Story';
import { LoadingState } from '../LoadingState/LoadingState';
import { EmptyState } from '../EmptyState/EmptyState';
import { ErrorState } from '../ErrorState/ErrorState';
import { NewsGrid } from './NewsGrid';
import { ResultsInfo } from './ResultsInfo';
import type { StoryCategory } from '../../api/newsApi';
import styles from './ContentArea.module.css';

interface ContentAreaProps {
  stories: Story[];
  filteredStories: Story[];
  isLoading: boolean;
  error: string;
  category: StoryCategory;
  view: 'all' | 'favorites';
  search: string;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  onRetry: () => void;
}

export function ContentArea({
  stories,
  filteredStories,
  isLoading,
  error,
  category,
  view,
  search,
  isFavorite,
  onToggleFavorite,
  hasNextPage,
  isFetchingNextPage,
  sentinelRef,
  onRetry,
}: ContentAreaProps) {
  const isLoadingContent = isLoading && stories.length === 0;

  if (isLoadingContent) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (filteredStories.length === 0) {
    return <EmptyState title="No stories found" description="Try adjusting your filters" />;
  }

  return (
    <div className={styles.contentArea}>
      <ResultsInfo
        count={filteredStories.length}
        category={category}
        view={view}
        search={search}
      />
      <NewsGrid
        stories={filteredStories}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        sentinelRef={sentinelRef}
      />
    </div>
  );
}
