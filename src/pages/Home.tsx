import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { NewsCard } from '../components/NewsCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { useNews } from '../hooks/useNews';
import { useFavorites } from '../hooks/useFavorites';
import type { StoryCategory } from '../services/newsApi';
import styles from './Home.module.css';

type ViewFilter = 'all' | 'favorites';

const categoryLabels: Record<StoryCategory, string> = {
  top: 'Top Stories',
  new: 'New',
  best: 'Best',
  ask: 'Ask HN',
  show: 'Show HN',
  job: 'Jobs',
};

function getEmptyState(
  view: ViewFilter,
  search: string,
  favoriteCount: number
): { title: string; description: string } {
  if (view === 'favorites') {
    if (favoriteCount === 0) {
      return {
        title: 'No favorites yet',
        description: 'Click the star on any story to save it here',
      };
    }
    if (search) {
      return {
        title: 'No favorites match',
        description: 'Try adjusting your search term',
      };
    }
    return {
      title: 'No favorites in current list',
      description: "Your saved stories aren't in the top 30 right now. Switch to All to browse.",
    };
  }

  if (search) {
    return {
      title: 'No stories match',
      description: 'Try adjusting your search term',
    };
  }

  return {
    title: 'No stories found',
    description: 'Please try again later',
  };
}

export function Home() {
  const [category, setCategory] = useState<StoryCategory>('top');
  const { stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useNews(category);
  const { toggleFavorite, isFavorite, favoriteCount } = useFavorites();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewFilter>('all');
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filtered = stories
    .filter((s) => (view === 'favorites' ? isFavorite(s.id) : true))
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const emptyState = getEmptyState(view, search, favoriteCount);
  const showToolbar = !loading && !error;

  return (
    <div className={styles.root}>
      <Header favoriteCount={favoriteCount} />

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

      {showToolbar && (
        <div className={styles.toolbar}>
          <div className={styles.container}>
            <div className={styles.toolbarContent}>
              <div className={styles.categoryGroup}>
                {(Object.keys(categoryLabels) as StoryCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.categoryBtn} ${category === cat ? styles.active : ''}`}
                    onClick={() => setCategory(cat)}
                    aria-pressed={category === cat}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
              <div className={styles.filterGroup}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${view === 'all' ? styles.active : ''}`}
                  onClick={() => setView('all')}
                  aria-pressed={view === 'all'}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${view === 'favorites' ? styles.active : ''}`}
                  onClick={() => setView('favorites')}
                  aria-pressed={view === 'favorites'}
                >
                  Favorites
                  {favoriteCount > 0 && (
                    <span className={styles.filterCount}>{favoriteCount}</span>
                  )}
                </button>
              </div>

              {stories.length > 0 && (
                <>
                  <span className={styles.label}>Showing</span>
                  <span className={`${styles.chip} ${!search && view === 'all' ? styles.active : ''}`}>
                    {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                  </span>
                  {view === 'favorites' && (
                    <>
                      <span className={styles.label}>in</span>
                      <span className={`${styles.chip} ${styles.active}`}>Favorites</span>
                    </>
                  )}
                  {search && (
                    <>
                      <span className={styles.label}>matching</span>
                      <span className={`${styles.chip} ${styles.active}`}>"{search}"</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={() => refetch()} />
          ) : filtered.length === 0 ? (
            <EmptyState title={emptyState.title} description={emptyState.description} />
          ) : (
            <div className={styles.grid}>
              {filtered.map((story, i) => (
                <NewsCard
                  key={story.id}
                  story={story}
                  index={i}
                  isFavorite={isFavorite(story.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
              {hasNextPage && (
                <div ref={sentinelRef} className={styles.sentinel} />
              )}
              {isFetchingNextPage && (
                <div className={styles.loadingMore}>Loading more stories...</div>
              )}
            </div>
          )}
        </div>
      </main>

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
              <a href="https://github.com/jmswebsolutions/Projeto-AI-Tech-Dashboard" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
