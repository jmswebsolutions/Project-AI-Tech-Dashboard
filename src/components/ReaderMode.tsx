import { useState, useEffect } from 'react';
import type { Story } from '../types/Story';
import styles from './ReaderMode.module.css';

interface ReaderModeProps {
  story: Story;
  onClose: () => void;
}

export function ReaderMode({ story, onClose }: ReaderModeProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      if (!story.url) {
        setLoading(false);
        return;
      }

      try {
        // Try to fetch the article content
        // Note: This is a simplified version. In production, you'd need a backend service
        // to handle CORS and extract article content properly
        const response = await fetch(story.url);
        if (!response.ok) throw new Error('Failed to fetch article');
        const html = await response.text();
        
        // Very basic HTML extraction (not production-ready)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleContent = doc.querySelector('article, main, .content, .post-content')?.innerHTML || '';
        
        setContent(articleContent || 'Could not extract article content. Please read the original article.');
      } catch (err) {
        setError('Unable to load article content. Please read the original article.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [story.url]);

  return (
    <div className={styles.readerMode}>
      <div className={styles.readerContainer}>
        <header className={styles.readerHeader}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close reader mode"
          >
            ← Back
          </button>
          <h1 className={styles.readerTitle}>{story.title}</h1>
          <div className={styles.readerMeta}>
            <span className={styles.metaItem}>By {story.by}</span>
            <span className={styles.metaItem}>{story.score} points</span>
            <span className={styles.metaItem}>{story.descendants ?? 0} comments</span>
          </div>
        </header>

        <main className={styles.readerContent}>
          {loading ? (
            <div className={styles.loading}>Loading article...</div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className={styles.readOriginal}
              >
                Read Original Article →
              </a>
            </div>
          ) : (
            <div
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </main>

        <footer className={styles.readerFooter}>
          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
            className={styles.originalLink}
          >
            Read Original Article
          </a>
        </footer>
      </div>
    </div>
  );
}
