import { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { NewsCard } from '../components/NewsCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { useNews } from '../hooks/useNews';
import styles from './Home.module.css';

export function Home() {
  const { stories, loading, error, refetch } = useNews();
  const [search, setSearch] = useState('');

  const filtered = stories.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.root}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                Real-time Updates
              </p>
              <h1 className={styles.heading}>
                What's happening in <em>tech & AI</em>
              </h1>
              <p className={styles.subheading}>
                Top stories from Hacker News — sorted, discussed, and ranked by the community
              </p>
            </div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search stories..." />
          </div>
        </div>
      </section>

      {/* Toolbar */}
      {!loading && !error && stories.length > 0 && (
        <div className={styles.toolbar}>
          <div className={styles.container}>
            <div className={styles.toolbarContent}>
              <span className={styles.label}>Showing</span>
              <span className={`${styles.chip} ${!search ? styles.active : ''}`}>
                {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              </span>
              {search && (
                <>
                  <span className={styles.label}>matching</span>
                  <span className={`${styles.chip} ${styles.active}`}>"{search}"</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={() => refetch()} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title={search ? 'No stories match' : 'No stories found'}
              description={
                search
                  ? 'Try adjusting your search term'
                  : 'Please try again later'
              }
            />
          ) : (
            <div className={styles.grid}>
              {filtered.map((story, i) => (
                <NewsCard key={story.id} story={story} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              © 2026 AI & Tech Dashboard — Powered by{' '}
              <a href="https://news.ycombinator.com" target="_blank" rel="noreferrer">
                Hacker News API
              </a>
            </p>
            <div className={styles.footerLinks}>
              <a href="https://news.ycombinator.com" target="_blank" rel="noreferrer">
                Hacker News
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}