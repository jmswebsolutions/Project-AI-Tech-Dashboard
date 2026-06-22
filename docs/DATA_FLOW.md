# Data Flow Documentation

This document describes the data flow and state transitions in the AI & Tech Dashboard application.

## Table of Contents

- [Story Favorite State](#story-favorite-state)
- [Theme State](#theme-state)
- [API Sequence Diagram](#api-sequence-diagram)

---

## Story Favorite State

A story can transition between normal and favorited states:

```mermaid
stateDiagram-v2
    [*] --> Normal
    Normal --> Favorited: User clicks favorite
    Favorited --> Normal: User removes favorite
    Normal --> [*]
    Favorited --> [*]
```

---

## Theme State

The application theme can transition between light and dark modes:

```mermaid
stateDiagram-v2
    [*] --> Light: Default
    Light --> Dark: User toggles theme
    Dark --> Light: User toggles theme
    Light --> [*]
    Dark --> [*]
```

---

## API Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant H as Home Component
    participant N as useNews Hook
    participant RQ as React Query
    participant API as Hacker News API
    
    U->>H: Changes Category
    H->>N: Calls useNews(category)
    N->>RQ: useInfiniteQuery
    RQ->>API: getStoriesByCategory(category)
    API-->>RQ: Returns IDs [1, 2, 3, ...]
    RQ->>API: getStory(id) × 30
    API-->>RQ: Returns Stories Data
    RQ-->>N: Returns { stories, loading, error, ... }
    N-->>H: Returns Data
    H->>H: filterStories(stories)
    H->>U: Renders Filtered Stories
    
    U->>H: Scrolls to Bottom
    H->>N: useInfiniteScroll
    N->>RQ: fetchNextPage()
    RQ->>API: getStoriesByCategory(category)
    API-->>RQ: Returns IDs
    RQ->>API: getStory(id) × 30
    API-->>RQ: Returns Stories Data
    RQ-->>N: Returns Next Page
    N-->>H: Returns Updated Stories
    H->>U: Renders More Stories
```

---

## Summary

The data flow in the AI & Tech Dashboard follows these patterns:

1. **State Transitions**: Simple, project-specific state transitions (story favorite status, theme)
2. **Data Fetching**: React Query handles caching, retry, and state management
3. **User Interactions**: User actions trigger data flow through hooks
4. **Persistence**: Favorites and theme persisted in localStorage
5. **Infinite Scroll**: Efficient pagination with Intersection Observer
