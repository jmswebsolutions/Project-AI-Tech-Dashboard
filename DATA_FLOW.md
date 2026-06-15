# Data Flow Documentation

This document describes the data flow in the AI & Tech Dashboard application using Mermaid diagrams.

## Table of Contents

- [High-Level Data Flow](#high-level-data-flow)
- [Component Data Flow](#component-data-flow)
- [State Management Flow](#state-management-flow)
- [API Data Flow](#api-data-flow)
- [User Interaction Flow](#user-interaction-flow)

---

## High-Level Data Flow

```mermaid
graph TD
    A[User] -->|Interacts with UI| B[Home Component]
    B -->|Manages State| C[React Hooks]
    C -->|useNews| D[React Query]
    D -->|Fetches Data| E[Hacker News API]
    E -->|Returns Stories| D
    D -->|Returns Stories| C
    C -->|useFavorites| F[localStorage]
    F -->|Returns Favorites| C
    C -->|useTheme| G[localStorage]
    G -->|Returns Theme| C
    C -->|Returns Data| B
    B -->|Renders Components| H[UI Components]
    H -->|Displays| A
```

---

## Component Data Flow

```mermaid
graph TD
    A[Home Component] -->|Passes Props| B[FilterBar]
    A -->|Passes Props| C[ContentArea]
    A -->|Passes Props| D[Header]
    A -->|Passes Props| E[SearchBar]
    
    B -->|Passes Props| F[CategorySelector]
    B -->|Passes Props| G[FavoritesToggle]
    
    C -->|Passes Props| H[ResultsInfo]
    C -->|Passes Props| I[NewsGrid]
    C -->|Passes Props| J[LoadingState]
    C -->|Passes Props| K[ErrorState]
    C -->|Passes Props| L[EmptyState]
    
    I -->|Passes Props| M[NewsCard]
```

---

## State Management Flow

```mermaid
graph TD
    A[Home Component] -->|useState| B[Category State]
    A -->|useState| C[Search State]
    A -->|useState| D[View State]
    
    A -->|useNews| E[Stories Data]
    A -->|useNews| F[Loading State]
    A -->|useNews| G[Error State]
    A -->|useNews| H[HasNextPage]
    A -->|useNews| I[FetchNextPage]
    
    A -->|useFavorites| J[Favorites Data]
    A -->|useFavorites| K[ToggleFavorite]
    A -->|useFavorites| L[IsFavorite]
    
    A -->|useInfiniteScroll| M[SentinelRef]
    
    B -->|filterStories| N[Filtered Stories]
    C -->|filterStories| N
    D -->|filterStories| N
    E -->|filterStories| N
    L -->|filterStories| N
    
    N -->|Render| O[NewsGrid]
```

---

## API Data Flow

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

## User Interaction Flow

```mermaid
graph TD
    A[User] -->|Selects Category| B[CategorySelector]
    B -->|onChange| C[Home Component]
    C -->|setCategory| D[Category State]
    D -->|useNews| E[useNews Hook]
    E -->|Fetches Data| F[React Query]
    F -->|Returns Stories| E
    E -->|Returns Stories| C
    C -->|filterStories| G[Filtered Stories]
    G -->|Render| H[NewsGrid]
    
    A -->|Toggles Favorites| I[FavoritesToggle]
    I -->|onChange| C
    C -->|setView| J[View State]
    J -->|filterStories| G
    G -->|Render| H
    
    A -->|Types Search| K[SearchBar]
    K -->|onChange| C
    C -->|setSearch| L[Search State]
    L -->|filterStories| G
    G -->|Render| H
    
    A -->|Scrolls| M[NewsGrid]
    M -->|Intersection Observer| N[useInfiniteScroll]
    N -->|fetchNextPage| E
    E -->|Returns More Stories| C
    C -->|filterStories| G
    G -->|Render| H
```

---

## Filter Logic Flow

```mermaid
graph TD
    A[Stories Array] -->|Filter 1| B{View == Favorites?}
    B -->|Yes| C[isFavorite id check]
    B -->|No| D[Pass All]
    C -->|True| E[Include Story]
    C -->|False| F[Exclude Story]
    D -->|Filter 2| G{Search Match?}
    E -->|Filter 2| G
    G -->|Yes| H[Include Story]
    G -->|No| F
    H -->|Result| I[Filtered Stories]
    F -->|Result| I
```

---

## Infinite Scroll Flow

```mermaid
graph TD
    A[User Scrolls] -->|Sentinel Visible| B[Intersection Observer]
    B -->|Callback| C[useInfiniteScroll Hook]
    C -->|Check Conditions| D{hasNextPage && !isFetchingNextPage?}
    D -->|Yes| E[fetchNextPage]
    D -->|No| F[Do Nothing]
    E -->|React Query| G[useInfiniteQuery]
    G -->|Fetch Next Page| H[Hacker News API]
    H -->|Returns Stories| G
    G -->|Update Stories| I[Home Component]
    I -->|Re-render| J[NewsGrid]
    J -->|Add Sentinel| K[Bottom of List]
```

---

## Favorites Flow

```mermaid
graph TD
    A[User Clicks Star] -->|onToggleFavorite| B[NewsCard]
    B -->|Call| C[Home Component]
    C -->|Call| D[useFavorites Hook]
    D -->|Update| E[localStorage]
    E -->|Success| D
    D -->|Return Updated| C
    C -->|Re-filter| F[filterStories]
    F -->|Re-render| G[NewsGrid]
    G -->|Update Star| H[NewsCard]
```

---

## Theme Flow

```mermaid
graph TD
    A[User Clicks Theme Toggle] -->|onClick| B[Header Component]
    B -->|Call| C[useTheme Hook]
    C -->|Toggle| D[localStorage]
    D -->|Update| E[data-theme Attribute]
    E -->|CSS Variables| F[Apply Theme]
    F -->|Re-render| G[All Components]
```

---

## Error Handling Flow

```mermaid
graph TD
    A[API Request] -->|Error| B[React Query]
    B -->|Return Error| C[useNews Hook]
    C -->|Return Error| D[Home Component]
    D -->|Pass Error| E[ContentArea]
    E -->|Check Error| F{Error Exists?}
    F -->|Yes| G[Render ErrorState]
    F -->|No| H[Check Loading}
    G -->|User Clicks Retry| I[onRetry]
    I -->|Call| C
    C -->|Refetch| B
    B -->|Retry Request| A
```

---

## Summary

The data flow in the AI & Tech Dashboard follows these patterns:

1. **Unidirectional Data Flow**: Data flows from hooks to components to UI
2. **State Management**: Local state managed with React hooks
3. **Data Fetching**: React Query handles API calls and caching
4. **User Interactions**: User actions trigger state updates
5. **Re-rendering**: State changes trigger component re-renders
6. **Filtering**: Stories filtered based on user preferences
7. **Infinite Scroll**: Intersection Observer triggers page fetching
8. **Persistence**: Favorites and theme persisted in localStorage

This architecture ensures predictable data flow, easy debugging, and good performance.
