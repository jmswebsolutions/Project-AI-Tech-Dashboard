import { describe, it, expect } from 'vitest'
import { filterStories } from './storyFilters'
import type { Story } from '../../api/newsApi'

describe('filterStories', () => {
  const mockStories: Story[] = [
    { id: 1, title: 'Test Story 1', by: 'user1', score: 100, url: 'https://example.com', time: 1234567890, descendants: 10, kids: [1, 2] },
    { id: 2, title: 'AI News', by: 'user2', score: 50, url: 'https://example.com', time: 1234567890, descendants: 5 },
    { id: 3, title: 'Tech Update', by: 'user3', score: 200, url: 'https://example.com', time: 1234567890, descendants: 20 },
  ]

  it('should return all stories when view is all and no filters applied', () => {
    const result = filterStories(mockStories, 'all', '', () => false, 'all', 0)
    expect(result).toHaveLength(3)
  })

  it('should filter by search term', () => {
    const result = filterStories(mockStories, 'all', 'AI', () => false, 'all', 0)
    expect(result).toHaveLength(1)
    expect(result[0].title).toContain('AI')
  })

  it('should filter by favorites', () => {
    const result = filterStories(mockStories, 'favorites', '', (id) => id === 1, 'all', 0)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('should filter by minimum score', () => {
    const result = filterStories(mockStories, 'all', '', () => false, 'all', 100)
    expect(result).toHaveLength(2)
    expect(result.every(story => story.score >= 100)).toBe(true)
  })

  it('should return empty array when no stories match', () => {
    const result = filterStories(mockStories, 'all', 'nonexistent', () => false, 'all', 1000)
    expect(result).toHaveLength(0)
  })
})
