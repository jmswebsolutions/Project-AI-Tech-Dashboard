import type { StoryCategory } from '../../services/newsApi';
import { CategorySelector } from './CategorySelector';
import { FavoritesToggle } from './FavoritesToggle';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  category: StoryCategory;
  view: 'all' | 'favorites';
  onCategoryChange: (category: StoryCategory) => void;
  onViewChange: (view: 'all' | 'favorites') => void;
  favoriteCount: number;
}

export function FilterBar({
  category,
  view,
  onCategoryChange,
  onViewChange,
  favoriteCount,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <CategorySelector value={category} onChange={onCategoryChange} />
      <div className={styles.separator} />
      <FavoritesToggle value={view} onChange={onViewChange} count={favoriteCount} />
    </div>
  );
}
