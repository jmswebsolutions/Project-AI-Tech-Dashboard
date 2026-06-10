import type { Story } from "../types/Story";

export async function getTopStories(): Promise<number[]> {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  return response.json();
}

export async function getStory(
  id: number
): Promise<Story> {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return response.json();
}