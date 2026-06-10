import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'AI & Tech Dashboard', subtitle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.icon}>⚡</div>
            <div>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          <div className={styles.badge}>Live</div>
        </div>
      </div>
    </header>
  );
}
