import styles from './FilterPanel.module.css';
import type { TimeFilter } from '../home/storyFilters';

interface FilterPanelProps {
  timeFilter: TimeFilter;
  minScore: number;
  onTimeFilterChange: (filter: TimeFilter) => void;
  onMinScoreChange: (score: number) => void;
}

export function FilterPanel({ timeFilter, minScore, onTimeFilterChange, onMinScoreChange }: FilterPanelProps) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Time Period</label>
        <div className={styles.buttonGroup}>
          {(['all', '24h', 'week', 'month'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.filterButton} ${timeFilter === filter ? styles.active : ''}`}
              onClick={() => onTimeFilterChange(filter)}
            >
              {filter === 'all' ? 'All' : filter === '24h' ? '24h' : filter === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Min Score</label>
        <div className={styles.scoreInput}>
          <input
            type="number"
            min="0"
            max="1000"
            value={minScore}
            onChange={(e) => onMinScoreChange(Number(e.target.value))}
            className={styles.input}
          />
          <span className={styles.unit}>points</span>
        </div>
      </div>
    </div>
  );
}
