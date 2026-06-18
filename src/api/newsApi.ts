import type { Story } from "../types/Story";

export type StoryCategory = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  parent: number;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
}

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

export async function getComment(id: number): Promise<Comment> {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return response.json();
}

export async function getComments(commentIds: number[]): Promise<Comment[]> {
  const comments = await Promise.all(
    commentIds.map(id => getComment(id))
  );
  return comments.filter(comment => !comment.deleted && !comment.dead);
}

export async function getCommentTree(commentIds: number[]): Promise<Comment[]> {
  const comments = await getComments(commentIds);
  
  for (const comment of comments) {
    if (comment.kids && comment.kids.length > 0) {
      const childComments = await getCommentTree(comment.kids);
      comments.push(...childComments);
    }
  }
  
  return comments;
}