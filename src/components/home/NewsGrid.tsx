import type { Story } from '../../types/Story';
import { NewsCard } from '../NewsCard';
import styles from './NewsGrid.module.css';

interface NewsGridProps {
  stories: Story[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement>;
}

export function NewsGrid({
  stories,
  isFavorite,
  onToggleFavorite,
  hasNextPage,
  isFetchingNextPage,
  sentinelRef,
}: NewsGridProps) {
  return (
    <div className={styles.grid}>
      {stories.map((story, i) => (
        <NewsCard
          key={story.id}
          story={story}
          index={i}
          isFavorite={isFavorite(story.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
      {hasNextPage && <div ref={sentinelRef} className={styles.sentinel} />}
      {isFetchingNextPage && (
        <div className={styles.loadingMore}>Loading more stories...</div>
      )}
    </div>
  );
}
