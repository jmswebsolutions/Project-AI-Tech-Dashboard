import type { Story } from '../../types/Story';
import { NewsCard } from '../NewsCard/NewsCard';
import styles from './NewsGrid.module.css';

interface NewsGridProps {
  stories: Story[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  isRead?: (id: number) => boolean;
  onToggleRead?: (id: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function NewsGrid({
  stories,
  isFavorite,
  onToggleFavorite,
  isRead,
  onToggleRead,
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
          isRead={isRead ? isRead(story.id) : false}
          onToggleRead={onToggleRead}
        />
      ))}
      {hasNextPage && <div ref={sentinelRef} className={styles.sentinel} />}
      {isFetchingNextPage && (
        <div className={styles.loadingMore}>Loading more stories...</div>
      )}
    </div>
  );
}
