import type { StoryCategory } from '../services/newsApi';

export const categoryLabels: Record<StoryCategory, string> = {
  top: 'Top Stories',
  new: 'New',
  best: 'Best',
  ask: 'Ask HN',
  show: 'Show HN',
  job: 'Jobs',
};
