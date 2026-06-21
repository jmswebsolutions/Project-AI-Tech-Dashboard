import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { FilterBar } from '../components/home/FilterBar';
import { FilterPanel } from '../components/FilterPanel/FilterPanel';
import { ContentArea } from '../components/home/ContentArea';
import { useNews } from '../hooks/useNews';
import { useFavorites } from '../hooks/useFavorites';
import { useReadHistory } from '../hooks/useReadHistory';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { filterStories, type TimeFilter } from '../components/home/storyFilters';
import type { StoryCategory } from '../api/newsApi';
import styles from './Home.module.css';

type ViewFilter = 'all' | 'favorites';

export function Home() {
  const [category, setCategory] = useState<StoryCategory>('top');
  const { stories, loading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useNews(category);
  const { toggleFavorite, isFavorite, favoriteCount } = useFavorites();
  const { markAsRead, markAsUnread, isRead } = useReadHistory();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [minScore, setMinScore] = useState(0);
  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage);

  const handleToggleRead = (storyId: number) => {
    if (isRead(storyId)) {
      markAsUnread(storyId);
    } else {
      markAsRead(storyId);
    }
  };

  const filtered = filterStories(stories, view, search, isFavorite, timeFilter, minScore);
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
            <FilterPanel
              timeFilter={timeFilter}
              minScore={minScore}
              onTimeFilterChange={setTimeFilter}
              onMinScoreChange={setMinScore}
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
            isRead={isRead}
            onToggleRead={handleToggleRead}
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
