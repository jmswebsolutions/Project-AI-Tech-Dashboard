import React from 'react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Failed to load stories', onRetry }: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>Error</h2>
      <p className={styles.description}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
