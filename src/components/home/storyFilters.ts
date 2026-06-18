import type { Story } from '../../types/Story';

type ViewFilter = 'all' | 'favorites';

export function filterStories(
  stories: Story[],
  view: ViewFilter,
  search: string,
  isFavorite: (id: number) => boolean
): Story[] {
  return stories
    .filter((s) => (view === 'favorites' ? isFavorite(s.id) : true))
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
}
