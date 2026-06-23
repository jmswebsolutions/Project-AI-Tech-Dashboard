import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from './useFavorites'

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toBeInstanceOf(Set)
    expect(result.current.favoriteCount).toBe(0)
  })

  it('should add a story to favorites', () => {
    const { result } = renderHook(() => useFavorites())
    
    act(() => {
      result.current.toggleFavorite(1)
    })
    
    expect(result.current.favorites).toContain(1)
    expect(result.current.isFavorite(1)).toBe(true)
    expect(result.current.favoriteCount).toBe(1)
  })

  it('should remove a story from favorites', () => {
    const { result } = renderHook(() => useFavorites())
    
    act(() => {
      result.current.toggleFavorite(1)
    })
    
    act(() => {
      result.current.toggleFavorite(1)
    })
    
    expect(result.current.favorites).not.toContain(1)
    expect(result.current.isFavorite(1)).toBe(false)
    expect(result.current.favoriteCount).toBe(0)
  })

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites())
    
    act(() => {
      result.current.toggleFavorite(1)
    })
    
    const stored = localStorage.getItem('ai_tech_dashboard_favorites')
    expect(stored).toBe('[1]')
  })
})
