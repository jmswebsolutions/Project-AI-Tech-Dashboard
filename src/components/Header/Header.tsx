import styles from './Header.module.css';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  favoriteCount?: number;
}

export function Header({ title = 'AI & Tech Dashboard', subtitle, favoriteCount = 0 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

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
          <div className={styles.actions}>
            {favoriteCount > 0 && (
              <div className={styles.favoritesBadge} title={`${favoriteCount} saved ${favoriteCount === 1 ? 'story' : 'stories'}`}>
                <span className={styles.favoritesIcon}>★</span>
                {favoriteCount}
              </div>
            )}
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className={styles.badge}>Live</div>
          </div>
        </div>
      </div>
    </header>
  );
}
