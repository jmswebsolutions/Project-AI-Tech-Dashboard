import type { Story } from '../../api/newsApi';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateStory(story: Story): ValidationResult {
  const errors: string[] = [];

  // Validate required fields
  if (!story.id || story.id <= 0) {
    errors.push('Story must have a valid positive ID');
  }

  if (!story.title || story.title.trim().length === 0) {
    errors.push('Story must have a non-empty title');
  }

  if (!story.by || story.by.trim().length === 0) {
    errors.push('Story must have a valid author');
  }

  if (story.score < 0) {
    errors.push('Story score cannot be negative');
  }

  // Validate URL if present
  if (story.url) {
    try {
      new URL(story.url);
    } catch {
      errors.push('Story must have a valid URL');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateStories(stories: Story[]): ValidationResult {
  const allErrors: string[] = [];

  stories.forEach((story) => {
    const result = validateStory(story);
    if (!result.isValid) {
      allErrors.push(`Story #${story.id}: ${result.errors.join(', ')}`);
    }
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}
