import type { StoryCategory } from '../../services/newsApi';
import { categoryLabels } from '../../constants/categories';
import styles from './CategorySelector.module.css';

interface CategorySelectorProps {
  value: StoryCategory;
  onChange: (category: StoryCategory) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Category</legend>
      <div className={styles.radioGroup}>
        {(Object.keys(categoryLabels) as StoryCategory[]).map((cat) => (
          <label key={cat} className={styles.label}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={value === cat}
              onChange={() => onChange(cat)}
              className={styles.radio}
            />
            <span className={styles.text}>{categoryLabels[cat]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
