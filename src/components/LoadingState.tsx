import React from 'react';
import styles from './LoadingState.module.css';

export function LoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonHeader} />
            <div className={styles.skeletonLine1} />
            <div className={styles.skeletonLine2} />
            <div className={styles.skeletonFooter} />
          </div>
        ))}
      </div>
    </div>
  );
}
