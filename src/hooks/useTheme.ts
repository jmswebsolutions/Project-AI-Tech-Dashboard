import { useState, useEffect, useCallback } from 'react';
import { THEME_PRESETS, DEFAULT_THEME, DEFAULT_MODE, type ThemeMode, type ThemeColors } from '../constants/themes';
import mixpanel from 'mixpanel-browser';

const THEME_STORAGE_KEY = 'ai-tech-dashboard-theme';
const MODE_STORAGE_KEY = 'ai-tech-dashboard-mode';

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored || DEFAULT_THEME;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored as ThemeMode;
    }
    return DEFAULT_MODE;
  });

  const [effectiveMode, setEffectiveMode] = useState<'dark' | 'light'>(() => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  });

  // Update effective mode when mode changes or system preference changes
  useEffect(() => {
    const updateEffectiveMode = () => {
      if (mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setEffectiveMode(isDark ? 'dark' : 'light');
      } else {
        setEffectiveMode(mode);
      }
    };

    updateEffectiveMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateEffectiveMode);

    return () => mediaQuery.removeEventListener('change', updateEffectiveMode);
  }, [mode]);

  const currentTheme = THEME_PRESETS.find(t => t.id === themeId);
  const currentColors = currentTheme ? (effectiveMode === 'dark' ? currentTheme.darkColors : currentTheme.lightColors) : null;

  const applyTheme = useCallback((colors: ThemeColors) => {
    const root = document.documentElement;
    
    // Map theme colors to index.css variables
    root.style.setProperty('--bg-primary', colors.bg);
    root.style.setProperty('--bg-secondary', colors.surface1);
    root.style.setProperty('--bg-tertiary', colors.surface2);
    root.style.setProperty('--bg-hover', colors.surface3);
    
    // Text
    root.style.setProperty('--text-primary', colors.txt1);
    root.style.setProperty('--text-secondary', colors.txt2);
    root.style.setProperty('--text-tertiary', colors.txt3);
    root.style.setProperty('--text-muted', colors.txt3);
    
    // Borders
    root.style.setProperty('--border-primary', colors.line);
    root.style.setProperty('--border-secondary', colors.lineHi);
    
    // Accents
    root.style.setProperty('--accent-primary', colors.accent);
    root.style.setProperty('--accent-warning', colors.accent);
    
    // Secondary accent
    if (colors.accent2) {
      root.style.setProperty('--accent-secondary', colors.accent2);
    }
    
    // Also set App.css variables for ThemeSelector
    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--surface-1', colors.surface1);
    root.style.setProperty('--surface-2', colors.surface2);
    root.style.setProperty('--surface-3', colors.surface3);
    root.style.setProperty('--line', colors.line);
    root.style.setProperty('--line-hi', colors.lineHi);
    root.style.setProperty('--txt-1', colors.txt1);
    root.style.setProperty('--txt-2', colors.txt2);
    root.style.setProperty('--txt-3', colors.txt3);
    root.style.setProperty('--amber', colors.accent);
    root.style.setProperty('--amber-dim', colors.accentDim);
    root.style.setProperty('--amber-bdr', colors.accentBdr);
    
    if (colors.accent2) {
      root.style.setProperty('--violet', colors.accent2);
      root.style.setProperty('--violet-dim', colors.accent2Dim || '');
      root.style.setProperty('--violet-bdr', colors.accent2Bdr || '');
    }
    
    root.style.setProperty('--green', '#10B981');
    root.style.setProperty('--green-dim', 'rgba(16,185,129,0.10)');
  }, []);

  useEffect(() => {
    if (currentColors) {
      applyTheme(currentColors);
    }
  }, [currentColors, applyTheme]);

  const setTheme = useCallback((themeId: string) => {
    setThemeId(themeId);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);

    // Track analytics event
    try {
      mixpanel.track('Theme Changed', {
        themeId,
        mode,
      });
    } catch (error) {
      // Silently fail if Mixpanel is not configured
    }
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(MODE_STORAGE_KEY, newMode);

    // Track analytics event
    try {
      mixpanel.track('Theme Mode Changed', {
        from: mode,
        to: newMode,
      });
    } catch (error) {
      // Silently fail if Mixpanel is not configured
    }
  }, [mode]);

  const toggleMode = useCallback(() => {
    setModeState(prev => {
      const newMode: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(MODE_STORAGE_KEY, newMode);

      // Track analytics event
      try {
        mixpanel.track('Theme Mode Toggled', {
          from: prev,
          to: newMode,
        });
      } catch (error) {
        // Silently fail if Mixpanel is not configured
      }

      return newMode;
    });
  }, []);

  return {
    themeId,
    mode,
    effectiveMode,
    currentTheme,
    currentColors,
    setTheme,
    setMode,
    toggleMode,
    presets: THEME_PRESETS,
  };
}
