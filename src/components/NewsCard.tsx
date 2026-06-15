import type { Story } from '../types/Story';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  story: Story;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: (storyId: number) => void;
}

export function NewsCard({ story, index, isFavorite = false, onToggleFavorite }: NewsCardProps) {
  const date = new Date(story.time * 1000).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const domain = story.url
    ? (() => {
        try {
          return new URL(story.url).hostname.replace('www.', '');
        } catch {
          return '';
        }
      })()
    : '';

  const articleHref = story.url || '';
  const hnHref = `https://news.ycombinator.com/item?id=${story.id}`;

  const handleShare = async () => {
    const shareData = {
      title: story.title,
      text: `Check out this story from Hacker News: ${story.title}`,
      url: articleHref || hnHref,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.rank}>{String(index + 1).padStart(2, '0')}</span>
          {onToggleFavorite && (
            <button
              type="button"
              className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={() => onToggleFavorite(story.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )}
        </div>
        <a
          href={articleHref || hnHref}
          target="_blank"
          rel="noreferrer"
          className={styles.titleLink}
        >
          <h2 className={styles.title}>{story.title}</h2>
        </a>
      </div>

      <div className={styles.metadata}>
        <div className={styles.stats}>
          <span className={styles.stat} title="Points">
            <span className={styles.icon}>▲</span>
            {story.score}
          </span>
          <span className={styles.stat} title="Comments">
            <span className={styles.icon}>💬</span>
            {story.descendants ?? 0}
          </span>
        </div>
        <div className={styles.info}>
          <span className={styles.author} title={`by ${story.by}`}>{story.by}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.date} title={date}>{date}</span>
        </div>
      </div>

      {domain && <div className={styles.domain}>{domain}</div>}

      <div className={styles.actions}>
        {articleHref && (
          <a
            href={articleHref}
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${styles.primary}`}
          >
            Read Article
            <span className={styles.arrow}>→</span>
          </a>
        )}
        <a
          href={hnHref}
          target="_blank"
          rel="noreferrer"
          className={`${styles.button} ${styles.discussBtn}`}
          title={`${story.descendants ?? 0} comments`}
        >
          <span className={styles.icon}>💬</span>
          {story.descendants ?? 0}
        </a>
        <button
          type="button"
          className={styles.iconButton}
          onClick={handleShare}
          aria-label="Share story"
          title="Share story"
        >
          📤
        </button>
      </div>
    </article>
  );
}