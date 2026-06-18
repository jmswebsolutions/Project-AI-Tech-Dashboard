import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ title = 'No stories found', description = 'Try adjusting your search or filters' }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🔍</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
