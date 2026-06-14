import type { Story } from "../types/Story";

export type StoryCategory = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

const categoryEndpoints: Record<StoryCategory, string> = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
  ask: 'askstories',
  show: 'showstories',
  job: 'jobstories',
};

export async function getStoriesByCategory(category: StoryCategory = 'top'): Promise<number[]> {
  const endpoint = categoryEndpoints[category];
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/${endpoint}.json`
  );

  return response.json();
}

export async function getTopStories(): Promise<number[]> {
  return getStoriesByCategory('top');
}

export async function getStory(
  id: number
): Promise<Story> {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return response.json();
}