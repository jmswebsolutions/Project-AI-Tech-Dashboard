import type { Story } from '../../api/newsApi';
import { validateStory } from '../validators/storyValidator';

export interface FilterOptions {
  minScore?: number;
  hasUrl?: boolean;
  hasComments?: boolean;
  author?: string;
  timeRange?: {
    from: number;
    to: number;
  };
}

export function filterStoriesByOptions(stories: Story[], options: FilterOptions): Story[] {
  return stories.filter(story => {
    // Validate story first
    const validation = validateStory(story);
    if (!validation.isValid) {
      return false;
    }

    // Filter by minimum score
    if (options.minScore !== undefined && story.score < options.minScore) {
      return false;
    }

    // Filter by URL presence
    if (options.hasUrl !== undefined) {
      const hasUrl = !!story.url;
      if (options.hasUrl && !hasUrl) return false;
      if (!options.hasUrl && hasUrl) return false;
    }

    // Filter by comments presence
    if (options.hasComments !== undefined) {
      const hasComments = (story.descendants || 0) > 0;
      if (options.hasComments && !hasComments) return false;
      if (!options.hasComments && hasComments) return false;
    }

    // Filter by author
    if (options.author && story.by !== options.author) {
      return false;
    }

    // Filter by time range
    if (options.timeRange) {
      if (story.time < options.timeRange.from || story.time > options.timeRange.to) {
        return false;
      }
    }

    return true;
  });
}

export function getTopStories(stories: Story[], limit: number = 10): Story[] {
  return [...stories]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getMostDiscussed(stories: Story[], limit: number = 10): Story[] {
  return [...stories]
    .sort((a, b) => (b.descendants || 0) - (a.descendants || 0))
    .slice(0, limit);
}
