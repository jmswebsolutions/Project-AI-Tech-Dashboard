# State Flow Documentation

This document describes the state transitions in the AI & Tech Dashboard application using state diagrams.

## Table of Contents

- [Home Component State](#home-component-state)
- [News Fetching State](#news-fetching-state)
- [Favorites State](#favorites-state)
- [Theme State](#theme-state)
- [Comments State](#comments-state)
- [API Sequence Diagram](#api-sequence-diagram)

---

## Home Component State

```mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> Loading: Component Mount
    Loading --> Success: Data Fetched
    Loading --> Error: Fetch Failed
    Success --> Loading: Category Changed
    Success --> Loading: View Changed
    Success --> Success: Search Changed
    Error --> Loading: Retry
    Success --> [*]
    Error --> [*]
```

---

## News Fetching State

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Fetching: Category Changed
    Fetching --> Success: Data Received
    Fetching --> Error: Request Failed
    Success --> Fetching: Load More (Infinite Scroll)
    Success --> Idle: No More Pages
    Error --> Fetching: Retry
    Success --> [*]
    Error --> [*]
    Idle --> [*]
```

---

## Favorites State

```mermaid
stateDiagram-v2
    [*] --> All
    All --> Favorites: Toggle Favorites
    Favorites --> All: Toggle All
    All --> All: Add Favorite
    Favorites --> Favorites: Add Favorite
    All --> All: Remove Favorite
    Favorites --> Favorites: Remove Favorite
```

---

## Theme State

```mermaid
stateDiagram-v2
    [*] --> Light: Default
    Light --> Dark: Toggle Theme
    Dark --> Light: Toggle Theme
```

---

## Comments State

```mermaid
stateDiagram-v2
    [*] --> Collapsed
    Collapsed --> Loading: Click Comments
    Loading --> Expanded: Comments Loaded
    Loading --> Collapsed: Load Failed
    Expanded --> Collapsed: Click Comments
    Expanded --> [*]
    Collapsed --> [*]
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

The state flow in the AI & Tech Dashboard follows these patterns:

1. **State Transitions**: Components transition between states based on user actions and data changes
2. **Loading States**: Async operations have explicit loading, success, and error states
3. **User Interactions**: User actions trigger state transitions
4. **Persistence**: Favorites and theme persisted in localStorage
5. **Infinite Scroll**: State transitions trigger page fetching
6. **Error Recovery**: Error states allow retry actions

This architecture ensures predictable state management, easy debugging, and good user experience.
