import { useState, useEffect } from 'react';

const READ_HISTORY_KEY = 'ai-tech-dashboard-read-history';

export function useReadHistory() {
  const [readHistory, setReadHistory] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(READ_HISTORY_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(READ_HISTORY_KEY, JSON.stringify([...readHistory]));
  }, [readHistory]);

  const markAsRead = (storyId: number) => {
    setReadHistory(prev => new Set([...prev, storyId]));
  };

  const markAsUnread = (storyId: number) => {
    setReadHistory(prev => {
      const newSet = new Set(prev);
      newSet.delete(storyId);
      return newSet;
    });
  };

  const isRead = (storyId: number) => {
    return readHistory.has(storyId);
  };

  const clearHistory = () => {
    setReadHistory(new Set());
  };

  const readCount = readHistory.size;

  return {
    readHistory,
    markAsRead,
    markAsUnread,
    isRead,
    clearHistory,
    readCount,
  };
}
