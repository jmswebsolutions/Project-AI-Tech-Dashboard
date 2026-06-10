import type { Story } from '../types/Story';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  story: Story;
  index: number;
}

export function NewsCard({ story, index }: NewsCardProps) {
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
  const isCommentOnly = !story.url;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.rank}>{String(index + 1).padStart(2, '0')}</span>
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
          className={`${styles.button} ${isCommentOnly ? styles.primary : ''}`}
        >
          {isCommentOnly ? 'View on HN' : 'Discuss'}
        </a>
      </div>
    </article>
  );
}