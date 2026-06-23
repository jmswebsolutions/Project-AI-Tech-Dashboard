import type { Story } from '../../api/newsApi';

export interface RelevanceScore {
  score: number;
  factors: {
    scoreWeight: number;
    commentsWeight: number;
    recencyWeight: number;
  };
}

export function calculateRelevance(story: Story, currentTime: number = Date.now()): RelevanceScore {
  const ageHours = (currentTime - story.time * 1000) / (1000 * 60 * 60);
  
  // Score weight: higher score = more relevant
  const scoreWeight = Math.min(story.score / 100, 1) * 0.4;
  
  // Comments weight: more comments = more engagement
  const commentsWeight = Math.min((story.descendants || 0) / 50, 1) * 0.3;
  
  // Recency weight: newer stories = more relevant (decays over time)
  const recencyWeight = Math.max(0, 1 - ageHours / 24) * 0.3;
  
  const totalScore = scoreWeight + commentsWeight + recencyWeight;
  
  return {
    score: totalScore,
    factors: {
      scoreWeight,
      commentsWeight,
      recencyWeight,
    },
  };
}

export function sortByRelevance(stories: Story[]): Story[] {
  const currentTime = Date.now();
  
  return [...stories].sort((a, b) => {
    const relevanceA = calculateRelevance(a, currentTime).score;
    const relevanceB = calculateRelevance(b, currentTime).score;
    return relevanceB - relevanceA;
  });
}
