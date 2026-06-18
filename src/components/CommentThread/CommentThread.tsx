import { useState } from 'react';
import type { Comment } from '../../api/newsApi';
import styles from './CommentThread.module.css';

interface CommentThreadProps {
  comments: Comment[];
  storyId: number;
}

interface CommentNodeProps {
  comment: Comment;
  depth: number;
  onLoadChildren: (commentId: number) => void;
  childrenLoaded: Set<number>;
}

function CommentNode({ comment, depth, onLoadChildren, childrenLoaded }: CommentNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = comment.kids && comment.kids.length > 0;
  const children = childrenLoaded.has(comment.id);

  const handleLoadChildren = () => {
    if (hasChildren && !children) {
      onLoadChildren(comment.id);
    }
  };

  const timeAgo = new Date(comment.time * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.commentNode} style={{ marginLeft: `${depth * 16}px` }}>
      <div className={styles.commentHeader}>
        <span className={styles.author}>{comment.by}</span>
        <span className={styles.time}>{timeAgo}</span>
        {hasChildren && (
          <button
            className={styles.toggleButton}
            onClick={() => {
              if (!children) {
                handleLoadChildren();
              }
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? '−' : '+'} {comment.kids?.length}
          </button>
        )}
      </div>
      {isExpanded && (
        <div
          className={styles.commentText}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      )}
    </div>
  );
}

export function CommentThread({ comments, storyId }: CommentThreadProps) {
  const [loadedChildren, setLoadedChildren] = useState<Set<number>>(new Set());
  const [allComments, setAllComments] = useState<Comment[]>(comments);

  const loadChildren = async (commentId: number) => {
    if (loadedChildren.has(commentId)) return;

    try {
      const { getCommentTree } = await import('../../api/newsApi');
      const comment = allComments.find(c => c.id === commentId);
      if (comment?.kids) {
        const childComments = await getCommentTree(comment.kids);
        setAllComments(prev => [...prev, ...childComments]);
        setLoadedChildren(prev => new Set([...prev, commentId]));
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  // Build comment tree
  const topLevelComments = allComments.filter(c => !c.parent || c.parent === storyId);

  return (
    <div className={styles.commentThread}>
      <h3 className={styles.title}>Comments ({allComments.length})</h3>
      <div className={styles.commentsList}>
        {topLevelComments.map(comment => (
          <CommentNode
            key={comment.id}
            comment={comment}
            depth={0}
            onLoadChildren={loadChildren}
            childrenLoaded={loadedChildren}
          />
        ))}
      </div>
    </div>
  );
}
