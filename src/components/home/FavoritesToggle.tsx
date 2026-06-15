import styles from './FavoritesToggle.module.css';

interface FavoritesToggleProps {
  value: 'all' | 'favorites';
  onChange: (value: 'all' | 'favorites') => void;
  count: number;
}

export function FavoritesToggle({ value, onChange, count }: FavoritesToggleProps) {
  const isFavorites = value === 'favorites';
  
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={isFavorites}
        onChange={(e) => onChange(e.target.checked ? 'favorites' : 'all')}
        className={styles.input}
        aria-label={`Show ${isFavorites ? 'all stories' : 'favorites only'}`}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      <span className={styles.text}>
        Favorites {count > 0 && <span className={styles.count}>({count})</span>}
      </span>
    </label>
  );
}
