import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { FilterBar } from '../components/home/FilterBar';
import { ContentArea } from '../components/home/ContentArea';
import { useNews } from '../hooks/useNews';
import { useFavorites } from '../hooks/useFavorites';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { filterStories } from '../components/home/storyFilters';
import type { StoryCategory } from '../services/newsApi';
import styles from './Home.module.css';

type ViewFilter = 'all' | 'favorites';

export function Home() {
  const [category, setCategory] = useState<StoryCategory>('top');
  const { stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useNews(category);
  const { toggleFavorite, isFavorite, favoriteCount } = useFavorites();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewFilter>('all');
  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage);

  const filtered = filterStories(stories, view, search, isFavorite);
  const showToolbar = !error;

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
            <FilterBar
              category={category}
              view={view}
              onCategoryChange={setCategory}
              onViewChange={setView}
              favoriteCount={favoriteCount}
            />
          </div>
        </div>
      )}

      <main id="main-content" className={styles.main}>
        <div className={styles.container}>
          <ContentArea
            stories={stories}
            filteredStories={filtered}
            isLoading={loading}
            error={error}
            category={category}
            view={view}
            search={search}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            sentinelRef={sentinelRef}
            onRetry={() => refetch()}
          />
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
              <a href="https://github.com/jmswebsolutions/Project-AI-Tech-Dashboard" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
