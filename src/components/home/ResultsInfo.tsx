import type { StoryCategory } from '../../api/newsApi';
import { categoryLabels } from '../../constants/categories';
import styles from './ResultsInfo.module.css';

interface ResultsInfoProps {
  count: number;
  category: StoryCategory;
  view: 'all' | 'favorites';
  search: string;
}

export function ResultsInfo({ count, category, view, search }: ResultsInfoProps) {
  if (count === 0) return null;

  return (
    <div className={styles.resultsInfo}>
      <span className={styles.label}>Showing</span>
      <span className={styles.chip}>
        {count} {count === 1 ? 'story' : 'stories'}
      </span>
      {view === 'favorites' && (
        <>
          <span className={styles.label}>in</span>
          <span className={styles.chip}>Favorites</span>
        </>
      )}
      {search && (
        <>
          <span className={styles.label}>matching</span>
          <span className={styles.chip}>"{search}"</span>
        </>
      )}
      {!search && view === 'all' && (
        <>
          <span className={styles.label}>in</span>
          <span className={styles.chip}>{categoryLabels[category as StoryCategory]}</span>
        </>
      )}
    </div>
  );
}
