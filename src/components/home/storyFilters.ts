import type { Story } from '../../types/Story';

type ViewFilter = 'all' | 'favorites';
export type TimeFilter = 'all' | '24h' | 'week' | 'month';

export function filterStories(
  stories: Story[],
  view: ViewFilter,
  search: string,
  isFavorite: (id: number) => boolean,
  timeFilter: TimeFilter = 'all',
  minScore: number = 0
): Story[] {
  const now = Date.now();
  const filters = stories
    .filter((s) => (view === 'favorites' ? isFavorite(s.id) : true))
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => s.score >= minScore);

  if (timeFilter === 'all') return filters;

  const timeThresholds = {
    '24h': 24 * 60 * 60 * 1000,
    'week': 7 * 24 * 60 * 60 * 1000,
    'month': 30 * 24 * 60 * 60 * 1000,
  };

  return filters.filter((s) => {
    const storyTime = s.time * 1000;
    return now - storyTime <= timeThresholds[timeFilter];
  });
}
