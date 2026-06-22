export type StoryCategory = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export interface Story {
  id: number;
  title: string;
  by: string;
  score: number;
  url: string;
  time: number;
  descendants?: number;
  kids?: number[];
}

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
  
  const childCommentPromises = comments
    .filter(comment => comment.kids && comment.kids.length > 0)
    .map(comment => getCommentTree(comment.kids!));
  
  const allChildComments = await Promise.all(childCommentPromises);
  
  comments.push(...allChildComments.flat());
  
  return comments;
}